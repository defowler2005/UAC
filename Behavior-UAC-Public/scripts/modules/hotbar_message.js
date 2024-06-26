import { Database } from '../library/Minecraft.js'
import { scoreTest } from '../library/utils/score_testing.js';
import { GameMode, Player } from '@minecraft/server';
import { configuration } from '../library/build/configurations.js';

/**
 * 
 * @param {Player} player 
 * @param {String} message 
 */
function hotbar(player, message) {
    try {
        if (scoreTest(player, 'combat_timer') >= 1) {
            // Temporarily disable other hotbar messages while player's combat_timer counts down.
            return;
        } else {
            return player.onScreenDisplay.setActionBar(`${message.replaceAll('"', '\\"')}`);
        }
    } catch { };
};

/**
 * @param {Player} player 
 */
function hotbar_message(player) {
    player.is
    try {
        let hmm_toggle = Database.get('hmmtoggle'); //Global hotbar message mode.
        let hometp = scoreTest(player, 'hometp'); //Self hotbar message mode.
        let opam_toggle = Database.get('opamtoggle');
        let is_frozen = player.hasTag('fzplr');
        let in_vanish = player.hasTag('vnsh');
        let plr_suicide = scoreTest(player, 'suicide') || 0;
        let unban_window = scoreTest(player, 'unbantimer') || 0;
        let playercount = Database.get('playercount');
        let entitycount = Database.get('entitycount') || 0;
        let SpawnX = Database.get('Spawn_Coord_X') || 0;
        let SpawnY = Database.get('Spawn_Coord_Y') || 90;
        let SpawnZ = Database.get('Spawn_Coord_Z') || 0;
        console.warn(`\nhmm_toggle: ${hmm_toggle}\nhometp: ${hometp}`);
        let kills = scoreTest(player, 'kills') || 0;
        let deaths = scoreTest(player, 'deaths') || 0;
        let killstreak = scoreTest(player, 'killstreak') || 0;
        let money = scoreTest(player, 'money') || 0;
        if (is_frozen) return hotbar(player, `§¶§bYOU HAVE BEEN §cFROZEN §bBY AN OPERATOR \n    §¶§bLEAVING MAY RESULT IN A BAN`);
        if (plr_suicide >= 1) return player.runCommandAsync(`function UAC/asset/hotbar_suicidetimer`);

        if (player.hasTag(configuration.staff_tag)) {
            if (unban_window >= 1) return player.runCommandAsync(`function UAC/asset/hotbar_unbantimer`);
            if (in_vanish) return hotbar(player, `§¶§dVANISH MODE\n§¶§bPlayers§7: §c${playercount} §7|| §bEntities§7: §c${entitycount}`);
            if (hmm_toggle >= 1) {
                if (player.getGameMode() === GameMode.creative) {
                    if (opam_toggle === 0) {
                        if (hometp === 3) {
                            return hotbar(player, `§¶§aCREATIVE ENABLED §7| §d'${configuration.prefix}help' §7| §7[§2v2.8.9§7]\n§bEntity Count §7: ${entitycount}\n§bPlayer Count §7: ${playercount}\n§bCurrent WorldSpawn§7: §cX §7= ${SpawnX} §2Y §7= ${SpawnY} §3Z §7= ${SpawnZ}`);
                        }
                        if (hmm_toggle === 2) {
                            if (hometp === 3) {
                                return hotbar(player, '§¶§aCREATIVE ENABLED §7| §d` /Function UAC/help/all-commands ` §7| §7[§2v2.8.9§7]§b')
                            }
                        }
                    }
                } else if (player.getGameMode() === GameMode.spectator) return hotbar(player, `§¶§d    SPECTATOR MODE \n §¶§bPlayers§7: §c${playercount} §7|| §bEntities§7: §c${entitycount}`);
            }
        };

        if (player.getGameMode() === GameMode.survival) {
            //with scors
            if (hmm_toggle == 1) return hotbar(player, `§¶§bUAC §7[§2v2§7.§28§7.§27§7] Public \n §¶§bkills§7: §c${kills} §7| §bdeaths§7: §c${deaths} §7| §bkillstreak§7: §c${killstreak} §7| §c$ ${money}`);
            //without score
            if (hmm_toggle == 2) return hotbar(player, `§¶§bUAC §7[§2v2§7.§28§7.§27§7] Public`);
            //resource mode
            if (hmm_toggle == 3) return hotbar(player, `§¶§bCurrent Version §7[§2v2.8.8§7] \n\n§6Self Stats \n§¶§bKills §7: §c${kills}\n§bDeaths §7: §c${deaths}\n§bCurrent Killstreak §7: §c${killstreak}\n§bMoney §7: §c$${money}\n§¶§bDeath Coords: §g §c${scoreTest(player, `X_Coord_D`) || 0}§g/§c${scoreTest(player, `Y_Coord_D`) || 0}§g/§c${scoreTest(player, `Z_Coord_D`) || 0}\n§bTime played: §gd/§c${scoreTest(player, `timeplayedday`) || 0}§g h/§c${scoreTest(player, `timeplayedhr`) || 0}§g m/§c${scoreTest(player, `timeplayedmin`) || 0}§g s/§c${scoreTest(player, `timeplayedsec`) || 0}§g t/§c${scoreTest(player, `timeplayedtick`) || 0}§g\n\n§6Server Stats\n§bPlayer Count §7: §c${playercount}\n§bEntity Count §7: §c${entitycount}`);
            if (hmm_toggle == 0) {
                // self stats display
                if (hometp === 1337) hotbar(player, `§¶§bUAC §7[§2v2§7.§28§7] Public\n§¶§bkills§7: §c${kills}\n§bdeaths§7: §c${deaths}\n§bkillstreak§7: §c${killstreak} \n§bMoney §c$${money}`);
                // server stats display
                if (hometp === 420) hotbar(player, `     §¶§bUAC §7[§2v2§7.§28§7] Public \n §¶§bPlayers §7: §c${playercount} §7|| §bEntities §7 : §c${entitycount}`);
            }
        }
    } catch (error) {
        console.warn(`An error occured while displaying hotbar message: ${error}\n${error.stack}`);
    }
};

