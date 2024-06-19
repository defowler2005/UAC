import { Database, Server } from '../../../library/Minecraft.js';

const registerInformation = {
    cancelMessage: true,
    name: 'worldspawn',
    staff: 'true',
    description: 'Configure the World Spawn in UAC',
    usage: '[ set | remove ]',
    example: [
        'worldspawn remove',
        'worldspawn set 0 90 0'
    ]
};

Server.command.register(registerInformation, (chatmsg, args) => {
    const { sender } = chatmsg;
    let worldset = ['set'];
    let worldremove = ['remove'];

    if (sender.hasTag('staffstatus')) {
        if (worldset.includes(args[0])) { //Set.
            const x = Math.floor(sender.location.x);
            const y = sender.location.x;
            const z = Math.floor(sender.location.z);
            Database.set('Spawn_Coord_X');
            Database.set('Spawn_Coord_Y');
            Database.set('Spawn_Coord_Z');
            sender.tellraw(`§¶§cUAC ► §b§lWorld Spawn configured to §e${x} ${y} ${z}§b! Players will be sent here after passing World Border`);
        }
        else if (worldremove.includes(args[0])) { //Set to default.
            sender.tellraw(`§¶§cUAC ► §b§lCustom World Spawn has been set back to default`);
        }
        else {
            sender.tellraw(`§¶§cUAC ► §cERROR 2! §6Usage Example §7:§b§l UAC.worldspawn [ set | remove ]\n§¶§cINFO ► §bThis tells UAC where worldspawn is. Where you're standing will also be where default spawn is now. People will teleport here when crossing world border, or when using the "Spawntp" chat command.`);
        }
    } else {
        sender.tellraw(`§¶§cUAC ► §c§lError 4: Only Staff can configure world spawn`);
    }
});