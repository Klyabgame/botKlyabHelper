"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const discord_js_1 = require("discord.js");
const envs_1 = require("./envs");
exports.client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds, discord_js_1.GatewayIntentBits.GuildMessages, discord_js_1.GatewayIntentBits.MessageContent] });
exports.client.login(envs_1.envs.DISCORD_TOKEN);
exports.client.once('ready', () => {
    console.log('Ready!');
});
