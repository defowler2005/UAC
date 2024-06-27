import { overworld } from '../library/utils/cmd_queue.js';
import { tellrawServer } from '../library/utils/prototype.js';
import { Database } from '../library/Minecraft.js';

function lagclear() {
    try {
        let entitycount = Database.get('entitycount');
        let entitycountdown = Database.get('entityclear');

        if (entitycount >= 145) {
            if (entitycountdown <= 0) {
                Database.set('entityclear', 5);
            }
        }

        if (entitycountdown >= 1) {
            if (entitycountdown == 5) { tellrawServer(`§¶§cUAC §¶§b► Clearing Entities in §c5`); }
            if (entitycountdown == 4) { tellrawServer(`§¶§cUAC §¶§b► Clearing Entities in §c4`); }
            if (entitycountdown == 3) { tellrawServer(`§¶§cUAC §¶§b► Clearing Entities in §c3`); }
            if (entitycountdown == 2) { tellrawServer(`§¶§cUAC §¶§b► Clearing Entities in §c2`); }
            if (entitycountdown == 1) { tellrawServer(`§¶§cUAC §¶§b► Clearing Entities in §c1`); }
            if (entitycountdown == 0) { overworld.runCommandAsync(`function UAC/packages/autolagclearasset`); }
        }
    } catch (error) { console.warn(`An error occurrd while clearing lag: ${error}\n${error.stack}`); }
};

export { lagclear };