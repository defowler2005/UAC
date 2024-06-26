import { Player, world, system } from '@minecraft/server';
import { Database, Server } from '../../../library/Minecraft.js';
import { ActionFormData, ModalFormData } from '@minecraft/server-ui';
import { scoreTest, setScore } from '../../../library/utils/score_testing.js'
import { tellrawStaff } from '../../../library/utils/prototype.js';
const obj = {};

const moduleRequires = ['has_xx', 'has_gt']
export const moduleDefs_prots = [
    {
        mname: 'Anti-Fly',
        obj: ['afmtoggle', 'AFM'],
        name: 'afmtoggledummy',
        toggle: ['§cOFF', '§aON'],
        require: 'has_xx'
    },
    {
        mname: 'Anti-Lore',
        obj: ['almtoggle', 'almtoggle'],
        name: 'almdummy',
        toggle: ['§cOFF', '§aON'],
        require: 'has_gt'
    },
    {
        mname: 'Anti-Reach',
        obj: ['armtoggle'],
        name: 'armtoggledummy',
        toggle: ['§cOFF', '§aON'],
        require: ''
    },
    {
        mname: 'Item Ban',
        obj: ['IBM', 'ibmtoggle'],
        name: 'ibmtoggledummy',
        toggle: ['§cOFF', '§aON'],
        require: ''
    },
    {
        mname: 'Mining Detection',
        obj: ['mdmtoggle', 'MDM'],
        name: 'mdmtoggledummy',
        toggle: ['§cOFF', '§aON'],
        require: ''
    },
    {
        mname: 'Movement Check',
        obj: ['afmtoggle'],
        name: 'pkdummy',
        toggle: ['§cOFF', '§aON'],
        require: 'has_gt'
    },
    {
        mname: 'Unobtainable Items',
        obj: ['UOIM'],
        name: 'uoimtoggle',
        toggle: ['§cOFF', '§aON'],
        require: 'has_xx'
    },
    {
        mname: 'Illegal Enchantments',
        obj: ['ILIM'],
        name: 'illench',
        toggle: ['§cOFF', '§aON'],
        require: 'has_gt'
    }
];

export const moduleDefs_util = [
    {
        mname: 'AFK Kick',
        obj: ['afkm'],
        name: 'afkdummy',
        toggle: ['§cOFF', '§aON'],
        require: ''
    },
    {
        mname: 'Anti CLog',
        obj: ['clmtoggle'],
        name: 'clmtoggle',
        toggle: ['§cOFF', '§aKILL', '§aCLEAR'],
        require: 'has_xx'
    },
    {
        mname: 'Anti ChatSpam',
        obj: ['acstoggle', 'acstoggle'],
        name: 'acsdummy',
        toggle: ['§cOFF', '§aON'],
        require: 'has_gt'
    },
    {
        mname: 'Anti-EnderChest',
        obj: ['NEM', 'nemtoggle'],
        name: 'nemtoggledummy',
        toggle: ['§cOFF', '§aON'],
        require: ''
    },
    {
        mname: 'Bottom Bedrock',
        obj: ['BBM', 'bbmtoggle'],
        name: 'bbmtoggledummy',
        toggle: ['§cOFF', '§aON'],
        require: 'has_xx'
    },
    {
        mname: 'Chat Ranks',
        obj: ['chatrank', 'chatrank'],
        name: 'crdummy',
        toggle: ['§cOFF', '§aON'],
        require: 'has_gt'
    },
    {
        mname: 'Death Toggle',
        obj: ['dethtoggle', 'Deathef'],
        name: 'dethtoggle',
        toggle: ['§cOFF', '§aON'],
        require: 'has_xx'
    },
    {
        mname: 'Hotbar Message',
        obj: ['HMM', 'hmmtoggle'],
        name: 'hmmtoggle',
        toggle: ['§cOFF', '§aWith Score', '§aWithout Score', '§aResourcePack Mode'],
        require: ''
    },
    {
        mname: 'Lag Clear',
        obj: ['LTM', 'ltmtoggle'],
        name: 'ltmtoggledummy',
        toggle: ['§cOFF', '§aON'],
        require: ''
    },
    {
        mname: 'Player Commands',
        obj: ['ICM', 'icmtoggle'],
        name: 'icmtoggle',
        toggle: ['§cOFF', '§aON'],
        require: 'has_gt'
    },
    {
        mname: 'One Player Sleep',
        obj: ['opstoggle'],
        name: 'opstoggle',
        toggle: ['§cOFF', '§aON'],
        require: 'has_gt'
    },
    {
        mname: 'Random Spawn',
        obj: ['RSM', 'rsmtoggle'],
        name: 'rsmtoggledummy',
        toggle: ['§cOFF', '§aON'],
        require: 'has_xx'
    },
    {
        mname: 'RealmBot Flag Relay',
        obj: ['acstoggle', 'acstoggle'],
        name: 'rbflagdummy',
        toggle: ['§cOFF', '§aON'],
        require: 'has_gt'
    },
    {
        mname: 'Time Played',
        obj: ['TPM', 'tpmtoggle'],
        name: 'tpmtoggledummy',
        toggle: ['§cOFF', '§aON'],
        require: ''
    },
    {
        mname: 'World Border',
        obj: ['WBM', 'wbmtoggle'],
        name: 'wbmtoggle',
        toggle: ['§cOFF', '§aON'],
        require: 'has_gt'
    }
];

const itembanDefs = [
    { mname: 'Harming Arrow', obj: 'BNA', name: 'BNAdummy' },
    { mname: 'Book and Quill', obj: 'BNBQ', name: 'BNBQdummy' },
    { mname: 'Crossbow', obj: 'BNCB', name: 'BNCBdummy' },
    { mname: 'Maps', obj: 'BNM', name: 'BNMdummy' },
    { mname: 'Shulkerboxes', obj: 'BNSB', name: 'BNSBdummy' },
    { mname: 'TNT', obj: 'BNTN', name: 'BNMTNummy' },
    { mname: 'Trident', obj: 'BNTD', name: 'BNMTDummy' }
];

