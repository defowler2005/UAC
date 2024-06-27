import { Player } from '@minecraft/server';
import { tellrawStaff, tp } from '../library/utils/prototype';
import { scoreTest } from '../library/utils/score_testing';
import { Database } from '../library/Minecraft.js';
import { configuration } from '../library/build/configurations.js';
import { TellRB } from '../library/utils/prototype.js';

/**
 * @param {Player} player 
 */
function Check_Packet_Behavior(player) {
    try {
        if (Database.get('') !== 1 || player.hasTag(configuration.staff_tag)) return;
        let p_speed = player.getComponent("minecraft:movement");
        let name = player.getName();
        let p_velocity = player.getVelocity();
        const xyVelocity = Math.abs(p_velocity.x) + Math.abs(p_velocity.z);
        const yVelocity = Math.abs(p_velocity.y);
        const movmentValue = 0.00;
        let last_x = scoreTest(player, 'lastpos_x');
        let last_y = scoreTest(player, 'lastpos_y');
        let last_z = scoreTest(player, 'lastpos_z');

        const x = Math.floor(Math.abs(player.location.x));
        const y = Math.floor(Math.abs(player.location.y));
        const z = Math.floor(Math.abs(player.location.z));

        // Anti-teleport.
        if (xyVelocity <= movmentValue && yVelocity <= movmentValue) {
            if (Math.abs(last_x - x) > movmentValue || Math.abs(last_y - y) > movmentValue || Math.abs(last_z - z) > movmentValue) {

                tellrawStaff(`§¶§cUAC STAFF §6Bad Packet §b► §d${name} §¶§bflaged for Teleporting to\nX§7: §c${last_x}  §bZ§7: §c${last_z}`);
                TellRB(`flag_1`, `UAC Bad Packet ► ${name} flaged for invalid Position Spoof to x: ${x}  zV: ${z}`);
                p_speed.resetToDefaultValue();
                tp(player, last_x, last_y, last_z);
                return;
            }
        }

        // Invalid speed.
        if (p_speed.currentValue >= 0.185) {
            tellrawStaff(`§¶§cUAC STAFF §6Bad Packet §b► §d${name} §¶§bflaged for speed §7: §c${p_speed.currentValue}`);
            TellRB(`flag_1`, `UAC Bad Packet ► ${name} flaged for invalid speed : ${p_speed.currentValue}`);
            p_speed.resetToDefaultValue();
            return;
        }

        /*
        //Invalid velocity.
        if (xyVelocity > 2.88 || yVelocity > 2.88) {
            tellrawStaff(`§¶§cUAC STAFF §6Bad Packet §b► §d${name} §¶§bflaged for Velocity\nxV§7: §c${xyVelocity}  §byV§7: §c${yVelocity}`);
            TellRB(`flag_1`, `UAC Bad Packet ► ${name} flaged for invalid Velocity xV: ${xyVelocity}  yV: ${yVelocity}`);
            p_speed.resetToDefaultValue();
            tp(player, last_x, last_y, last_z);
            return;
        }
        */
    } catch (e) {
        console.warn(JSON.stringify(e.stack), e);
    }
};

export { Check_Packet_Behavior }