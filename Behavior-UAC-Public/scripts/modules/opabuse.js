import { TellRB } from 'library/utils/prototype.js';
import { scoreTest, setScore } from '../library/utils/score_testing.js';
import { GameMode, Player } from '@minecraft/server';

/**
 * @param {Player} player
 */
function op_abuse(player) {
    const name = player.getName();
    if (!player.hasTag(`staffstatus`)) return;

    if (player.hasTag(`staffstatus`)) {
        //disable godmode
        if (player.hasTag(`tgmGodMode`)) {
            player.removeTag(`tgmGodMode`);
            setScore(player, 'tgmGodMode', 0, false);
            player.runCommandAsync(`effect @s clear`);
            TellRB(`flag_1`, `UAC Anti-Op Abuse ► ${name} tried to toggle godmode. Their godmode status was removed.`);
            try { player.removeTag(`godmode`) } catch { }
        }
        //disable creative invulnerability
        if (player.getGameMode() === GameMode.creative) {
            player.runCommandAsync(`gamemode spectator`);
            TellRB(`flag_1`, `UAC Anti-Op Abuse ► ${name} tried to enter creative mode. They were forced into spectator instead.`);
        }
        //disable autototem
        if (player.hasTag(`totemaut`)) {
            player.removeTag(`totemaut`);
            setScore(player, 'totemtog', 0, false);
            setScore(player, 'totemaut', 0, false);
            TellRB(`flag_1`, `UAC Anti-Op Abuse ► ${name} tried to toggle auto-totem. Their auto-totem status was removed.`);
        }
        //force invisible staff into spectator, to remove pvp advantage
        if (player.hasTag(`spectate`) || (scoreTest(player, 'vnsh') >= 1)) {
            player.setGameMode('spectator');
        }
    }
};

export { op_abuse };