const oreBanDefs = [
    { mname: 'Diamond', obj: 'diamondmd', name: 'mdmtoggledummy' },
    { mname: 'Emerald', obj: 'emeraldmd', name: 'mdmtoggledummy' },
    { mname: 'Gold', obj: 'goldmd', name: 'mdmtoggledummy' },
    { mname: 'Iron', obj: 'ironmd', name: 'mdmtoggledummy' },
    { mname: 'Copper', obj: 'coppermd', name: 'mdmtoggledummy' },
    { mname: 'Coal', obj: 'coalmd', name: 'mdmtoggledummy' },
    { mname: 'Lapis', obj: 'lapizmd', name: 'mdmtoggledummy' },
    { mname: 'Netherite', obj: 'scrapmd', name: 'mdmtoggledummy' }
];

const kitDefs = [
    { mname: 'Netherite', structure: 'AdminNether' },
    { mname: 'ULegitNetherite', structure: 'AdminUnbreakableNetherlegit' },
    { mname: 'U32kNetherite', structure: 'AdminUnbreakableNether32k' },
    { mname: 'Diamond', structure: 'AdminDiamond' },
    { mname: 'ULegitDiamond', structure: 'AdminUnbreakableDiamondLegit' },
    { mname: 'U32kDiamond', structure: 'AdminUnbreakableDiamond32k' },
    { mname: 'Iron', structure: 'AdminIron' },
    { mname: 'ULegitIron', structure: 'AdminUnbreakableironlegit' },
    { mname: 'U32kIron', structure: 'AdminUnbreakableiron32k' }
];

const particleDefs = [
    { mname: 'Explode', fn: 'explode' },
    { mname: 'Nether Poof', fn: 'nether_poof_small' },
    { mname: 'Nether Poof Small', fn: 'nether_poof' },
    { mname: 'Totem Poof', fn: 'totem_poof' },
];

/** @type { (plr: Player, module: typeof moduleDefs_prots[number], newValue?: number, newValue?: String) => void } */
const setModule = (plr, module, newValue) => {
    try {
        const oldValue = Number(Database.get(module.name));
        if (oldValue !== newValue) {
            tellrawStaff(`§¶§cUAC STAFF ► §bPlayer §d${plr.name}§b has set the module §e${module.mname}§b to ${module.toggle[newValue]}`)
            Database.set(module.name, newValue === null ? 0 : newValue);
        };
    } catch (error) {
        console.warn(`An error occured while setting modules in GUI: ${error}\n${error.stack}`);
    }
};

