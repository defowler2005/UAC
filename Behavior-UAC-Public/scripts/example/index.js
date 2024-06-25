import '../library/utils/prototype.js';
import './commands/import-commands.js';  //all player chat commands

//external module functions
import { unobtainable } from '../modules/unobtainable.js';
import { playerbans } from '../modules/bans.js';
import { ops } from '../modules/oneplayersleep.js';
import { lagclear } from '../modules/lagclear.js';
import { movement_check } from '../modules/movement.js';
import { waitMove } from './commands/staff/gui.js';
import { hotbar_message } from '../modules/hotbar_message.js';
import { op_abuse } from '../modules/opabuse.js';
import { afk_kick } from '../modules/afk_kick.js';
import { Check_Packet_Behavior } from '../modules/bad_packet.js';

//game resource dependancies
import { world as World, BlockTypes, system } from "@minecraft/server";
import { tellrawStaff, tp, tellrawServer, TellRB } from '../library/utils/prototype.js';
import { scoreTest, setScore } from '../library/utils/score_testing.js';
import { world, Player } from '@minecraft/server';
import { Database, Server } from '../library/Minecraft.js';
import { configuration } from '../library/build/configurations.js';

const overworld = world.getDimension('overworld');

function worldBorder(player) {
    const { x, y, z } = player.location
    const name = player.getName();
    if (Math.abs(x) >= 30000000 || Math.abs(y) >= 30000000 || Math.abs(z) >= 30000000) {
        player.runCommandAsync(`tp @s 0 900 0`);
        tellrawStaff(`§¶§cUAC STAFF STAFF ► §6Anti-Crasher §bCrash attempt was prevent from §d${name}`);
        TellRB(`flag_1`, `UAC SYSTEM ► Crash was prevented from ${name}`);
        //player.runCommandAsync("kill @s");
        try { player.runCommandAsync(`kick "${player.nameTag}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lCrash Attempt`); }
        catch { player.runCommandAsync(`event entity @s uac:ban_main`); }
        //return;

        //Anti-Crasher contributed by SmoothieMC
    }
};

/*
░░████░░░████░░████████░░████████░░░░░░░
░░████░░░████░░███░░███░░████████░░░░░░░
░░████░░░████░░████████░░███░░░░░░░░░░░░ <3
░░████░░░████░░███░░███░░████████░░░░░░░
░░███████████░░███░░███░░████████░░░░░░░
*/

let on_tick = 0;

