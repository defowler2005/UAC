import { HttpRequest, HttpHeader, HttpRequestMethod, http } from '@minecraft/server-net';
import { configuration } from '../build/configurations.js';
import { system } from '@minecraft/server';

export function TellRB(color, message) {
    try {
        system.run(async () => {
            if (!color) {
                color = '1317f2'; // Default blue
            } else {
                switch (color.toLowerCase()) {
                    case 'ban': color = 'fb0000'; break; // red
                    case 'flag_0': color = '02ebfe'; break; // cyan
                    case 'flag_1': color = 'e7fe02'; break; // yellow
                    default: color = '1317f2'; // Default blue
                }
            };

            const req = new HttpRequest(`http://localhost:1337/TellRB`);
            req.headers = [new HttpHeader('Content-Type', 'application/json')];
            req.method = HttpRequestMethod.Post;
            req.body = JSON.stringify(
                {
                    embeds: [
                        {
                            title: 'UAC Notification Logs',
                            description: message.replace(/"/g, '\\"'),
                            color: parseInt(color, 16),
                            author: {
                                url: 'https://discord.js.org'
                            },
                            footer: {
                                text: 'Unity Anti-Cheat',
                                url: configuration.discord_server
                            },
                            timestamp: new Date()
                        }
                    ]
                }
            );

            const response = await http.request(req);
            console.info(`HTTP Response: ${response.body}`);
        });
    } catch (error) {
        console.error(`HTTP Request Error: ${error}`);
    }
};