import { world, Player, system } from '@minecraft/server';
/*
* If you are not using a server comment out these
export { TellRB };
import { TellRB } from './tell_rb.js';
*/

export function TellRB(a, b) { };

export const content = {
    warn: function (message) {
        if (typeof message === 'object' || Array.isArray(message)) {
            console.warn(JSON.stringify(message));
        } else {
            console.warn(message);
        }

    }
};

const betaPlayerFunctions = {
    getName: function () {
        if (/"|\\/.test(this.nameTag)) {
            this.nameTag = this.nameTag.replace(/"|\\/g, '');
        }
        return this.nameTag;
        //not beta but fixes nameSpoof command tartgeting issues
    },
    tellraw: function (message) {
        return this.sendMessage(`${message.replaceAll('"', '\\"')}`);
    },
    tellrawStringify: function (message) {
        return this.runCommandAsync(`tellraw @s {"rawtext":[{"text":"${JSON.stringify(message).replaceAll('"', '\\"')}"}]}`);
    },
    tellrawJSON: function (json) {
        return this.runCommandAsync(`tellraw @s {"rawtext":[${json}]}`);
    },
    getInventory: function (array) {
        let inventory = this.getComponent('minecraft:inventory').container;
        if (array) {
            let itemArray = [];
            for (let i = 0; i < inventory.size; i++) {
                let item = inventory.getItem(i);
                if (item) {
                    const { id, amount, data } = item;
                    itemArray.push({ slot: i, id, amount, data });
                }
            } console.warn(JSON.stringify(itemArray));
            return itemArray;

        } else {
            return inventory;
        }

    }
};
export function tellrawStaff(message) {
    try {
        for (let player of world.getPlayers()) {
            if (player.hasTag('staffstatus')) {
                player.sendMessage(`${message.replaceAll('"', '\\"')}`);
            }
        }
    } catch { }
};

export function tp(target, x, y, z) {
    try {
        target.teleport({ x: x, y: y, z: z }, target.dimension);
    } catch (e) {
        console.warn(JSON.stringify(e.stack), e)

    }
};

/**
 * Waits for the player to move and then executes a callback function.
 * @param {Object} target - The target player to monitor for movement.
 * @param {number} x - The initial X-coordinate of the target player.
 * @param {number} y - The initial Y-coordinate of the target player.
 * @param {number} z - The initial Z-coordinate of the target player.
 * @param {Function} callback - The callback function to execute after the player moves.
 */

export function waitMove(target, { x, y, z, }, callback) {
    const t = new Map();
    t.set(target, [x, y, z]);
    system.runInterval(() => {
        for (const [target, [xOld, yOld, zOld]] of t) {
            const { x: xc, y: yc, z: zc } = target.location;
            if (xOld !== xc || yOld !== yc || zOld !== zc) system.run(() => t.delete(target) || callback());
        }
    })
};

export function tellrawServer(message) {
    try {
        for (let player of world.getPlayers()) {
            player.sendMessage(`${message.replaceAll('"', '\\"')}`);
        }
    } catch { }
}
export function FindPlayer(input) {
    let players = world.getPlayers();
    for (let player of players) {
        const name = player.getName();
        if (name.match(input)) {
            return true;
        } else { return false; }
    }
}

export function tellraw(message) {
    try {
        return this.sendMessage(`${message.replaceAll('"', '\\"')}`);
    }
    catch { return }
};

/**
 * 
 * @param {Player} player 
 * @param {String} message 
 * @returns 
 */
export function hotbar(player, message) {
    try {
        return player.onScreenDisplay.setActionBar(`${message.replaceAll('"', '\\"')}`);
    }
    catch { return };
};

// return gamemode string.
export function getGamemode(player, GM) { //Redundant function, Used somewhere, To be removed later.
    try {
        return world.getPlayers({ name: player.name, gameMode: GM }).length > 0;
    } catch {
        return;
    }
};

/**
 * Check if a player has a specified item.
 * @param {Player} player 
 * @param {String} itemId 
 * @param {Boolean} clearItems 
 * @returns {Number}
 */
export function hasitem(player, itemId, clearItems = false) {
    const inventory = player.getComponent("minecraft:inventory").container;
    let itemAmount = 0;
    for (let i = 0; i < inventory.size; i++) {
        let item = inventory.getItem(i);
        if (item?.typeId != itemId) continue;
        itemAmount += item.amount;
    } if (clearItems) player.runCommandAsync(`clear @s ${itemId}`)
    return itemAmount;
};
//Add betaPlayerFunctions to the Player.
Object.assign(Player.prototype, betaPlayerFunctions);