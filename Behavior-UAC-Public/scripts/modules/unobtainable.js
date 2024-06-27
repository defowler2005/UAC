import { scoreTest } from '../library/utils/score_testing';
import maxItemStack, { defaultMaxItemStack } from 'library/utils/maxstack.js';
import { world } from '@minecraft/server';
import { tellrawServer, tellrawStaff } from '../library/utils/prototype';
import { Database } from '../library/Minecraft';
import { configuration } from '../library/build/configurations';
import { TellRB } from '../library/utils/prototype.js';

const unobtainables = [
    'minecraft:pumpkin_stem',
    'minecraft:melon_stem',
    'minecraft:flowing_lava',
    'minecraft:lava',
    'minecraft:flowing_water',
    'minecraft:water',
    'minecraft:lit_redstone_lamp',
    'minecraft:pistonarmcollision',
    'minecraft:tripwire',
    'minecraft:unpowered_comparator',
    'minecraft:powered_comparator',
    'minecraft:fire',
    'minecraft:lit_furnace',
    'minecraft:standing_sign',
    'minecraft:wall_sign',
    'minecraft:lit_redstone_ore',
    'minecraft:unlit_redstone_torch',
    'minecraft:portal',
    'minecraft:daylight_detector_inverted',
    'minecraft:unpowered_repeater',
    'minecraft:powered_repeater',
    'minecraft:invisiblebedrock',
    'minecraft:frosted_ice',
    'minecraft:end_gateway',
    'minecraft:end_portal',
    'minecraft:end_portal_frame',
    'minecraft:structure_void',
    'minecraft:chalkboard',
    'minecraft:movingblock',
    'minecraft:moving_block',
    'minecraft:bubble_column',
    'minecraft:bamboo_sapling',
    'minecraft:lit_smoker',
    'minecraft:sweet_berry_bush',
    'minecraft:lava_cauldron',
    'minecraft:jigsaw',
    'minecraft:lit_blast_furnace',
    'minecraft:light_block',
    'minecraft:stickypistonarmcollision',
    'minecraft:soul_fire',
    'minecraft:lit_deepslate_redstone_ore',
    'minecraft:camera',
    'minecraft:camera_block',
    'minecraft:allow',
    'minecraft:deny',
    'minecraft:bedrock',
    'minecraft:barrier',
    'minecraft:border_block',
    'minecraft:border',
    'minecraft:structure_block',
    'minecraft:command_block',
    'minecraft:chain_command_block',
    'minecraft:repeating_command_block',
    'minecraft:cave_vines_body_with_verries',
    'minecraft:cave_head_body_with_verries',
    'minecraft:glowingobsidian',
    'minecraft:glow_stick',
    'minecraft:netherreactor',
    'minecraft:info_update',
    'minecraft:info_update2',
    'minecraft:zombie_spawn_egg',
    'minecraft:creeper_spawn_egg',
    'minecraft:skeleton_spawn_egg',
    'minecraft:spider_spawn_egg',
    'minecraft:zombie_pigman_spawn_egg',
    'minecraft:slime_spawn_egg',
    'minecraft:enderman_spawn_egg',
    'minecraft:silverfish_spawn_egg',
    'minecraft:cave_spider_spawn_egg',
    'minecraft:ghast_spawn_egg',
    'minecraft:magma_cube_spawn_egg',
    'minecraft:blaze_spawn_egg',
    'minecraft:zombie_villager_spawn_egg',
    'minecraft:witch_spawn_egg',
    'minecraft:stray_spawn_egg',
    'minecraft:husk_spawn_egg',
    'minecraft:wither_skeleton_spawn_egg',
    'minecraft:guardian_spawn_egg',
    'minecraft:elder_guardian_spawn_egg',
    'minecraft:shulker_spawn_egg',
    'minecraft:endermite_spawn_egg',
    'minecraft:vindicator_spawn_egg',
    'minecraft:phantom_spawn_egg',
    'minecraft:ravager_spawn_egg',
    'minecraft:evoker_spawn_egg',
    'minecraft:vex_spawn_egg',
    'minecraft:drowned_spawn_egg',
    'minecraft:piglin_spawn_egg',
    'minecraft:hoglin_spawn_egg',
    'minecraft:zoglin_spawn_egg',
    'minecraft:piglin_brute_spawn_egg',
    'minecraft:chicken_spawn_egg',
    'minecraft:cow_spawn_egg',
    'minecraft:pig_spawn_egg',
    'minecraft:sheep_spawn_egg',
    'minecraft:wolf_spawn_egg',
    'minecraft:villager_spawn_egg',
    'minecraft:mooshroom_spawn_egg',
    'minecraft:squid_spawn_egg',
    'minecraft:rabbit_spawn_egg',
    'minecraft:bat_spawn_egg',
    'minecraft:ocelot_spawn_egg',
    'minecraft:horse_spawn_egg',
    'minecraft:donkey_spawn_egg',
    'minecraft:mule_spawn_egg',
    'minecraft:skeleton_horse_spawn_egg',
    'minecraft:zombie_horse_spawn_egg',
    'minecraft:polar_bear_spawn_egg',
    'minecraft:llama_spawn_egg',
    'minecraft:parrot_spawn_egg',
    'minecraft:dolphin_spawn_egg',
    'minecraft:turtle_spawn_egg',
    'minecraft:cat_spawn_egg',
    'minecraft:pufferfish_spawn_egg',
    'minecraft:salmon_spawn_egg',
    'minecraft:tropical_fish_spawn_egg',
    'minecraft:cod_spawn_egg',
    'minecraft:panda_spawn_egg',
    'minecraft:wandering_trader_spawn_egg',
    'minecraft:fox_spawn_egg',
    'minecraft:bee_spawn_egg',
    'minecraft:strider_spawn_egg',
    'minecraft:goat_spawn_egg',
    'minecraft:axolotl_spawn_egg',
    'minecraft:glow_squid_spawn_egg',
    'minecraft:npc_spawn_egg'
];

