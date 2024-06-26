import { getGamemode } from '../../../library/utils/prototype.js';
import { Database, Server } from '../../../library/Minecraft.js';
import { scoreTest } from '../../../library/utils/score_testing.js';
import { moduleDefs_prots, moduleDefs_util } from './gui.js';

const registerInformation = {
    cancelMessage: true,
    name: 'modules',
    staff: 'true',
    description: 'Display all Enabled Modules',
    usage: '',
    example: [
        'modules showon',
        'modules showoff',
        'modules test'
    ]
};

Server.command.register(registerInformation, (chatmsg, args) => {
    try {
        const { sender } = chatmsg;
        // const name = sender.getName();

        const modules = [
            ...moduleDefs_prots,
            ...moduleDefs_util
        ];

        if (sender.hasTag('staffstatus')) {

            switch (args[0]) {
                case undefined:
                    return sender.tellraw(`§¶§c§lUAC ► §bUAC.modules { showon / showoff }`);

                case 'test': {
                    const message = Object.entries(modules)
                        .map(([, { obj, mname, name, toggle }]) => `§6${mname} §bObj §7: §c${obj.join(', ')} §dToggle §7: ${toggle[Database.get(name)]}`)
                        .join('\n');

                    sender.tellraw(`§¶§c§lUAC MODULES ► \n§b${message}`);
                } break;

                case 'showon': {
                    let count = 0;
                    sender.tellraw('§¶§c§lUAC MODULES ►');
                    for (let module of Object.values(modules)) {
                        if (Database.get(module.name) >= 1) {
                            sender.tellraw(`§¶§6${module.mname} §7► §2Enabled §7: §bMode §7: §c${module.toggle[Database.get(module.name)]}`);
                            count++;
                        }
                    }
                    if (count === 0) {
                        sender.tellraw('§6None §2Enabled');
                    }
                } break;

                case 'showoff': {
                    let count = 0;
                    sender.tellraw('§¶§c§lUAC MODULES ►');
                    for (let module of Object.values(modules)) {
                        if (Database.get(module.name) === 0) {
                            sender.tellraw(`§¶§6${module.mname} §7► §cDisabled §7: §bMode §7: §c${module.toggle[Database.get(module.name)]}`);
                            count++;
                        }
                    }
                    if (count === 0) {
                        sender.tellraw('§6None §cDisabled');
                    }
                } break;
            }
        } else {
            return sender.tellraw(`§¶§c§lUAC ► §c§lThis command is meant for staff only`);
        }
    } catch (error) {
        console.warn(error, error.stack);
    }
});