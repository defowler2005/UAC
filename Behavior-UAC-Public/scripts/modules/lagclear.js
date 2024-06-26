import { scoreTest, setScore } from '../library/utils/score_testing.js';
import { overworld } from '../library/utils/cmd_queue.js';
import { tellrawServer } from '../library/utils/prototype.js';

function lagclear() {
    try {
        let entitycount = scoreTest('entitycount');
        let entitycountdown = scoreTest('entityclear');

        if (entitycount >= 145) {
            if (entitycountdown <= 0) {
                setScore('entityclear', 400, false);
            }
        }

        if (entitycountdown >= 1) {
            overworld.runCommandAsync(`scoreboard players remove entitydummy entityclear 10`);
            if (entitycountdown == 350) { tellrawServer(`§¶§cUAC §¶§b► Clearing Entities in §c5`); }
            if (entitycountdown == 300) { tellrawServer(`§¶§cUAC §¶§b► Clearing Entities in §c4`); }
            if (entitycountdown == 250) { tellrawServer(`§¶§cUAC §¶§b► Clearing Entities in §c3`); }
            if (entitycountdown == 200) { tellrawServer(`§¶§cUAC §¶§b► Clearing Entities in §c2`); }
            if (entitycountdown == 150) { tellrawServer(`§¶§cUAC §¶§b► Clearing Entities in §c1`); }
            if (entitycountdown == 100) { overworld.runCommandAsync(`function UAC/packages/autolagclearasset`); }
        }
    } catch (error) { console.warn(error); }
}

export { lagclear };