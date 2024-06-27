import { Player, system, world } from "@minecraft/server";

/**
 * Set and add score function.
 * @param {Player} target 
 * @param {String} objective 
 * @param {Number} amount 
 * @param {Boolean} add 
 */
function setScore(target, objective, amount, add = false) {
    try {
        const obj = world.scoreboard.getObjective(objective);
        const reTry = () => {
            if (add === true) {
                obj?.addScore(target?.scoreboardIdentity, parseInt(amount));
            } else {
                obj?.setScore(target?.scoreboardIdentity, parseInt(amount));
            }
        }; reTry();
        if (!obj) {
            world.scoreboard.addObjective(objective, objective?.replace('_', ' ').charAt(0).toUpperCase());
            reTry();
        }
    } catch (error) {
        console.warn(`${error}\n${error.stack}`);
    }
};

/**
 * @param {Player} target 
 * @param {String} objective 
 */
function scoreTest(target, objective) {
    try {
        const obj = world.scoreboard.getObjective(objective);
        const score = obj?.getScore(target.scoreboardIdentity);
        return score;
    } catch (error) {
        //console.warn( JSON.stringify(e.stack), e)
        return 0;
    }
};

export { scoreTest, setScore };