import { getGamemode } from '../library/utils/prototype.js';
import { Database } from '../library/Minecraft.js'
import { scoreTest } from '../library/utils/score_testing';
import { Player } from '@minecraft/server';
import { configuration } from '../library/build/configurations.js';

function hotbar(player, message) {
    try {
        return player.onScreenDisplay.setActionBar(`${message.replaceAll('"', '\\"')}`);
    }
    catch { return };
};

/**
 * @param {Player} player 
 * @returns {void}
 */
function hotbar_message(player) {
    try {
        let hmm_toggle = Database.get('hmmtoggle'); //Global hotbar message mode.
        let message_type = scoreTest(player, 'hometp'); //Self hotbar message mode.
        let is_frozen = player.hasTag('fzplr');
        let in_vanish = player.hasTag('vnsh');
        let plr_suicide = scoreTest(player, 'suicide') || 0;
        let unban_window = scoreTest(player, 'unbantimer') || 0;
        let playercount = Database.get('playercount');
        let entitycount = Database.get('entitycount') || 0;

        let kills = scoreTest(player, 'kills') || 0;
        let deaths = scoreTest(player, 'deaths') || 0;
        let killstreak = scoreTest(player, 'killstreak') || 0;
        let money = scoreTest(player, 'money') || 0;

        if (is_frozen) return hotbar(player, `§¶§bYOU HAVE BEEN §cFROZEN §bBY AN OPERATOR \n    §¶§bLEAVING MAY RESULT IN A BAN`);
        if (plr_suicide >= 1) return player.runCommandAsync(`function UAC/asset/hotbar_suicidetimer`);

        if (player.hasTag(configuration.staff_tag)) {
            if (unban_window >= 1) return player.runCommandAsync(`function UAC/asset/hotbar_unbantimer`);
            if (in_vanish) return hotbar(player, `§¶§d        VANISH MODE \n §¶§bPlayers§7: §c${playercount} §7|| §bEntities§7: §c${entitycount}`);
            if (hmm_toggle >= 1) {
                if (getGamemode(player, 'creative')) player.runCommandAsync(`function UAC/asset/hotbar_creative`);
                if (getGamemode(player, 'spectator')) return hotbar(player, `§¶§d    SPECTATOR MODE \n §¶§bPlayers§7: §c${playercount} §7|| §bEntities§7: §c${entitycount}`);
            }
        }

        if (getGamemode(player, 'survival')) {
            //with score
            if (hmm_toggle == 1) return hotbar(player, `§¶§bUAC §7[§2v2§7.§28§7.§27§7] Public \n §¶§bkills§7: §c${kills} §7| §bdeaths§7: §c${deaths} §7| §bkillstreak§7: §c${killstreak} §7| §c$ ${money}`);
            //without score
            if (hmm_toggle == 2) return hotbar(player, `§¶§bUAC §7[§2v2§7.§28§7.§27§7] Public`);
            //resource mode
            if (hmm_toggle == 3) return hotbar(player, `§¶§bCurrent Version §7[§2v2.8.9§7] \n\n§6Self Stats \n§¶§bKills §7: §c${kills}\n§bDeaths §7: §c${deaths}\n§bCurrent Killstreak §7: §c${killstreak}\n§bMoney §7: §c$${money}\n§¶§bDeath Coords: §g §c${scoreTest(player, `X_Coord_D`) || 0}§g/§c${scoreTest(player, `Y_Coord_D`) || 0}§g/§c${scoreTest(player, `Z_Coord_D`) || 0}\n§bTime played: §gd/§c${scoreTest(player, `timeplayedday`) || 0}§g h/§c${scoreTest(player, `timeplayedhr`) || 0}§g m/§c${scoreTest(player, `timeplayedmin`) || 0}§g s/§c${scoreTest(player, `timeplayedsec`) || 0}§g t/§c${scoreTest(player, `timeplayedtick`) || 0}§g\n\n§6Server Stats\n§bPlayerCount §7: §c${playercount}\n§bEntityCount §7: §c${entitycount}`);

            if (hmm_toggle == 0) {
                // self stats display
                if (message_type == 1337) hotbar(player, `         §¶§bUAC §7[§2v2§7.§28§7] Public \n §¶§bkills§7: §c${kills} §7| §bdeaths§7: §c${deaths} §7| §bkillstreak§7: §c${killstreak} §7| §c$ ${money}`);
                // server stats display
                if (message_type == 420) hotbar(player, `         §¶§bUAC §7[§2v2§7.§28§7] Public \n §¶§bPlayers §7: §c${playercount} §7|| §bEntities §7 : §c${entitycount}`);
            }
        }
    } catch (e) {
        console.warn(JSON.stringify(e.stack), e)
    }
};