const guiScheme = {
    /** @type { (plr: Player) => void } */
    main: (() => { // main UI
        /** @type { [name: string, fn: (plr: Player) => void][] } */
        const actionList = [
            ['Modules', plr => guiScheme.toggle_main(plr)],
            ['Item bans', plr => guiScheme.itemban(plr)],
            ['Ore alerts', plr => guiScheme.oreban(plr)],
            ['Kits', plr => guiScheme.kits(plr)],
            ['Particles', plr => guiScheme.particles(plr)],
            ['World Border', plr => guiScheme.worldborder(plr)],
            ['Spawn coords', plr => guiScheme.spawnCoord(plr)],
            ['Player Command', plr => guiScheme.pcmd['new'](plr)],
            ['More', plr => guiScheme.more(plr)],
            ['Close', plr => { }],
        ];
        const v = new ActionFormData()
            .title('Unity Anticheat')

        for (let [name, f] of actionList) v.button(name)

        return (plr) => void v.show(plr).then(v => {
            if (v.canceled) return
            actionList[v.selection][1](plr)
        })
    })(),

    NonStaff: (() => { // UI for non-staff players
        /** @type { [name: string, fn: (plr: Player) => void][] } */
        const cmdlist = [
            ['Your Stats', plr => guiScheme.pcmd.playerstats(plr)],
            ['Change Display', plr => guiScheme.pcmd.display(plr)],
            ['TPA to Player', plr => guiScheme.pcmd.tpa_main_menu(plr)],
            ['TP to Spawn', plr => guiScheme.pcmd.spawntp(plr)],
            ['Last Death Coords', plr => guiScheme.pcmd.lastdeath(plr)],
            ['Close', plr => { }],
        ]
        const v = new ActionFormData()
            .title('Player Command GUI')

        for (let [name, f] of cmdlist) v.button(name)

        return (plr) => void v.show(plr).then(v => {
            if (v.canceled) return
            cmdlist[v.selection][1](plr)
        })
    })(),

    player_welcome: ((plr) => { // UI for non-staff players
        const v = new ActionFormData()
            .title(`Welcome`)

        let text = [];

        text.push(`§l§bWelcome!`)
        text.push(`§l§bProtected by §cUAC \n§bby §dNightwalkerLots`)
        text.push(`§l`) //space
        text.push(`§6UAC.help §bfor player commands`)
        text.push(`§6UAC.gui §bfor ease of access`)
        text.push(`§l`) //space
        text.push(`§bJoin the UAC discord for updates`)
        text.push(`§6${configuration.discord_server}`)
        text.push('§l') //space
        text.push('§6This Discord server is not operated by §dNightwalkerLots but rather by defowler2005, who enjoys programming, and likes UAC ')
        text.push('§l') //space
        v.body(text.join('\n§r'))
        const welcome = [
            ['Accept', plr => guiScheme.pcmd.welcome_accept(plr)]
        ];

        for (let [name, f] of welcome) v.button(name)

        return (plr) => void v.show(plr).then((v) => {
            if (v.canceled) return
            welcome[v.selection][1](plr);
        })
    })(),

    pcmd: {
        display: (plr) => {
            if (Database.get('hmmtoggle') >= 1) return plr.tellraw(`§¶§cUAC ► §c§lRealm owner has set a global hotbar message `);

            const actionList = [
                ['Personal Stats', () => setScore(plr, 'hometp', 1337, false)],
                ['Server Stats', () => setScore(plr, 'hometp', 420, false)],
                ['Off', () => setScore(plr, 'hometp', 3, false)],
                ['back', () => guiScheme.NonStaff(plr)]
            ];

            const v = new ActionFormData()
                .title(`Change Display Message`)

            for (let [name, f] of actionList) v.button(name);


            v.show(plr).then(v => {
                if (v.canceled) return
                actionList[v.selection][1]();
            })
        },

        lastdeath: (plr) => {
            const x = scoreTest(plr, 'X_Coord_D');
            const y = scoreTest(plr, 'Y_Coord_D');
            const z = scoreTest(plr, 'Z_Coord_D');

            plr.sendMessage(`§¶§cUAC ► §¶§d${plr.getName()} §b Death Coords: §g${x ?? 'unknown'}/${y ?? 'unknown'}/${z ?? 'unknown'}`);
        },
        welcome_accept: (plr) => {
            setScore(plr, 'seen_gui', 1, false)
        },
        spawntp: (plr) => {
            let name = plr.getName();


            if (scoreTest(plr, 'tp_cooldown') >= 1) return plr.tellraw(`§¶§cUAC ► §6TPA §cunavailable §bwhile warp commands are in cooldown. Please wait 40 seconds.`)
            if (scoreTest(plr, 'worldcustom') === 1) {
                plr.runCommandAsync(`tp @s ${scoreTest(plr, 'Worldx')} ${scoreTest(plr, 'Worldy')} ${scoreTest(plr, 'Worldz')}`);
                plr.tellraw(`§¶§cUAC ► §l§d${name} §bHas warped to World Spawn at §6${scoreTest(plr, 'Worldx')} ${scoreTest(plr, 'Worldy')} ${scoreTest(plr, 'Worldz')}`);
                tellrawStaff(`§¶§cUAC STAFF ► §d${name} §bwarped to worldspawn`);
                plr.runCommandAsync(`function particle/nether_poof`);
                setScore(plr, 'tp_cooldown', 900, false);
            }
            else {
                plr.runCommandAsync(`tp @s 0 100 0`)
                plr.runCommandAsync(`effect @s slow_falling 35 1 `);
                tellrawStaff(`§¶§cUAC STAFF ► §d${name} §bwarped to worldspawn`);
                plr.runCommandAsync(`function particle/nether_poof`);
                setScore(plr, 'tp_cooldown', 900, false);
            }
        },

        tpa_select: (plr, _a = 0) => {
            //let name = plr.getName();
            const pl = [...world.getPlayers()].filter(v => v !== plr)
            const v = new ModalFormData()
                .title('Player TPA')
                .textField(
                    (
                        _a == 1 ? '§cPlayer not found.\n§r'
                            : _a == 2 ? '§cCannot target yourself.\n§r'
                                : ''
                    ) + 'Type in the player name. Leave blank to cancel',
                    'Player name'
                )
                .dropdown('Or select a player:', ['§8None§r', ...pl.map(v => v.name)]);

            v.show(plr).then((v) => {
                const input = v.formValues[0],
                    selection = v.formValues[1]
                if ((!input && !selection) || v.canceled) return guiScheme.NonStaff(plr)
                const inputUnformatted = input.replace(/§./g, '')

                const target =
                    (!input ? null : [...world.getPlayers()].find(v => v.name == input || v.name.replace(/§./g, '') == inputUnformatted))
                    || (!selection ? null : pl[selection - 1])
                if (!target) return guiScheme.pcmd.tpa_select(plr, 1)
                if (target == plr) return guiScheme.pcmd.tpa_select(plr, 2)
                guiScheme.pcmd.tpa_request(plr, target)

            })
        },

        tpa_main_menu: (plr, target) => {
            const v = new ActionFormData()
                .title(`§l§bTPA options`)

            let text = []
            text.push(`§l§cMust Cancel or Decline Requests before making a new one`)

            const cmdlist = [
                ['Choose Player for TPA', () => guiScheme.pcmd.tpa_select(plr, target)],
                ['Cancel/Deny Request(s)', () => guiScheme.pcmd.tpa_cancel(plr, target)],
                ['Accept Request(s)', () => guiScheme.pcmd.tpa_accept(plr, target)],
                ['Back', () => guiScheme.NonStaff(plr)]
            ]
            for (let [name, f] of cmdlist) v.button(name)

            v.show(plr).then(v => {
                if (v.canceled) return
                cmdlist[v.selection][1]();
            })

        },

        tpa_request: (plr, target) => {
            const v = new ActionFormData()
                .title(`${target.name.replace(/§./g, '')}'s TPA options`)

            let text = []
            if (scoreTest(plr, 'tp_cooldown') >= 1) return plr.tellraw(`§¶§cUAC ► §6TPA §cunavailable §bwhile warp commands are in cooldown. Please wait §c${scoreTest(plr, 'tp_cooldown')}§b seconds.`)
            text.push(`§l§bSend a TPA to §d${target.name.replace(/§./g, '')}§b?`)
            v.body(text.join('\n§r'));
            const cmdlist = [
                ['Send Request', () => guiScheme.pcmd.tpa_send(plr, target)]
            ]

            for (let [name, f] of cmdlist) v.button(name);

            v.show(plr).then(v => {
                if (v.canceled) return
                cmdlist[v.selection][1]()
            })

        },
        tpa_send: (plr, target) => {
            let name = plr.getName();
            if (scoreTest(plr, 'tpa') >= 1) return plr.tellraw(`§¶§cUAC ► §bTPA Channel already created! Your Channel §7:§c "${scoreTest(plr, 'tpa')}" \n§bCancel to create a new request.`);
            if (scoreTest(plr, 'tp_cooldown') >= 1) return plr.tellraw(`§¶§cUAC ► §6TPA §cunavailable §bwhile warp commands are in cooldown. Please wait 40 seconds.`);
            const randomNumber = Math.floor(Math.random() * (999999 - 1 + 1)) + 1;
            setScore(plr, 'tpa', randomNumber, false);
            setScore(plr, 'tp_cooldown', 900, false);
            plr.runCommandAsync('tag @s add tpatemp');
            if (target.hasTag(`tpatemp`)) target.runCommandAsync(`tag @s remove tpatemp`);
            plr.runCommandAsync(`scoreboard players operation "${target.getName()}" tpa = "${name}" tpa`);
            target.tellraw(`§¶§cUAC ► §d${name} §bhas sent you a TPA Request. Use §6UAC.tpa accept §bto accept the request`);
            plr.tellraw(`§¶§cUAC ► §d${target.getName()} §bwas sent a TPA Request`);
            tellrawStaff(`§¶§cUAC STAFF ► §d${name} §bsent a TPA Request to §d${target.getName()}`);
        },
        tpa_cancel: (plr, target) => {
            plr.runCommandAsync(`execute @a[tag=tpatemp,scores={tpa=${scoreTest(plr, 'tpa')}}] ~~~ tag @s remove tpatemp`);
            plr.runCommandAsync(`scoreboard players set @a[scores={tpa=${scoreTest(plr, 'tpa')}}] tpa 0`);
            plr.tellraw(`§¶§cUAC ► §bThe TPA request was closed`);
            tellrawStaff(`§¶§cUAC STAFF ► §d${plr.getName()} §bclosed a TPA request `);
        },
        tpa_accept: (plr, target) => {
            let name = plr.getName();
            if (scoreTest(plr, 'tpa') === 0) return plr.tellraw(`§¶§c§lUAC ► §cNo TPA Requests to accept`);
            if (plr.hasTag('tpatemp')) return plr.tellraw(`§¶§c§lUAC ► §cYou have a request open to someone, and cannot accept others.`);
            if (scoreTest(plr, 'tp_cooldown') >= 1) return plr.tellraw(`§¶§cUAC ► §6TPA §cunavailable §bwhile warp commands are in cooldown. Please wait 40 seconds.`)

            plr.tellraw(`§¶§cUAC ► §bTPA Request was §2ACCEPTED§7.`);
            tellrawStaff(`§¶§cUAC STAFF ► §d${name} §baccepted a TPA request `);
            plr.runCommandAsync(`execute @p[name=!"${name}",scores={tpa=${scoreTest(plr, 'tpa')}}] ~~~ tp @s "${name}"`);
            setScore(plr, 'tp_cooldown', 900, false);
            plr.runCommandAsync(`execute @p[name=!"${name}",scores={tpa=${scoreTest(plr, 'tpa')}}] ~~~ scoreboard players set @s tp_cooldown 900`);

            plr.runCommandAsync(`execute @p[name=!"${name}",scores={tpa=${scoreTest(plr, 'tpa')}}] ~~~ playsound note.pling @s ~ ~ ~`);
            plr.runCommandAsync(`execute @p[name=!"${name}",scores={tpa=${scoreTest(plr, 'tpa')}}] ~~~ function particle/nether_poof`);
            plr.runCommandAsync(`execute @p[name=!"${name}",scores={tpa=${scoreTest(plr, 'tpa')}}] ~~~ playsound mob.shulker.teleport @s ~~~ 2 2 2`);

            plr.runCommandAsync(`scoreboard players set @a[scores={tpa=${scoreTest(plr, 'tpa')}}] tpa 0`);
            plr.runCommandAsync(`execute @a[tag=tpatemp,scores={tpa=${scoreTest(plr, 'tpa')}}] ~~~ tag @s remove tpatemp`);
        },


        /** @type { (plr: Player, target: Player) => void } */
        stats: (plr, target) => {
            const v = new ActionFormData()
                .title(`${target.name.replace(/§./g, '')}'s stats`);

            let text = [];

            // location
            text.push('§l§eLocation');
            const plrFacing = obj('Player_Facing').players.get(target) // down up north south west east
            const plrCoord = ['X_Coordinate', 'Y_Coordinate', 'Z_Coordinate'].map(v => obj(v).players.get(target))
            const spawnCoord = ['X_Coord_S', 'Y_Coord_S', 'Z_Coord_S'].map(v => obj(v).players.get(target))
            const deathCoord = ['X_Coord_D', 'Y_Coord_D', 'Z_Coord_D'].map(v => obj(v).players.get(target))

            text.push(`Location: ${plrCoord.map(v => `§a${v}§r`).join(', ')}`)
            text.push(`SpawnLoc: ${spawnCoord.map(v => `§a${v}§r`).join(', ')}`)
            text.push(`DeathLoc: ${deathCoord.map(v => `§a${v}§r`).join(', ')}`)
            text.push(`Facing: §b${plrFacing == 0 ? 'DOWN'
                : plrFacing == 1 ? 'UP'
                    : plrFacing == 2 ? 'NORTH'
                        : plrFacing == 3 ? 'SOUTH'
                            : plrFacing == 4 ? 'WEST'
                                : plrFacing == 5 ? 'EAST'
                                    : 'UNKNOWN'
                }`);
            text.push(`Dimension: §b${target.dimension.toUpperCase()}`)
            text.push('') // newline

            // permissions
            text.push('§l§ePermissions');
            const isStaff = target.hasTag('staffstatus');
            const isOwner = target.hasTag('ownerstatus');
            const mayFly = scoreTest(target, '2KK001') === 725;
            const isGodmode = target.hasTag('tgmGodMode');
            const gamemode = target.getGameMode();

            text.push(`Staff: ${isStaff ? '§aYes' : '§eNo'}`)
            text.push(`Owner: ${isOwner ? '§aYes' : '§eNo'}`)
            text.push(`Mayfly: ${mayFly ? '§aYes' : '§eNo'}`)
            text.push(`Godmode: ${isGodmode ? '§aYes' : '§eNo'}`)
            text.push(`Gamemode: §b${gamemode.charAt(0).toUpperCase()}`)
            text.push(''); // newline

            // detections
            /** @type {[id: string, name: string, max: number][]} */
            const detections = [
                ['warn', 'Warns', 3],
                ['gmc_flag', 'GMC flags', 4],
                ['warnillegal', 'Illegal item warns', 9],
            ];
            text.push('§l§eDetections')
            for (let [id, name, max] of detections) {
                text.push(`${name}:  §e${scoreTest(target, id)}§r / §e${max}§r`);

                text.push('') // newline

                const ores_mined = [
                    ['diamond_ore', 'Diamonds'],
                    ['gold_ore', 'Gold'],
                    ['lapis_ore', 'Lapis'],
                    ['ancient_debris', 'Netherite'],
                    ['emerald_ore', 'Emeralds'],
                    ['iron_ore', 'Iron'],
                    ['copper_ore', 'Copper'],
                    ['coal_ore', 'Coal']
                ];
                for (const [id, name] of ores_mined) {
                text.push('§l§eOres Mined');
                text.push(`${name}: §e${scoreTest(target, id)}§r`);
                }
            };

            v.body(text.join('\n§r'))
            v.button('Back')
            v.show(plr).then(() => guiScheme.pcmd.exec(plr, target))
        },
        inv: (plr, target) => {
            const v = new ActionFormData()
                .title(`${target.name.replace(/§./g, '')}'s Items`)

            let text = []
            let targ_name = target.name;
            let head_type = undefined;
            let chest_type = undefined;
            let leg_type = undefined;
            let boot_type = undefined;
            let head_enchanted = scoreTest(targ_name, 'headen');
            let chest_enchanted = scoreTest(targ_name, 'chesten');
            let leg_enchanted = scoreTest(targ_name, 'legen');
            let boot_enchanted = scoreTest(targ_name, 'feeten');

            if (scoreTest(target, 'nethhelm') === 1) { head_type = 'Netherite' }
            if (scoreTest(target, 'diahelm') === 1) { head_type = 'Diamond' }
            if (scoreTest(target, 'ironhelm') === 1) { head_type = 'Iron' }
            if (scoreTest(target, 'goldhelm') === 1) { head_type = 'Gold' }
            if (scoreTest(target, 'chainhelm') === 1) { head_type = 'Chainmail' }
            if (scoreTest(target, 'leathhelm') === 1) { head_type = 'Leather' }
            if (scoreTest(target, 'turthelm') === 1) { head_type = 'Turtle' }
            if (head_type == undefined) { head_type = 'None' }

            if (scoreTest(target, 'nethchest') === 1) { chest_type = 'Netherite' }
            if (scoreTest(target, 'diachest') === 1) { chest_type = 'Diamond' }
            if (scoreTest(target, 'goldchest') === 1) { chest_type = 'Gold' }
            if (scoreTest(target, 'ironchest') === 1) { chest_type = 'Iron' }
            if (scoreTest(target, 'chainchest') === 1) { chest_type = 'Chain' }
            if (scoreTest(target, 'leathchest') === 1) { chest_type = 'Leather' }
            if (scoreTest(target, 'elytra') === 1) { chest_type = 'Elytra' }
            if (chest_type == undefined) { chest_type = 'None' }

            if (scoreTest(target, 'nethlegs') === 1) { leg_type = 'Netherite' }
            if (scoreTest(target, 'dialegs') === 1) { leg_type = 'Diamond' }
            if (scoreTest(target, 'ironlegs') === 1) { leg_type = 'Iron' }
            if (scoreTest(target, 'goldlegs') === 1) { leg_type = 'Gold' }
            if (scoreTest(target, 'chainlegs') === 1) { leg_type = 'Chain' }
            if (scoreTest(target, 'leathlegs') === 1) { leg_type = 'Leather' }
            if (leg_type == undefined) { leg_type = 'None' }

            if (scoreTest(target, 'nethboots') === 1) { boot_type = 'Netherite' }
            if (scoreTest(target, 'diaboots') === 1) { boot_type = 'Diamond' }
            if (scoreTest(target, 'ironboots') === 1) { boot_type = 'Iron' }
            if (scoreTest(target, 'goldboots') === 1) { boot_type = 'Gold' }
            if (scoreTest(target, 'chainboots') === 1) { boot_type = 'Chain' }
            if (scoreTest(target, 'leathboots') === 1) { boot_type = 'Leather' }
            if (boot_type == undefined) { boot_type = 'None' }


            // Armor
            text.push(`§d§l${target.getName()}'s §bArmor §7:`);
            text.push(`§b§lHelmet §7: §c${head_type} §bEnchant §7: ${head_enchanted ? '§2TRUE' : '§cFALSE'}`);
            text.push(`§b§lChest §7: §c${chest_type} §bEnchant §7: ${chest_enchanted ? '§2TRUE' : '§cFALSE'}`);
            text.push(`§b§lLegs §7: §c${leg_type} §bEnchant §7: ${leg_enchanted ? '§2TRUE' : '§cFALSE'}`);
            text.push(`§b§lBoots §7: §c${boot_type} §bEnchant §7: ${boot_enchanted ? '§2TRUE' : '§cFALSE'}`);

            text.push(` `) // new line
            let items = target.getInventory(true);
            text.push(
                `§¶§d§l${target.getName()} §binventory:\n${items
                    .map(({ slot, id, amount, data }) => `§¶§6§lslot: §¶§c${slot} §¶§6§lid: §¶§c${id.replace('minecraft:', '')} §¶§6§lamount: §¶§c${amount} §¶§6§ldata: §¶§c${data}`)
                    .join('\n')}`);

            v.body(text.join('\n§r'))
            v.button('Back')

            v.show(plr).then(() => guiScheme.pcmd.exec(plr, target))
        },

        playerstats: (plr, target) => { // Non-staff stats UI
            const v = new ActionFormData()
                .title(`${plr.name.replace(/§./g, '')}'s Stats`)

            let text = [];

            let tp_day = scoreTest(plr, 'timeplayedday');
            let tp_hour = scoreTest(plr, 'timeplayedhr');
            let tp_min = scoreTest(plr, 'timeplayedmin');
            let tp_sec = scoreTest(plr, 'timeplayedsec');
            let deaths = scoreTest(plr, 'deaths');
            let kills = scoreTest(plr, 'kills');
            let killstreak = scoreTest(plr, 'killstreak');
            let money = scoreTest(plr, 'money');

            let diamonds = scoreTest(plr, 'diamond_ore');
            let emeralds = scoreTest(plr, 'emerald_ore');
            let gold = scoreTest(plr, 'gold_ore');
            let iron = scoreTest(plr, 'iron_ore');
            let lapis = scoreTest(plr, 'lapis_ore');
            let copper = scoreTest(plr, 'copper_ore');
            let coal = scoreTest(plr, 'coal_ore');
            let netherite = scoreTest(plr, 'ancient_debris');

            text.push(`§d§lTime Played:`);
            text.push(`§bD/§7:§c${tp_day} §bH/§7:§c${tp_hour} §bM/§7:§c${tp_min} §bS/§7:§c${tp_sec}`);
            text.push(` `) // new line
            text.push(`§d§lCombat:`);
            text.push(`§bKills §7:§c${kills} §bDeaths §7:§c${deaths} §bKillstreak §7:§c${killstreak}`);
            text.push(` `) // new line
            text.push(`§d§lBlocks Mined:`);
            text.push(`§bDimaonds §7:§c${diamonds} §bEmeralds §7:§c${emeralds} §bGold §7:§c${gold}`);
            text.push(`§bIron §7:§c${iron} §bLapis §7:§c${lapis} §bNetherite §7:§c${netherite}`);
            text.push(` `) // new line
            text.push(`§bCurrent Ballance §7: §c${money}`)

            v.body(text.join('\n§r'))
            v.button('Back')

            v.show(plr).then(evd => guiScheme.NonStaff(plr))

        },

        /** @type { (plr: Player, target: Player) => void } */
        exec: (plr, target) => { // Player command UI (exec)
            /** @type { [name: string, fn: () => void][] } */
            const actionList = [
                ['Stats', () => guiScheme.pcmd.stats(plr, target)],
                ['Inventory', () => guiScheme.pcmd.inv(plr, target)],
                ['TP to Me', () => plr.runCommandAsync(`tp "${target.name.replace(/\\|"/g, '\\$&')}" @s`)],
                ['TP to Them', () => plr.runCommandAsync(`tp "${plr.name.replace(/\\|"/g, '\\$&')}" "${target.name.replace(/\\|"/g, '\\$&')}"`)],
                ['Punish', () => target.runCommandAsync('function UAC/punish')],
                ['Freeze', () => target.runCommandAsync('function UAC/freeze_player')],
                ['Warn', () => target.runCommandAsync('function UAC/warn')],
                ['E-Chest Wipe', () => target.runCommandAsync('function UAC/echestwipe')],
                ['Reset Warn', () => target.runCommandAsync('function UAC/warnreset')],
                ['Ban', () => target.runCommandAsync('tag @s add Ban')],
                ['Smite', () => target.runCommandAsync('function UAC/smite')],
            ]

            const v = new ActionFormData()
                .title(`Player Command - ${target.name.replace(/§./g, '')}`)

            for (let [name, f] of actionList) v.button(name)

            v.show(plr).then(v => {
                if (v.canceled) return
                actionList[v.selection][1]()
            })
        },

        /** @type { (plr: Player, _a?: number) => void } */
        new: (plr, _a = 0) => { // Player command UI
            const pl = [...world.getPlayers()].filter(v => v !== plr)

            const v = new ModalFormData()
                .title('Player Command')
                .textField(
                    (
                        _a == 1 ? '§cPlayer not found.\n§r'
                            : _a == 2 ? '§cCannot target yourself.\n§r'
                                : ''
                    ) + 'Type in the player name. Leave blank to cancel',
                    'Player name'
                )
                .dropdown('Or select a player:', ['§8None§r', ...pl.map(v => v.name)]);

            v.show(plr).then(v => {
                /** @type {string} */
                const input = v.formValues[0],
                    selection = v.formValues[1]
                if ((!input && !selection) || v.canceled) return guiScheme.main(plr)
                const inputUnformatted = input.replace(/§./g, '')
                const target =
                    (!input ? null : [...world.getPlayers()].find(v => v.name == input || v.name.replace(/§./g, '') == inputUnformatted))
                    || (!selection ? null : pl[selection - 1])
                if (!target) return guiScheme.pcmd.new(plr, 1)
                if (target == plr) return guiScheme.pcmd.new(plr, 2)
                guiScheme.pcmd.exec(plr, target)
            })
        }
    },

    /** @type { (plr: Player) => void } */
    more: (() => { // more UI
        /** @type { [name: string, fn: (plr: Player) => void][] } */
        const actionList = [
            // [ 'Clear Area'     , plr => plr.runCommandAsync('function UAC/cleararea') ],
            ['Clear chat', plr => plr.runCommandAsync('function UAC/clearchat')],
            ['Clear lag', plr => plr.runCommandAsync('function UAC/lagclear')],
            ['Vanish', plr => plr.runCommandAsync('function UAC/vanish')],
            ['Auto Totem', plr => plr.runCommandAsync('function UAC/autototem')],
            ['Godmode', plr => plr.runCommandAsync('function UAC/tgm')],
            ['Fake Leave', plr => plr.runCommandAsync('function UAC/fakeleave')],
            ['Credits', plr => plr.runCommandAsync('function UAC/credit')],
            ['Back', plr => guiScheme.main(plr)],
        ]

        const v = new ActionFormData()
            .title('Unity Anticheat')

        for (let [name, f] of actionList) v.button(name)

        return (plr) => void v.show(plr).then(v => {
            if (v.canceled) return
            actionList[v.selection][1](plr)
        })
    })(),

    /** @type { (plr: Player) => void } */
    toggle_main: (plr) => {
        const v = new ActionFormData()
            .title(`§l§bModules Menu`)

        let text = []
        text.push(`§l§bYeet`)

        const cmdlist = [
            ['Utilities', () => guiScheme.toggle_utility(plr)],
            ['Protections', () => guiScheme.toggle_protections(plr)],
            ['Back', () => guiScheme.main(plr)]
        ]
        for (let [name, f] of cmdlist) v.button(name)

        v.show(plr).then(v => {
            if (v.canceled) return
            cmdlist[v.selection][1]()
        })

    },

    toggle_utility: (plr) => {
        const v = new ModalFormData()
            .title('Utility Modules');
        const values = [];

        for (let module of moduleDefs_util) {
            const vl = Database.get(`${module.name}`);
            values.push(vl);

            const displayName = `${module.mname} ${module.require ? (moduleRequires[module.require] ? '§a' : '§c') : '§8'}[EXP]`;

            if (module.toggle.length == 2) {
                v.toggle(displayName, !!vl);
            } else {
                v.dropdown(displayName, module.toggle, vl);
            }
        }

        v.show(plr).then((result) => {
            if (result.canceled) return guiScheme.main(plr);

            const newValues = result.formValues.map((v) => Number(v));
            for (let i = 0, m = newValues.length, b; (b = newValues[i], i < m); i++) {
                setModule(plr, moduleDefs_util[i], b);
            }; guiScheme.main(plr);
        });
    },

    toggle_protections: (plr) => { // utility module toggle UI
        const v = new ModalFormData()
            .title('Protection Modules')

        /** @type { Number[] } */
        const values = []

        for (let module of moduleDefs_prots) {
            const vl = Database.get(`${module.name}`);

            values.push(vl);
            if (module.toggle.length == 2) {
                v.toggle(`${module.mname} ${module.require ? (moduleRequires[module.require] ? '§a' : '§c') : '§8'}[EXP]`, !!vl)
            } else {
                v.dropdown(`${module.mname} ${module.require ? (moduleRequires[module.require] ? '§a' : '§c') : '§8'}[EXP]`, module.toggle, vl);
            }
        };

        v.show(plr).then((v) => {
            if (v.canceled) return guiScheme.main(plr)
            const newValues = v.formValues.map(v => Number(v))
            for (let i = 0, m = newValues.length, a, b; (a = values[i], b = newValues[i], i < m); i++) {
                if (a != b) setModule(plr, moduleDefs_prots[i], b);
            }; guiScheme.main(plr);
        })
    },

    /** @type { (plr: Player) => void } */
    itemban: (plr) => { // itemban UI
        const v = new ModalFormData()
            .title('Item Bans')

        /** @type { number[] } */
        const values = []

        for (let itemban of itembanDefs) {
            const vl = Database.get(itemban.name)
            values.push(vl)
            v.toggle(itemban.mname, !!vl)
        }

        v.show(plr).then(v => {
            if (v.canceled) return guiScheme.main(plr)

            const newValues = v.formValues.map((v) => Number(v))
            for (let i = 0, m = newValues.length, a, b; (a = values[i], b = newValues[i], i < m); i++) {
                if (a != b) {
                    const itemban = itembanDefs[i];
                    Database.set(itemban.name, b);
                    tellrawStaff(`§¶§cUAC STAFF ► §bPlayer §d${plr.name}§b has ${b ? '§aenabled' : '§cdisabled'}§r §eItemBan/${itemban.mname}§r`)
                }
            }

            guiScheme.main(plr)
        })
    },

    /** @type { (plr: Player) => void } */
    oreban: (plr) => { // orealert UI
        const v = new ModalFormData()
            .title('Ore Alerts')

        /** @type { Number[] } */
        const values = []

        for (let oreban of oreBanDefs) {
            const vl = Database.get(oreban.obj);
            values.push(vl);
            v.toggle(oreban.mname, vl ? true : false);
        }

        v.show(plr).then((v) => {
            if (v.canceled) return guiScheme.main(plr)

            const newValues = v.formValues.map(v => Number(v))
            for (let i = 0, m = newValues.length, a, b; (a = values[i], b = newValues[i], i < m); i++) {
                if (a !== b) {
                    const oreban = oreBanDefs[i];
                    Database.set(oreban.obj, b);
                    tellrawStaff(`§¶§cUAC STAFF ► §bPlayer §d${plr.name}§b has ${b ? '§aenabled' : '§cdisabled'}§r §eOreAlert/${oreban.mname}§r`);
                }
            }; guiScheme.main(plr)
        })
    },

    particles: (() => { // particles
        const v = new ActionFormData()
            .title('Particles')

        for (let particle of particleDefs) v.button(particle.mname)
        v.button('Back')

        /** @type { (plr: Player) => void } */
        return (plr) => {
            v.show(plr).then(v => {
                if (v.canceled || v.selection == particleDefs.length) return guiScheme.main(plr)

                const particle = particleDefs[v.selection]
                plr.runCommandAsync(`function particle/${particle.fn}`)
            })
        }
    })(),

    kits: (() => { // kits UI
        const v = new ActionFormData()
            .title('Kits')

        for (let kit of kitDefs) v.button(kit.mname)
        v.button('Back')

        /** @type { (plr: Player) => void } */
        return (plr) => {
            v.show(plr).then(v => {
                if (v.canceled || v.selection == kitDefs.length) return guiScheme.main(plr)

                const kit = kitDefs[v.selection]
                plr.runCommandAsync(`structure load "${kit.structure}" ~~~`)
                tellrawStaff(`§¶§cUAC STAFF ► §bPlayer §d${plr.name}§b has spawned a kit §e${kit.mname}§r`)
            })
        }
    })(),

    wbchange: (() => { // worldborder change UI
        const v = new ModalFormData()
            .title('World Border')
            .textField('Enter a new world border distance. Leave blank to cancel', 'World border distance (number)')

        /** @type { (plr: Player) => void } */
        return (plr) => void v.show(plr).then((v) => {
            if (v.canceled || !v.formValues[0]) return guiScheme.worldborder(plr)

            let newValue = Number(v.formValues[0])
            if (isNaN(newValue)) return guiScheme.worldborder(plr);

            Database.set('Border_Coord_X', newValue);
            Database.set('Border_Coord_Z', newValue);
            tellrawStaff(`§¶§cUAC STAFF ► §bPlayer §d${plr.name}§b has set the world border size to §a${newValue}§b/§a${newValue}§r`)

            guiScheme.worldborder(plr)
        })
    })(),

    /** @type { (plr: Player) => void } */
    worldborder: (plr) => { // worldborder UI
        const status = Database.get('wbmtoggle'),
            currentX = Database.get('Border_Coord_X'),
            currentZ = Database.get('Border_Coord_Z')
        let v = new ActionFormData()
            .title('World Border')
            .body([
                `Status: ${status ? '§aENABLED' : '§cDISABLED'}§r`,
                `Current distance: §a${currentX}§r / §a${currentZ}§r`
            ].join('\n'))
            .button('Change distance')
            .button('Change toggle')
            .button('Back')

        v.show(plr).then((v) => {
            if (v.canceled) return guiScheme.main(plr);
            const status = Database.get('wbmtoggle')
            switch (v.selection) {
                case 0: return guiScheme.wbchange(plr)
                case 1: {
                    /** @type { typeof moduleDefs_prots[number] } */
                    const module = {
                        mname: 'World Border',
                        obj: ['WBM', 'wbmtoggle'],
                        name: 'wbmtoggle',
                        toggle: ['§cOFF', '§aON'],
                        require: 'has_xx'
                    }
                    setModule(plr, module, status ? 0 : 1);
                    return guiScheme.worldborder(plr)
                }
                case 2: return guiScheme.main(plr)
            }
        })
    },
    /** @type { (plr: Player) => void } */
    spawnCoord: (plr) => { // spawncoord UI
        const currentX = Database.get('Spawn_Coord_X') || 0,
            currentY = Database.get('Spawn_Coord_Y') || 0,
            currentZ = Database.get('Spawn_Coord_Z') || 0;
        let v = new ActionFormData()
            .title('Spawn Coord')
            .body([
                `Current coordinates: §4X: ${currentX}§r / §9Y: ${currentY}§r / §aZ: ${currentZ}§r`
            ].join('\n'))
            .button('Change coordinates')
            .button('Back')
        v.show(plr).then((v) => {
            if (v.canceled) return guiScheme.main(plr);
            switch (v.selection) {
                case 0: return guiScheme.scchange(plr);
                case 1: {
                    return guiScheme.main(plr);
                }
            }
        })
    },
    scchange: (() => { // spawncoord change UI
        const v = new ModalFormData()
            .title('Spawn coordinates')
            .textField('Enter a new spawn coord X. Leave blank to cancel', 'x: Number')
            .textField('Enter a new spawn coord Y. Leave blank to cancel', 'y: Number')
            .textField('Enter a new spawn coord z. Leave blank to cancel', 'z: Number')

        /** @type { (plr: Player) => void } */
        return (plr) => void v.show(plr).then((v) => {
            if (v.canceled || !v.formValues[0]) return guiScheme.spawnCoord(plr)

            let newValueX = Number(v.formValues[0]);
            let newValueY = Number(v.formValues[1]);
            let newValueZ = Number(v.formValues[2]);
            if (isNaN(newValueX)) return guiScheme.spawnCoord(plr);
            if (isNaN(newValueY)) return guiScheme.spawnCoord(plr);
            if (isNaN(newValueZ)) return guiScheme.spawnCoord(plr);

            Database.set('Spawn_Coord_X', newValueX);
            Database.set('Spawn_Coord_Y', newValueY);
            Database.set('Spawn_Coord_Z', newValueZ);
            tellrawStaff(`§¶§cUAC STAFF ► §bPlayer §d${plr.name}§b has set the world spawn coordinates size to X: Current coordinates: §4X: ${currentX}§r / §9Y: ${currentY}§r / §aZ: ${currentZ}§r`);

            guiScheme.spawnCoord(plr)
        })
    })()
};

