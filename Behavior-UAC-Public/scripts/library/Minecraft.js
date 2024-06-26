import { compressNumber, formatNumber, MS, rainbowText } from "./utils/formatter.js";
export { compressNumber, formatNumber, MS, rainbowText };
import { Database } from "./build/classes/databaseBuilder.js";
export { Database };
import { world, system } from '@minecraft/server';
import { Entity } from "./build/classes/entityBuilder.js";
import { Player } from "./build/classes/playerBuilder.js";
import { Command } from "./build/classes/commandBuilder.js";
import { ServerBuilder } from "./build/classes/serverBuilder.js";
import { configuration } from "./build/configurations.js";

let worldLoaded = false;

class ServerBuild extends ServerBuilder {
    constructor() {
        super();
        this.entity = Entity;
        this.player = Player;
        this.command = Command;
        this._buildEvent();
    };
    /**
     * @private
     */
    _buildEvent() {
        try {
            world.beforeEvents.chatSend.subscribe((data) => {
                /**
                 * Emit to 'beforeMessage' event listener
                 */
                const sender = data.sender;
                /**
                 * This is for the command builder and a emitter
                 */
                if (!data.message.startsWith(this.command.prefix)) return;
                const args = data.message.slice(this.command.prefix.length).split(/\s+/g);
                const command = args.shift().toLowerCase();
                const getCommand = Command.getAllRegistation().some((element) => element.name === command || element.aliases && element.aliases.includes(command));
                if (!getCommand) {
                    data.cancel = true;
                    return sender.sendMessage({ "rawtext": [{ "text": "§c" }, { "translate": "commands.generic.unknown", "with": [`§f${command}§c`] }] });
                };

                Command.getAllRegistation().forEach((element) => {
                    if (!data.message.startsWith(this.command.prefix) || element.name !== command)
                        return;
                    if (element.staff === 'true' && !data.sender.hasTag(configuration.staff_tag)) {
                        if (element?.cancelMessage) data.cancel = true;
                        return data.sender.tellraw(`§¶§c§lUAC ► §c§lThis command is meant for staff only.`);
                    }

                    /**
                     * Registration callback
                     */
                    if (element?.cancelMessage) data.cancel = true;
                    try {
                        system.run(() => element.callback(data, args))
                    }
                    catch (error) {
                        this.runCommandAsync(`tellraw @a {"rawtext":[{"text":"§¶§c§lUAC JS Error ► §c${error}"}]}`);
                    }
                })
            });
            let oldPlayer = [];
            world.afterEvents.entitySpawn.subscribe((data) => {
                if (data.entity.id !== 'minecraft:player') return;
                let playerSpawned = Player.list().filter((current) => !oldPlayer.some((old) => current === old));

                if (playerSpawned.includes(data.entity.nameTag)) { };
            });
            system.runInterval(() => {
                if (world.getAllPlayers().length > 0) {
                    worldLoaded = true;
                };
            });
        } catch (error) {
            console.warn(error, error.stack);
        }
    }
};

/**
 * Import this constructor
 */
export const Server = new ServerBuild();
export { worldLoaded };