system.runInterval(() => {
    try {
        let SpawnX = Database.get('Spawn_Coord_X') || 0;
        let SpawnY = Database.get('Spawn_Coord_Y') || 90;
        let SpawnZ = Database.get('Spawn_Coord_Z') || 0;
        let BorderX = Database.get('Border_Coord_X') || 60;
        let BorderZ = Database.get('Border_Coord_Z') || 60;
        let WorldBorderbool = Database.get('wbmtoggle');
        let uoimbool = Database.get('uoimtoggle');
        let opsbool = Database.get('opstoggle');
        let lagclear_bool = Database.get('ltmtoggle');
        let opabuse_bool = Database.get('opamtoggle');
        on_tick++;

        if (uoimbool == 1) { unobtainable(); }

        if (on_tick == 10) {
            if (opsbool) { ops(); }
            if (lagclear_bool == 1) lagclear();
        }

        if (on_tick == 15) {
            const entitycount = Database.get('entitycount');
            if (entitycount >= 340) {
                overworld.runCommandAsync(`function UAC/packages/autoclear-manual`);
                tellrawServer(`§¶§cUAC §¶§b► §cEmergency Lag Clear §bwas performed due to entity count going over §6340§b.`);
                TellRB(`flag_0`, `UAC SYSTEM ► Emergency Lag Clear triggered due to entity count going over 340`);
            }
        }
        // one second module functions -- 2nd schedual  -- ran from backend not players
        if (on_tick >= 20) {
            let players = world.getPlayers();
            for (let player of players) {
                const name = player.getName();
                worldBorder(player);
                if (Database.get('unban') === 0) {
                    playerbans(player);
                }
                hotbar_message(player);
                movement_check(player);
                afk_kick(player);
                if (opabuse_bool) { op_abuse(player) }
                setScore(player, "has_gt", 1, false);

                //Ticking for the removal of tp_cooldown for home command every 1 second.
                const oldTp_cooldown = scoreTest(player, 'tp_cooldown');
                if (oldTp_cooldown >= 0) {
                    setScore(player, 'tp_cooldown', oldTp_cooldown - 1);
                }

                //Ticking for the removal of combat_timer for every 1 second.
                const oldCombat_timer = scoreTest(player, 'combat_timer');
                if (oldCombat_timer >= 0) {
                    setScore(player, 'combat_timer', oldCombat_timer - 1);

                    if (oldCombat_timer === 10) { // 10 seconds.
                        player.onScreenDisplay.setActionBar(
                            {
                                "rawtext": [
                                    {
                                        "text": '§¶§dCOMBAT LOG TIMER§7: §c❚❚❚❚❚❚❚❚❚❚'
                                    }
                                ]
                            }
                        )
                    } else if (oldCombat_timer === 9) { // 9 seconds.
                        player.onScreenDisplay.setActionBar(
                            {
                                "rawtext": [
                                    {
                                        "text": '§¶§dCOMBAT LOG TIMER§7: §2❚§c❚❚❚❚❚❚❚❚❚'
                                    }
                                ]
                            }
                        )
                    } else if (oldCombat_timer === 8) { // 8 seconds.
                        player.onScreenDisplay.setActionBar(
                            {
                                "rawtext": [
                                    {
                                        "text": '§¶§dCOMBAT LOG TIMER§7: §2❚❚§c❚❚❚❚❚❚❚❚'
                                    }
                                ]
                            }
                        )
                    } else if (oldCombat_timer === 7) { // 7 seconds.
                        player.onScreenDisplay.setActionBar(
                            {
                                "rawtext": [
                                    {
                                        "text": '§¶§dCOMBAT LOG TIMER§7: §2❚❚❚§c❚❚❚❚❚❚❚'
                                    }
                                ]
                            }
                        )
                    } else if (oldCombat_timer === 6) { // 6 seconds.
                        player.onScreenDisplay.setActionBar(
                            {
                                "rawtext": [
                                    {
                                        "text": '§¶§dCOMBAT LOG TIMER§7: §2❚❚❚❚§c❚❚❚❚❚❚'
                                    }
                                ]
                            }
                        )
                    } else if (oldCombat_timer === 5) { // 5 seconds.
                        player.onScreenDisplay.setActionBar(
                            {
                                "rawtext": [
                                    {
                                        "text": '§¶§dCOMBAT LOG TIMER§7: §2❚❚❚❚❚§c❚❚❚❚❚'
                                    }
                                ]
                            }
                        )
                    } else if (oldCombat_timer === 4) { // 4 seconds.
                        player.onScreenDisplay.setActionBar(
                            {
                                "rawtext": [
                                    {
                                        "text": '§¶§dCOMBAT LOG TIMER§7: §2❚❚❚❚❚❚§c❚❚❚❚'
                                    }
                                ]
                            }
                        )
                    } else if (oldCombat_timer === 3) { // 3 seconds.
                        player.onScreenDisplay.setActionBar(
                            {
                                "rawtext": [
                                    {
                                        "text": '§¶§dCOMBAT LOG TIMER§7: §2❚❚❚❚❚❚❚§c❚❚❚'
                                    }
                                ]
                            }
                        )
                    } else if (oldCombat_timer === 2) { // 2 seconds.
                        player.onScreenDisplay.setActionBar(
                            {
                                "rawtext": [
                                    {
                                        "text": '§¶§dCOMBAT LOG TIMER§7: §2❚❚❚❚❚❚❚❚§c❚❚'
                                    }
                                ]
                            }
                        )
                    } else if (oldCombat_timer === 1) { // 1 seconds.
                        player.onScreenDisplay.setActionBar(
                            {
                                "rawtext": [
                                    {
                                        "text": '§¶§dCOMBAT LOG TIMER§7: §2❚❚❚❚❚❚❚❚❚§c❚'
                                    }
                                ]
                            }
                        )
                    } else if (oldCombat_timer === 0) { // 0 seconds.
                        player.onScreenDisplay.setActionBar(
                            {
                                "rawtext": [
                                    {
                                        "text": '§¶§dCOMBAT LOG TIMER§7: §2❚❚❚❚❚❚❚❚❚❚\n'
                                    }, {
                                        "text": '§¶§dNO LONGER IN COMBAT'
                                    }
                                ]
                            }
                        )
                    }
                }

                //world border Custom Spawn TP
                if (WorldBorderbool) {
                    const x = Math.floor(player.location.x);
                    const z = Math.floor(player.location.z);
                    if (player.hasTag(configuration.staff_tag) === false) {
                        if (Math.abs(x - (-BorderX + BorderZ) / 2) > Math.abs(-BorderX - BorderZ) / 2 || Math.abs(z - (-BorderZ + BorderZ) / 2) > Math.abs(-BorderZ - BorderZ) / 2) {
                            tp(player, SpawnX, SpawnY, SpawnZ);
                            tellrawServer(`§¶§cUAC §¶§b► §d${player.getName()} §btried passing world border`);
                            TellRB(`flag_0`, `UAC ► ${player.getName()} tried to pass the world border`);
                        }
                    }
                };

                //Entity counter
                const allEntities = world.getDimension('overworld').getEntities({ excludeTypes: ['minecraft:player'] });
                Database.set('entitycount', allEntities.length);

                //Player counter
                const allPlayers = world.getAllPlayers();
                Database.set('playercount', allPlayers.length);

                //Namespoof patch provided by the Paradox Team
                let char_length = player.nameTag;
                for (let i = 0; i < char_length.length; i++) {
                    if (char_length.charCodeAt(i) > 255) {
                        console.warn(`Illegal bytes outside the UTF-8 range`);
                        tellrawStaff(`§¶§cUAC STAFF STAFF ► §6Anti-NameSpoof §bBypass was prevented from §d${name}`);
                        TellRB(`flag_1`, `UAC SYSTEM ► ${name} was kicked for namespoofing`);
                        try { player.runCommandAsync(`kick "${player.nameTag}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lInvalid GamerTag`); }
                        catch { player.runCommandAsync(`event entity @s uac:ban_main`); }
                    }
                    //console.warn(`Everything appears normal`);
                }
            }
            on_tick = 0;
        }
        for (let player of world.getPlayers()) {
            Check_Packet_Behavior(player);
            if (scoreTest(player, 'fzplr') == 1) {
                if (player.hasTag(configuration.staff_tag)) { return player.runCommandAsync(`scoreboard players set @s fzplr 0`); }
                tp(player, scoreTest(player, 'lastpos_x'), scoreTest(player, 'lastpos_y'), scoreTest(player, 'lastpos_z'));
            }
        }
    } catch (e) {
        console.warn(JSON.stringify(e.stack), e)
    }
});