const registerInformation = {
    cancelMessage: true,
    name: 'gui',
    staff: 'false',
    description: 'Open Interactable GUI for ease of use',
    usage: '[ gui ]',
    example: [
        'gui'
    ]
};

/** @type { Map<Player, [x:number,y:number,z:number]> } */
const waitMove = new Map();

Server.command.register(registerInformation, (chatmsg) => {
    const { sender } = chatmsg, { location: { x, y, z } } = sender;
    if (Database.get('icmtoggle') !== 1 && !sender.hasTag('staffstatus')) return sender.tellraw(`§¶§cUAC ► §c§lThe Realm Owner currently has Player Commands Disabled`);

    sender.tellraw(`§aMove to show the UI.`)
    waitMove.set(chatmsg.sender, [x, y, z])
});

system.runInterval(() => {
    for (let [plr, [x, y, z]] of waitMove) {
        try {
            let { x: xc, y: yc, z: zc } = plr.location
            if (x != xc || y != yc || z != zc) {
                if (scoreTest(plr, 'seen_gui') == 0) {
                    guiScheme.player_welcome(plr)
                    waitMove.delete(plr)
                    return;
                }
                if (plr.hasTag('staffstatus')) {
                    guiScheme.main(plr)
                    waitMove.delete(plr)
                } else {
                    guiScheme.NonStaff(plr)
                    waitMove.delete(plr)
                }
            }
        } catch (e) {
            console.warn(e instanceof Error ? `${e}\n${e.stack}` : e)
            waitMove.delete(plr)
        }
    }
});

export { waitMove };