export { hotbar_message };

/**
#creative without score IN PROGRESS NOW.
execute @a[scores={hmmtoggle=2,hometp=3}] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§¶§aCREATIVE ENABLED §7| §d` /Function UAC/help/all-commands ` §7| §7[§2v2.8.9§7]§b"}]}

#creative resource mode
execute @a[scores={hmmtoggle=3,OPAM=0,hometp=3}] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§¶§aCREATIVE ENABLED §7| §d` /Function UAC/help/all-commands ` §7| §7[§2v2.8.9§7]§b\n §bEntity Count §7: "},{"score":{"name":"entitydummy","objective":"entitycount"}},{"text":" §bPlayer Count §7: "},{"score":{"name":"playerdummy","objective":"playercount"}},{"text":" §bCurrent WorldSpawn§7: X = "},{"score":{"name":"@s","objective":"Worldx"}},{"text":" Z = "},{"score":{"name":"@s","objective":"Worldz"}}]}
#Op abuse with score message
execute @s[scores={hmmtoggle=1,OPAM=1,hometp=3}] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§¶§aCREATIVE ENABLED §7| §¶§cPVP DISABLED §7| §d` /Function UAC/help/all-commands ` \n §bEntity Count §7: "},{"score":{"name":"entitydummy","objective":"entitycount"}},{"text":" §bCurrent WorldSpawn§7: X = "},{"score":{"name":"@s","objective":"Worldx"}},{"text":" Z = "},{"score":{"name":"@s","objective":"Worldz"}}]}
#Op abuse without score message
execute @s[scores={hmmtoggle=2,OPAM=1,hometp=3}] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§¶§aCREATIVE ENABLED §7| §¶§cPVP DISABLED §7| §d` /Function UAC/help/all-commands `"}]}
#Op abuse resource mode
execute @s[scores={hmmtoggle=3,OPAM=1,hometp=3}] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§¶§aCREATIVE ENABLED §7| §¶§cPVP DISABLED §7| §d` /Function UAC/help/all-commands ` \n §bEntity Count §7: "},{"score":{"name":"entitydummy","objective":"entitycount"}},{"text":" §bCurrent WorldSpawn§7: X = "},{"score":{"name":"@s","objective":"Worldx"}},{"text":" Z = "},{"score":{"name":"@s","objective":"Worldz"}}]}
*/