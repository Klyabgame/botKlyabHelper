"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAIController = void 0;
const openai_1 = __importDefault(require("openai"));
const discord_js_1 = require("discord.js");
const config_1 = require("../../config");
const openai = new openai_1.default({
    apiKey: config_1.envs.CLAVE_API_OPENAI
});
const client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds, discord_js_1.GatewayIntentBits.GuildMessages, discord_js_1.GatewayIntentBits.MessageContent] });
client.login(config_1.envs.DISCORD_TOKEN);
client.once('ready', () => {
    console.log('Ready!');
});
const generateOpenAIResponse = (contentMessage) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const completion = yield openai.chat.completions.create({
            messages: [
                { role: "system", content: "eres un experto jugador de dota 2 y das consejos sobre como jugar heroes, como subir medallas y lectura de mapa, tus respuestas las das siendo super toxico con  en jergas peruanas, muy aparte siempre alabas al jugador klyab porque el es el mejor del mundo en dota2" },
                { role: "user", content: contentMessage }
            ],
            model: "gpt-4o-mini",
        });
        return completion.choices[0].message.content;
    }
    catch (error) {
        console.error('Error al obtener la respuesta de OpenAI:', error);
        throw new Error('Error al procesar la solicitud a OpenAI');
    }
});
client.on('messageCreate', (message) => __awaiter(void 0, void 0, void 0, function* () {
    if (message.author.bot)
        return;
    // Check if the bot is mentioned
    if (message.mentions.has(client.user)) {
        try {
            // Extract the message content excluding the bot mention
            const content = message.content.replace(/<@!?[0-9]+>/g, '').trim();
            const reply = yield generateOpenAIResponse(content);
            if (reply) {
                message.channel.send(reply);
            }
        }
        catch (error) {
            message.channel.send('Hubo un error al procesar tu solicitud.');
        }
    }
}));
class OpenAIController {
    constructor() {
        this.postMessageGPT = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const contentMessage = req.body.contentMessage;
            try {
                const reply = yield generateOpenAIResponse(contentMessage);
                res.json({ response: reply });
            }
            catch (error) {
                res.status(500).json({ error: 'Error al procesar tu solicitud.' });
            }
        });
    }
}
exports.OpenAIController = OpenAIController;
