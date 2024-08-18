import { Client, Events, GatewayIntentBits } from "discord.js";
import {envs} from './envs';
import { discordChanelMessage } from "../helpers/discordChanelMessage.configuration";

export const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });


client.once(Events.ClientReady, (readyClient) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

discordChanelMessage(client);

/* client.on('messageCreate', (message) => {
    console.log('Nuevo mensaje recibido:', message.content);
}); */

client.login(envs.DISCORD_TOKEN);