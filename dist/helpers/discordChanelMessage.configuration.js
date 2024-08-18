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
Object.defineProperty(exports, "__esModule", { value: true });
exports.discordChanelMessage = void 0;
const openAIMessage_configuration_1 = require("./openAIMessage.configuration");
const discordChanelMessage = (client) => {
    client.on('messageCreate', (message) => __awaiter(void 0, void 0, void 0, function* () {
        if (message.author.bot)
            return;
        // Check if the bot is mentioned
        if (message.mentions.has(client.user)) {
            try {
                // Extract the message content excluding the bot mention
                const content = message.content.replace(/<@!?[0-9]+>/g, '').trim();
                const reply = yield (0, openAIMessage_configuration_1.generateOpenAIResponse)(content);
                if (reply) {
                    message.channel.send(reply);
                }
            }
            catch (error) {
                message.channel.send('Hubo un error al procesar tu solicitud.');
            }
        }
    }));
};
exports.discordChanelMessage = discordChanelMessage;