const unobtainables = {
    'minecraft:flowing_lava': 0,
    'minecraft:lava': 0,
    'minecraft:flowing_water': 0,
    'minecraft:water': 0,
    'minecraft:lit_redstone_lamp': 0,
    'minecraft:pistonarmcollision': 0,
    'minecraft:tripwire': 0,
    'minecraft:powered_comparator': 0,
    'minecraft:fire': 0,
    'minecraft:lit_furnace': 0,
    'minecraft:lit_redstone_ore': 0,
    'minecraft:unlit_redstone_torch': 0,
    'minecraft:portal': 0,
    'minecraft:powered_repeater': 0,
    'minecraft:invisiblebedrock': 0,
    'minecraft:end_gateway': 0,
    'minecraft:end_portal': 0,
    'minecraft:end_portal_frame': 0,
    'minecraft:structure_void': 0,
    'minecraft:chalkboard': 0,
    'minecraft:bubble_column': 0,
    'minecraft:lit_smoker': 0,
    'minecraft:lava_cauldron': 0,
    'minecraft:jigsaw': 0,
    'minecraft:lit_blast_furnace': 0,
    'minecraft:light_block': 0,
    'minecraft:stickypistonarmcollision': 0,
    'minecraft:soul_fire': 0,
    'minecraft:lit_deepslate_redstone_ore': 0,
    'minecraft:camera': 0,
    'minecraft:allow': 0,
    'minecraft:deny': 0,
    'minecraft:bedrock': 0,
    'minecraft:barrier': 0,
    'minecraft:border_block': 0,
    'minecraft:structure_block': 0,
    'minecraft:glowingobsidian': 0,
    'minecraft:glow_stick': 0,
    'minecraft:netherreactor': 0,
    'minecraft:info_update': 0,
    'minecraft:glowingobsidian': 0,
};

