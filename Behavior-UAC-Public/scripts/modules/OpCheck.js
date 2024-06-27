import { tellrawServer } from 'library/utils/prototype.js';
import { TellRB } from '../library/utils/prototype.js';
import { Database } from '../library/Minecraft';

function opCheck(player) {
    const name = player.getName();
    if (!player.isOp() && player.hasTag(`staffstatus`) && Database.get('opctoggle') === 1) {
        player.removeTag(`staffstatus`);
        tellrawServer(`§l§¶§cUAC §6SYSTEM ► §bstaffstatus removed from §d${name} §bbecause they are not operator`);
        TellRB('flag_1', `UAC SYSTEM ► staffstatus removed from ${name} because they are not operator.`);
    }
};

export { opCheck };