import { Player, system, world } from "@minecraft/server";

/*
function scoreTest(target, objective) {
    try {
        return world.scoreboard.getObjective(objective).getScore(typeof target === 'string' ? oB.getParticipants().find(pT => pT.displayName == target) : target.scoreboardIdentity)
    } catch {
        return NaN
    }
}
*/

/**
 * Set and add score function.
 * @param {Player} target 
 * @param {String} objective 
 * @param {Number} amount 
 * @param {Boolean} add 
 */
function setScore(target, objective, amount, add = false) {
    const obj = world.scoreboard.getObjective(objective);
    if (add === true) {
        obj?.addScore(target.scoreboardIdentity, amount);
    } else {
        obj?.setScore(target.scoreboardIdentity, amount);
    }
};

//Automatically add objectives and set default 0 score for all players if non existent.
system.runInterval(() => {
    const allObjectives = ['X_Coord_D', 'Y_Coord_D', 'Z_Coord_D', 'diamond_ore', 'emerald_ore', 'coal_ore', 'gold_ore', 'iron_ore', 'lapis_ore', 'ancient_debris', 'copper_ore', 'tp_cooldown', 'tpa', 'tp_cooldown', 'hometp', 'combat_timer'];
    try {
        allObjectives.forEach((obj) => {
            world.scoreboard.addObjective(obj, obj.replace('_', ' ').charAt(0).toUpperCase());
        })
        world.getAllPlayers().forEach((player) => {
            allObjectives.forEach((obj) => {
                const objective = world.scoreboard.getObjective(obj);
                if (typeof objective?.getScore(player.scoreboardIdentity) !== 'number') {
                    objective?.addScore(player.scoreboardIdentity, 0);
                }
            })
        });
    } catch (error) {
        if (`${error}`.includes('tracked') === false) console.warn(`${error}\n${error.stack}`);
    }
}, 20);

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