function unobtainableOld() {
    const uoimbool = scoreTest('uoimtoggledummy', 'uoimtoggle');
    const lore_bool = scoreTest('almdummy', 'almtoggle');
    if (uoimbool != 1) return;

    let players = world.getPlayers();
    for (let player of players) {
        const name = player.getName();
        if (player.hasTag(`staffstatus`)) { continue };
        let playerInventory = player.getComponent("minecraft:inventory").container;

        let itemArray = [];
        let itemname = undefined;
        for (let i = 0; i < playerInventory.size; i++) {
            const item = playerInventory.getItem(i);
            if (!item) { continue; }
            const maxStack = maxItemStack[item.id] ?? defaultMaxItemStack;
            let loreData = String(item.getLore());
            itemname = item.id.replace('minecraft:', '');
            let displayname = item.nameTag;

            //flag illegal stack of items
            if (item.amount < 0 || item.amount > maxStack) {
                TellRB(`flag_1`, `UAC Unobtainable Items (Max Stack Size) ► ${name} flagged for having ${item.amount} of ${itemname}`);
                tellrawStaff(`§l§¶§cUAC STAFF ► §6Unobtainable Items §d${name} §bhad §c${item.amount} §bof §c${itemname}`);
                playerInventory.clearItem(i); //removes item
            }

            //flag items with lore data
            if (loreData.length && lore_bool) {
                if (loreData == '(+DATA)') continue;
                TellRB(`flag_1`, `UAC Unobtainable Items (Lore Flag) ► ${name} had modified lore on ${itemname}\nDISPLAY NAME : ${displayname}\NLORE : ${loreData}`);
                tellrawStaff(`§l§¶§cUAC STAFF ► §6Unobtainable Items §d${name} §bhad modified lore on §c${itemname} \n§6§lLore§7: §c§l' ${loreData} '\n§6§lDisplay Name§7: §c§l' ${displayname} '`);
                playerInventory.clearItem(i); //removes item
                try {
                    player.runCommandAsync(`kick ${name} §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lUnobtainable Item | ${itemname}`);
                } catch {
                    player.runCommandAsync(`event entity @s uac:ban_main`);
                }
            }

            //flag element items
            if (item.id.includes(`element`)) {
                TellRB(`flag_1`, `UAC Unobtainable Items (elements) ► ${name} had ${item.amount} of ${itemname}`);
                tellrawStaff(`§l§¶§cUAC STAFF ► §6Unobtainable Items §d${name} §bhad §c${item.amount} §bof §c${itemname}`);
                playerInventory.clearItem(i); //removes item
            }

            //flag illegal items
            if (item.id in unobtainables || item.id.includes(`_egg`)) {
                itemArray.unshift(item.id);
                playerInventory.clearItem(i); //removes item
            }
            if (itemArray.length) {
                player.runCommandAsync('function UAC/asset/illegalitemwarn');
                tellrawServer(`§¶§c§lUAC ► §6Unobtainable Items §d${name} §bwas temp-kicked for having §c${itemname}`);
                TellRB(`flag_1`, `UAC Unobtainable Items ► ${name} kicked for having ${item.amount} of ${itemname}`);
                player.runCommandAsync(`clear @s`);
                try {
                    player.runCommandAsync(`kick ${name} §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lUnobtainable Item | ${itemname}`);
                } catch {
                    player.runCommandAsync(`event entity @s uac:ban_main`);
                }
            }
        }
    }
};

function unobtainable() {
    if (Database.get('uoimtoggle') !== 1) return;

    world.getPlayers({ excludeTags: [configuration.staff_tag] }).forEach((player) => {
        const inventory = player.getComponent('minecraft:inventory').container;
        const name = player.getName();
        for (let i = 0; i < inventory.size; i++) {
            const item = inventory.getItem(i);
            if (!item) continue;
            if (unobtainables.includes(item.typeId) || item.typeId.includes(`_egg`)) {
                player.runCommandAsync('function UAC/asset/illegalitemwarn');
                inventory.setItem(i); //removes item.
                TellRB(`flag_1`, `UAC Unobtainable Items ► ${name} kicked for having ${item.amount} of ${item.typeId}`);
                tellrawServer(`§¶§c§lUAC ► §6Unobtainable Items §d${name} §bwas temp-kicked for having §c${item.typeId}`);
                try {
                    player.runCommandAsync(`kick ${name} §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lUnobtainable Item | ${item.typeId}`);
                } catch (error) { };
            } else if (item.typeId.includes(`element`)) {
                TellRB(`flag_1`, `UAC Unobtainable Items (elements) ► ${name} had ${item.amount} of ${itemname}`);
                tellrawStaff(`§l§¶§cUAC STAFF ► §6Unobtainable Items §d${name} §bhad §c${item.amount} §bof §c${itemname}`);
                inventory.setItem(i); //removes item.
            }
        }
    })
};

export { unobtainable };

"execute @s[tag=!staffstatus,scores={UOIM=1}] ~~~ replaceitem entity @s slot.weapon.mainhand 0 air",
    "execute @s[tag=!staffstatus,scores={UOIM=1}] ~~~ function UAC/asset/clearspawneggasset",
    "execute @s[tag=!staffstatus] ~~~ execute @s[scores={UOIM=1}] ~~~ function UAC/asset/illegalitemkickmsg",
    "execute @s[tag=!staffstatus] ~~~ execute @s[scores={UOIM=1}] ~~~ function UAC/asset/illegalitemwarn"