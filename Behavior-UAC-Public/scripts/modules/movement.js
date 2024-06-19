import { scoreTest, setScore } from '../library/utils/score_testing.js';

function movement_check(player) {
    try {
        let lastpos_x = scoreTest(player, 'lastpos_x');
        let lastpos_z = scoreTest(player, 'lastpos_z');
        if(player.hasTag(`rb1337`)) { setScore(player, "notmovingflag", 0, false); }
        if(scoreTest(player, 'X_Coordinate') > lastpos_x || scoreTest(player, 'X_Coordinate') < lastpos_x) {
            setScore(player, "notmovingflag", 0, false);
        }
        if(scoreTest(player, 'Z_Coordinate') > lastpos_z || scoreTest(player, 'Z_Coordinate') < lastpos_z) {
            setScore(player, "notmovingflag", 0, false);
            //player.tellraw(`is moving`);
        }
        if(scoreTest(player, 'X_Coordinate') == lastpos_x || scoreTest(player, 'Z_Coordinate') == lastpos_z) {
            setScore(player, "notmovingflag", 1, true);
        }
    }catch (e) {
        console.warn( JSON.stringify(e.stack), e)
    }
}

export { movement_check };