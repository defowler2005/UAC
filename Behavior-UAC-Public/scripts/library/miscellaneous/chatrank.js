import { Server } from "../build/classes/serverBuilder.js";

export function displayRank(chatmsg) {
    const data = Server.runCommandAsync(`tag "${chatmsg.sender.nameTag}" list`);
    const allRanks = data.statusMessage.match(/(?<=\$\(chatrank:).*?(?=\))/g);
    chatmsg.cancel = true;
    if (!allRanks)
        return Server.broadcast(`[§bMember§r] §7${chatmsg.sender.nameTag}: §f${chatmsg.message}`);
    Server.broadcast(`[${allRanks.join(', ').trim()}] §7${chatmsg.sender.nameTag}: §f${chatmsg.message}`);
};