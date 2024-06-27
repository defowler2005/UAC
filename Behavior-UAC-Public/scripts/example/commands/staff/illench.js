import { Database, Server } from '../../../library/Minecraft.js';
import { tellrawStaff } from '../../../library/utils/prototype.js';
import { ItemStack, system, EnchantmentTypes, world } from '@minecraft/server';
import { TellRB } from '../../../library/utils/prototype.js';
const registerInformation = {
    cancelMessage: true,
    name: 'illench',
    staff: 'true',
    description: 'Enables / disables illegal enchantment detection',
    usage: '[ on | off ]',
    example: [
        'illench',
        'illench on',
        'illench off',
    ]
};

/** @type {number} */
let toggle;

system.runInterval(() => {
    let verify = false;
    toggle = Database.get('illench');
    if (toggle === 1) {
        for (let plr of world.getPlayers()) {
            if (plr.hasTag('staffstatus')) return;
            const inventory = plr.getComponent('minecraft:inventory').container;
            for (let i = 0; i < inventory.size; i++) {
                const item = inventory.getItem(i);
                if (!item) continue;
                const itemEnch = item.getComponent('minecraft:enchantable');
                itemEnch?.getEnchantments()?.forEach((ench) => {
                    if (ench.level >= ench.type.maxLevel) {
                        verify = true;
                        tellrawStaff(`§¶§cUAC STAFF §b► §l§d${plr.name} §bhas §cillegal enchantment §bdetected §c${item.typeId.replace('minecraft:', '')} §bin their inventory: §c${ench.type.id} §b(§e${ench.level}§b/§e${ench.type.maxLevel}§b)`);
                        plr.tellraw(`§¶§cUAC §b► §l§d${plr.name} §bhas §cillegal enchantment §bdetected §c${item.typeId.replace('minecraft:', '')} §bin their inventory: §c${ench.type.id} §b(§e${ench.level}§b/§e${ench.type.maxLevel}§b)`);
                        const itemAir = new ItemStack('minecraft:air');
                        inventory.setItem(i, itemAir);
                    }
                })
            };

            if (verify) {
                TellRB(`flag_1`, `UAC Anti-32k ► ${plr.name} was temp-kicked for impossible enchants`);
                plr.runCommandAsync(`function UAC/punish`);
                try {
                    plr.runCommandAsync(`kick "${plr.name}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lInvalid Enchantment | ${item.typeId.replace('minecraft:', '')}`);
                } catch {
                    plr.runCommandAsync(`event entity @s uac:ban_main`);
                }
            };
        }
    }
});

Server.command.register(registerInformation, (chatmsg, args) => {
    const sender = chatmsg.sender;
    try {
        if (sender.hasTag('staffstatus')) {
            if (!args[0]) return sender.tellraw(`§¶§bIllegal enchantment detection status: ${toggle ? '§aENABLED' : '§cDISABLED'}`)
            switch (args[0]) {
                case 'on':
                case 'enable': {
                    tellrawStaff(`§¶§cIllegal§b enchantment detection has been §aENABLED§b by §d${sender.name}`)
                    Database.set('illench', 1);
                }; break;
                case 'off':
                case 'disable': {
                    tellrawStaff(`§¶§cIllegal§b enchantment detection has been §cDISABLED§b by §d${sender.name}`)
                    Database.set('illench', 0);
                }; break;

                default:
                    return plr.tellraw(`§¶§cUAC §b► §c§lError: Invalid argument ${args[0]}`)
            }
        } else {
            sender.tellraw(`§¶§cUAC §b► §c§lError 4: Only Staff can use this command`);
        }
    } catch (e) {
        console.warn(`${e}\n${e?.stack}`)
    }
});