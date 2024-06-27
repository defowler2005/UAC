import { world } from '@minecraft/server';
const overworld = world.getDimension('overworld');
export class ServerBuilder {
    /**
     * Force shuts down the server
     * @example ServerBuilder.close()
     */
    close() {
        function crash() {
            while (true) {
                crash();
            }
            ;
        }
        ;
        crash();
    }
    ;
    /**
     * Broadcast a message in chat
     * @param {string} text Message you want to broadcast in chat
     * @param {string} [player] Player you want to broadcast to
     * @returns {runCommandReturn}
     * @example ServerBuilder.broadcast('Hello World!');
     */
    broadcast(text) {
        return world.sendMessage(`${text}`);
    }
    ;
    broadcastStaff(text, player) {
        return this.runCommandAsync(`tellraw ${player ? `"${player}"` : '@a[tag=staffstatus]'} {"rawtext":[{"text":${JSON.stringify(text)}}]}`);
    }
    ;
    /**
     * Run a command in game
     * @param command The command you want to run
     * @returns {runCommandReturn}
     * @example ServerBuilder.runCommandAsync('say Hello World!');
     */
    runCommandAsync(command, dimension = overworld) {
        try {
            return { error: false, ...dimension.run(command) };
        }
        catch (error) {
            return { error: true };
        };
    };

    /**
     * Run an array of commands
     * @param {Array<string>} commands Put '%' before your commands. It will make it so it only executes if all the commands thta came before it executed successfully!
     * @returns {{ error: boolean }}
     * @example runCommands([
     * 'clear "notbeer" diamond 0 0',
     * '%say notbeer has a Diamond!'
     * ]);
     */
    runCommands(commands) {
        const conditionalRegex = /^%/;
        if (conditionalRegex.test(commands[0]))
            throw '[Server]: runCommands(): Error - First command in the Array CANNOT be Conditional';
        let error = false;
        commands.forEach(cmd => {
            if (error && conditionalRegex.test(cmd))
                return;
            error = this.runCommandAsync(cmd.replace(conditionalRegex, '')).error;
        });
        return { error: error };
    }
    ;
    getAllPlayers() { return world.getPlayers(); };
    tellraw(info) {
        try {
            if (!Player.find({
                name: info.name
            })) return;
            this.runCommandAsync({
                command: `tellraw "${info.name}" ${JSON.stringify({
                    rawtext: [{
                        text: info.message
                    }]
                })}`
            });
        } catch (e) {
            Commands.run(`say ${e} \n\n ${e.stack}`, world.getDimension('overWorld'));
        }
    };
};

export const Server = new ServerBuilder();