export { hotbar_message };

/**
 #creative with score
execute @a[tag=staffstatus,m=c,scores={hmmtoggle=1,OPAM=0,opamtoggle=0,hometp=3}] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§¶§aCREATIVE ENABLED §7| §d` /Function UAC/help/all-commands ` §7| §7[§2v2.8.9§7]§b\n §bEntity Count §7: "},{"score":{"name":"entitydummy","objective":"entitycount"}},{"text":" §bPlayer Count §7: "},{"score":{"name":"playerdummy","objective":"playercount"}},{"text":" §bCurrent WorldSpawn§7: X = "},{"score":{"name":"@s","objective":"Worldx"}},{"text":" Z = "},{"score":{"name":"@s","objective":"Worldz"}}]}
#creative without score
execute @a[tag=staffstatus,m=c,scores={hmmtoggle=2,OPAM=0,opamtoggle=0,hometp=3}] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§¶§aCREATIVE ENABLED §7| §d` /Function UAC/help/all-commands ` §7| §7[§2v2.8.9§7]§b"}]}
#creative resource mode
execute @a[tag=staffstatus,m=c,scores={hmmtoggle=3,OPAM=0,opamtoggle=0,hometp=3}] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§¶§aCREATIVE ENABLED §7| §d` /Function UAC/help/all-commands ` §7| §7[§2v2.8.9§7]§b\n §bEntity Count §7: "},{"score":{"name":"entitydummy","objective":"entitycount"}},{"text":" §bPlayer Count §7: "},{"score":{"name":"playerdummy","objective":"playercount"}},{"text":" §bCurrent WorldSpawn§7: X = "},{"score":{"name":"@s","objective":"Worldx"}},{"text":" Z = "},{"score":{"name":"@s","objective":"Worldz"}}]}

#Op abuse with score message
execute @s[tag=staffstatus,m=c,scores={hmmtoggle=1,OPAM=1,opamtoggle=1,hometp=3}] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§¶§aCREATIVE ENABLED §7| §¶§cPVP DISABLED §7| §d` /Function UAC/help/all-commands ` \n §bEntity Count §7: "},{"score":{"name":"entitydummy","objective":"entitycount"}},{"text":" §bCurrent WorldSpawn§7: X = "},{"score":{"name":"@s","objective":"Worldx"}},{"text":" Z = "},{"score":{"name":"@s","objective":"Worldz"}}]}
#Op abuse without score message
execute @s[tag=staffstatus,m=c,scores={hmmtoggle=2,OPAM=1,opamtoggle=1,hometp=3}] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§¶§aCREATIVE ENABLED §7| §¶§cPVP DISABLED §7| §d` /Function UAC/help/all-commands `"}]}
#Op abuse resource mode
execute @s[tag=staffstatus,m=c,scores={hmmtoggle=3,OPAM=1,opamtoggle=1,hometp=3}] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§¶§aCREATIVE ENABLED §7| §¶§cPVP DISABLED §7| §d` /Function UAC/help/all-commands ` \n §bEntity Count §7: "},{"score":{"name":"entitydummy","objective":"entitycount"}},{"text":" §bCurrent WorldSpawn§7: X = "},{"score":{"name":"@s","objective":"Worldx"}},{"text":" Z = "},{"score":{"name":"@s","objective":"Worldz"}}]}
 */