World.beforeEvents.playerPlaceBlock.subscribe(({ block, player }) => {
    // made originally by frost, and perfected by nightwalkerlots
    const uoimbool = Database.get('uoimtoggle');
    let { x, y, z } = player.location;
    if (block.type.id in unobtainables && uoimbool) {
        TellRB(`flag_1`, `UAC Unobtainable Items ► ${player.nameTag} tried to place ${block.type.id.replace('minecraft:', '')} at ${x} ${y} ${z}`);
        tellrawStaff(`§l§¶§cUAC STAFF ► §6Unobtainable Items §bBlock Placement Flag \nBlock Type §7: §c${block.type.id.replace('minecraft:', '')} §bBlock Placer §7: §c${player.nameTag} §bLocation §7: §c${x} ${y} ${z}`);
        let type = block.type.id.replace('minecraft:', '');
        if (player.hasTag(`staffstatus`)) { return };
        block.setType(BlockTypes.air);
        player.runCommandAsync(`function UAC/asset/illegalitemwarn`);
        tellrawServer(`§¶§c§lUAC ► §6Unobtainable Items §d${player.nameTag} §bwas temp-kicked for having §c${type}`);
        player.runCommandAsync(`clear @s`);
        try { player.runCommandAsync(`kick "${player.nameTag}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lUnobtainable Items | ${type}`); }
        catch { player.runCommandAsync(`event entity @s uac:ban_main`); }
    }
});

world.beforeEvents.itemUseOn.subscribe((eventData) => {
    let item = eventData.itemStack.typeId;
    let name = eventData.source.nameTag;
    let by_player = undefined;
    let p = world.getPlayers();
    for (let i of p) {
        const p_name = i.getName();
        if (!p_name.match(name)) {
            by_player = false;
        } else {
            by_player = true;
        }
    }
    if (!by_player) return;
    if (eventData.source.hasTag(configuration.staff_tag)) return;
});

world.afterEvents.playerSpawn.subscribe((data) => {
    let player = data.player;
    let name = player.nameTag;
    let { x, y, z } = player.location;

    if (scoreTest(player, 'seen_gui') == 0) {
        waitMove.set(player, [x, y, z]);
    }
    if (Database.get('unban') === 1) {
        playerbans(player);
    }
    if (scoreTest(player, 'online') == 1) return;
    overworld.runCommandAsync(`execute as ${name} run function UAC/packages/playerjoined`);
});

//Anti-combat punisher.
world.afterEvents.playerJoin.subscribe((data) => {
    try {
        const player = world.getPlayers({ name: data.playerName })[0];
        console.warn(`${player.name}\n${scoreTest(player, 'combat_timer')}\n${Database.get('clmtoggle')}`);
        if (scoreTest(player, 'combat_timer') >= 1) {
            system.runTimeout(() => {
                if (Database.get('clmtoggle') === 1) { // Kill.
                    player.kill();
                    console.warn('clearing that md rn dawg!');
                    tellrawServer(`§¶§cUAC §¶§b► §6Anti-C Logging §d ${player.name} §bwas killed due combat logging.`);
                } else if (Database.get('clmtoggle') === 2) { // Clear.
                    const inventory = player.getComponent('minecraft:inventory').container;
                    for (let i = 0; i < inventory.size; i++) {
                        inventory.setItem(i);
                    }
                    tellrawServer(`§¶§cUAC §¶§b► §6Anti-C Logging §d${player.name} §bwas cleared due combat logging.`);
                } else return; // Off.
            }, 120);
        }
    } catch (error) {
        console.warn(`An error occured while punishing combat logger ${data.playerName}: ${error}\n${error.stack}`);
    }
});

world.afterEvents.playerLeave.subscribe(() => {
    overworld.runCommandAsync(`scoreboard players set * online 0`);
    overworld.runCommandAsync(`scoreboard players set @a online 1`);
});

