import { ChatSendBeforeEvent } from "@minecraft/server";
import { Server } from "../build/classes/serverBuilder.js";
import { configuration } from "../build/configurations.js";
import { Database } from "../Minecraft.js";

/**
 * @param {ChatSendBeforeEvent} chatmsg
 */
export function displayRank(chatmsg) {
    if (Database.get('crdtoggle') !== 1) return;
    const allRanks = chatmsg.sender.getTags().filter((tag) => tag.startsWith('rank:'));
    if (chatmsg.message.startsWith(configuration.prefix)) return;
    chatmsg.cancel = true;
    if (allRanks.length < 1) return Server.broadcast(`[§bMember§r] §7${chatmsg.sender.nameTag}: §f${chatmsg.message}`);
    Server.broadcast(`[${allRanks.join('§r, ').trim().replace('rank:', '')}] §7${chatmsg.sender.nameTag}: §f${chatmsg.message}`);
};