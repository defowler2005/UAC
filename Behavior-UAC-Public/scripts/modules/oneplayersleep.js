import { tellrawServer } from 'library/utils/prototype.js';
import { world } from '@minecraft/server';
import { Database } from '../library/Minecraft.js';

function ops() {
    let opsbool = Database.get('opstoggle');
    if (opsbool == false) return;

    let players = world.getPlayers();
    for (let player of players) {
        const name = player.getName();
        if (player.isSleeping) {
            player.runCommandAsync(`time set sunrise`);
            player.runCommandAsync(`time add 2000`);
            player.runCommandAsync(`weather clear`);
            tellrawServer(`§l§¶§cUAC §6SYSTEM ► §d${name} §btriggered one player sleep`);
        }
    }
};

export { ops };