//In combat handling.
world.afterEvents.entityHurt.subscribe((data) => {
    try {
        if (!data.damageSource.damagingEntity) return;
        const hurtEntity = data.hurtEntity;
        const damagingEntity = data.damageSource.damagingEntity;
        setScore(hurtEntity, 'combat_timer', 10);
        setScore(damagingEntity, 'combat_timer', 10);
    } catch (error) {
        console.warn(`An error occured while handling combat handler:" ${error}\n${error.stack}`);
    };
}, { entityTypes: ['minecraft:player'] });

// chat filter example code
world.beforeEvents.chatSend.subscribe((data) => {
    try {
        let crbool = Database.get('chatrank');
        let acsbool = Database.get('acstoggle');
        let time = (scoreTest(data.sender, 'chatspam') / 20);
        let mutetime = (time / 60);

        if (data.sender.hasTag('muted')) {
            (data.cancel = true);
            if (scoreTest(data.sender, 'chatspam') <= 1200) {
                data.sender.tellraw(`§¶§c§lUAC ► §bYou are currently muted for §c${time} §bseconds left`)
            } else {
                return data.sender.tellraw(`§¶§c§lUAC ► §bYou are currently muted for §c${mutetime} §bminutes left`)
            }
            return
        }


        if (acsbool) { setScore(data.sender, "chatspam", 100, true); }
        if (acsbool && scoreTest(data.sender, 'chatspam') >= 500 && !data.sender.hasTag(configuration.staff_tag)) {

            (data.cancel = true);
            return data.sender.tellraw(`§¶§cUAC ► §6Anti-ChatSpam §bYour messages are being rate limted. Please Wait §c§l${time} §r§bseconds`);
        }

        let temprank = (`${data.sender.getTags().find((tag) => tag.startsWith("temprank:"))}`);
        if (data.sender.hasTag(temprank)) {
            let givenrank = (`${data.sender.getTags().find((tag) => tag.startsWith("temprank:")).replace('temprank:', '')}`);
            let newrank = (`rank:${givenrank}`);
            let currentrank = (`${data.sender.getTags().find((tag) => tag.startsWith("rank:"))}`);
            if (temprank == currentrank) {
                data.sender.runCommandAsync(`tag @s remove ${temprank}`);
            }
            data.sender.runCommandAsync(`tag @s remove ${currentrank}`);
            data.sender.runCommandAsync(`tag @s add ${newrank}`);
            data.sender.runCommandAsync(`tag @s remove ${temprank}`);
        }

        let tempcolor = (`${data.sender.getTags().find((tag) => tag.startsWith("tempcolor:"))}`);
        if (data.sender.hasTag(tempcolor)) {
            let givencolor = (`${data.sender.getTags().find((tag) => tag.startsWith("tempcolor:")).replace('tempcolor:', '')}`);
            let newcolor = (`color:${givencolor}`);
            let currentcolor = (`${data.sender.getTags().find((tag) => tag.startsWith("color:"))}`);
            if (tempcolor == currentcolor) {
                data.sender.runCommandAsync(`tag @s remove "${tempcolor}"`);
            }
            data.sender.runCommandAsync(`tag @s remove "${currentcolor}"`);
            data.sender.runCommandAsync(`tag @s add "${newcolor}"`);
            data.sender.runCommandAsync(`tag @s remove "${tempcolor}"`);
        }
        if (data.sender.hasTag('rankremove')) {
            let currentrank = (`${data.sender.getTags().find((tag) => tag.startsWith("rank:"))}`);
            data.sender.runCommandAsync(`tag @s remove ${currentrank}`);
            data.sender.runCommandAsync(`tag @s add "rank:Member"`);
            data.sender.runCommandAsync(`tag @s remove rankremove`);
        }
        if (crbool) {
            if (data.message.startsWith(Server.command.prefix)) { return };
            let color = (
                `${data.sender
                    .getTags()
                    .find((tag) => tag.startsWith("color:"))
                    ?.replace(/"/g, '')
                    ?.replace('color:', '') ?? "b"}`
            )
            return (
                (data.cancel = true),
                tellrawServer(`§l§8[§r§${color}${data.sender
                    .getTags()
                    .find((tag) => tag.startsWith("rank:"))
                    ?.substring(5)
                    ?.replaceAll("--", "§r§l§8][§r") ?? "Member"
                    }§l§8]§r §7${data.sender.nameTag}:§r ${data.message}`)
            );
        }
    } catch (error) {
        return (data.cancel = false), console.warn(`${error}, ${error.stack}`);
    }
});

