import { world, Player, GameMode } from '@minecraft/server';
import { scoreTest } from './score_testing';

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
}
export function TellRB(color, message) {
    try {
        if (scoreTest(`rbflagdummy`, `acstoggle`) != 1) { return; } //check to see if RB Relay is enabled
        if (!color) {
            color = `1317f2`; //default color if color is not defined
        }
        switch (color) {
            case 'ban': { color = `FB0000`; } break; //red
            case 'flag_0': { color = `02EBFE`; } break; // cyan
            case 'flag_1': { color = `E7FE02`; } break; //yellow
        }
        for (let player of world.getPlayers()) {
            if (player.hasTag(`rb1337`)) {
                player.onScreenDisplay.updateSubtitle("RB1337: " + JSON.stringify({
                    url: 'https://discord.gg/uac',
                    author: {
                        name: 'UAC Discord Flag Log',
                        icon_url: 'https://cdn.discordapp.com/attachments/824151082791075860/1081761748387893328/Discord_Certified_Moderator.png',
                        url: 'https://discord.gg/uac'
                    },
                    description: `${message.replaceAll('"', '\\"')}`,
                    anticheat: `Unity Anti-Cheat`,
                    color: `${color}`,
                    thumbnail: 'https://cdn.discordapp.com/attachments/824151082791075860/874429993164345354/uac_glitch.gif',
                    footer: {
                        icon_url: "https://cdn.discordapp.com/attachments/824151082791075860/874492420694360124/Unity_AntiCheat.png",
                        text: "Powered by U-E Studios",
                        url: 'https://discord.gg/uac'
                    },
                }))
            }
        }
        console.warn(color.toString());
    }
    catch (c) { console.warn(JSON.stringify(e.stack), e) }
}
export function tp(target, x, y, z) {
    try {
        target.teleport({ x: x, y: y, z: z }, target.dimension);
    } catch (e) {
        console.warn(JSON.stringify(e.stack), e)

    }
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
}

export function hotbar(player, message) {
    try {
        return player.setActionBar(`${message.replaceAll('"', '\\"')}`);
    }
    catch { return }
};
// return gamemode string.
export function getGamemode(player, GM) {
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