import { GameMode } from '@minecraft/server';
import { Server } from '../../../library/Minecraft.js';

const registerInformation = {
    cancelMessage: true,
    name: 'vanish',
    staff: true,
    description: 'Enter/Leave Vanish Mode. Execute again to toggle.',
    usage: '',
    example: [
        'vanish',
        'vanish survival'
    ]
};

Server.command.register(registerInformation, (chatmsg, args) => {
    try {
        const { sender } = chatmsg;

        if (args.length === 0) {
            sender.tellraw(`§¶§c§lUAC ► §bYou've kept your current gamemode of §6${sender.getGameMode()}`);
        } else {
            const mode = args[0].toLowerCase();
            switch (mode) {
                case 'survival':
                case 'creative':
                case 'spectator':
                case 'adventure':
                    sender.setGameMode(GameMode[mode]);
                    sender.tellraw(`§¶§c§lUAC ► §bgamemode switched to §6${mode}`);
                    break;
                default:
                    sender.tellraw(`§¶§cUAC ► §cERROR! §6Usage Example §7:§b§l UAC.vanish [ survival | creative | spectator | adventure ]`);
            }
        };
    } catch (error) {
        console.warn(error, error.stack);
    }
});