"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const discord_js_1 = require("discord.js");
const envs_1 = require("./envs");
const discordChanelMessage_configuration_1 = require("../helpers/discordChanelMessage.configuration");
exports.client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds, discord_js_1.GatewayIntentBits.GuildMessages, discord_js_1.GatewayIntentBits.MessageContent] });
exports.client.once(discord_js_1.Events.ClientReady, (readyClient) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});
(0, discordChanelMessage_configuration_1.discordChanelMessage)(exports.client);
/* client.on('messageCreate', (message) => {
    console.log('Nuevo mensaje recibido:', message.content);
}); */
exports.client.login(envs_1.envs.DISCORD_TOKEN);