/** 
 * The log of the players break times
 * @type {Object<Player.name: number>}
 */
const log = {};

const ores = [
    'minecraft:ancient_debris',
    'minecraft:diamond_ore',
    'minecraft:deepslate_diamond_ore',
    'minecraft:emerald_ore',
    'minecraft:deepslate_emerald_ore',
    'minecraft:deepslate_redstone_ore',
    "minecraft:coal_ore",
    "minecraft:deepslate_coal_ore",
    'minecraft:lapis_ore',
    'minecraft:deepslate_lapis_ore',
    "minecraft:copper_ore",
    'minecraft:deepslate_copper_ore',
    'minecraft:gold_ore',
    'minecraft:deepslate_gold_ore',
    'minecraft:iron_ore',
    'minecraft:deepslate_iron_ore',
];

world.afterEvents.playerBreakBlock.subscribe(({ brokenBlockPermutation, player }) => {
    try {
        let { x, y, z } = player.location;
        let playername = player.getName();
        let blockname = brokenBlockPermutation.type.id;
        log[player.name] = Date.now();
        const mdmbool = Database.get('mdmtoggledummy');
        const diamond_notiv = Database.get('diamondmd');
        const emerald_notiv = Database.get('emeraldmd');
        const gold_notiv = Database.get('goldmd');
        const copper_notiv = Database.get('coppermd');
        const coal_notiv = Database.get('coalmd');
        const iron_notiv = Database.get('ironmd');
        const lapiz_notiv = Database.get('lapizmd');
        const nether_notiv = Database.get('scrapmd');
        let send_mdm_message = 1;
        //Mining Detection - Beta-API Implementation
        if (ores.includes(blockname) && mdmbool) {
            if (blockname.replace('deepslate_', '') == 'minecraft:diamond_ore') {
                setScore(player, 'diamond_ore', 1, true);
                if (diamond_notiv !== 1) { send_mdm_message = 0; }
            }
            if (blockname.replace('deepslate_', '') == 'minecraft:emerald_ore') {
                setScore(player, 'emerald_ore', 1, true);
                if (emerald_notiv !== 1) { send_mdm_message = 0; }
            }
            if (blockname.replace('deepslate_', '') == 'minecraft:gold_ore') {
                setScore(player, 'gold_ore', 1, true);
                if (gold_notiv !== 1) { send_mdm_message = 0; }
            }
            if (blockname.replace('deepslate_', '') == 'minecraft:iron_ore') {
                setScore(player, 'iron_ore', 1, true);
                if (iron_notiv !== 1) { send_mdm_message = 0; }
            }
            if (blockname.replace('deepslate_', '') == 'minecraft:lapis_ore') {
                setScore(player, 'lapis_ore', 1, true);
                if (lapiz_notiv !== 1) { send_mdm_message = 0; }
            }
            if (blockname == 'minecraft:ancient_debris') {
                setScore(player, 'ancient_debris', 1, true);
                if (nether_notiv !== 1) { send_mdm_message = 0; }
            }
            if (blockname.replace('deepslate_', '') == 'minecraft:copper_ore') {
                setScore(player, 'copper_ore', 1, true);
                if (copper_notiv !== 1) { send_mdm_message = 0; }
            }
            if (blockname.replace('deepslate_', '') == 'minecraft:coal_ore') {
                setScore(player, 'coal_ore', 1, true);
                if (coal_notiv !== 1) { send_mdm_message = 0; }
            }

            if (send_mdm_message === 1) {
                tellrawStaff(`§l§¶§cUAC STAFF ► §6Mining Detection §d§l${playername} §bmined §c${blockname.replace('minecraft:', '')} §bat §c${Math.round(x)} ${Math.round(y)} ${Math.round(z)}. §bTotal §7: §c${scoreTest(player, `${blockname.replace('minecraft:', '').replace('deepslate_', '')}`)}`);
            }
        }

    } catch (e) { console.warn(JSON.stringify(e.stack), e) }
});

world.afterEvents.playerLeave.subscribe((data) => delete log[data.playerName]);