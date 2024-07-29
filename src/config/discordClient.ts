import { Client, GatewayIntentBits } from "discord.js";
import {envs} from './envs';

export const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });


client.login(envs.DISCORD_TOKEN);


client.once('ready', () => {
    console.log('Ready!');
});