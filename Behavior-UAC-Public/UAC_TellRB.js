const express = require(`express`);
const { Client, GatewayIntentBits } = require(`discord.js`);

const client = new Client(
    {
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.MessageContent
        ]
    }
);

client.login('');
client.once(`ready`, () => console.log(`Bot is ready to process UAC\`s notifications!`));

const app = express();

app.use(express.json());

app.post(`/TellRB`, async (req, res) => {
    try {
        const channel = await client.channels.fetch('');
        channel.send(req.body);
        res.status(200).send(` Successfully received UAC\`s notification.`);
    } catch (error) {
        console.error(`Error sending message:`, error);
        res.status(500).send(`Failed to process UAC\`s notification.`);
    }
});

app.listen(1337, () => console.log(`Server is ready to process UAC\`s notifications!`));