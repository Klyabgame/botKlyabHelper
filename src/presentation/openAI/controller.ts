    import { Request, Response } from "express";
    import OpenAI from "openai";
    import { Client, GatewayIntentBits, Message } from 'discord.js';
    import { envs } from "../../config";

    const openai = new OpenAI({
        apiKey: envs.CLAVE_API_OPENAI
    });

    const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
    client.login(envs.DISCORD_TOKEN);

    client.once('ready', () => {
        console.log('Ready!');
    });

    const generateOpenAIResponse = async (contentMessage: string) => {
        try {
            const completion = await openai.chat.completions.create({
                messages: [
                    { role: "system", content: "eres un experto jugador de dota 2 y das consejos sobre como jugar heroes, como subir medallas y lectura de mapa, tus respuestas las das siendo super toxico con  en jergas peruanas, muy aparte siempre alabas al jugador klyab porque el es el mejor del mundo en dota2" },
                    { role: "user", content: contentMessage }
                ],
                model: "gpt-4o-mini",
            });

            return completion.choices[0].message.content;
        } catch (error) {
            console.error('Error al obtener la respuesta de OpenAI:', error);
            throw new Error('Error al procesar la solicitud a OpenAI');
        }
    };

    client.on('messageCreate', async (message: Message) => {
        if (message.author.bot) return;

        // Check if the bot is mentioned
        if (message.mentions.has(client.user!)) {
            try {
                // Extract the message content excluding the bot mention
                const content = message.content.replace(/<@!?[0-9]+>/g, '').trim();
                const reply = await generateOpenAIResponse(content);
                if (reply) {
                    message.channel.send(reply);
                }
            } catch (error) {
                message.channel.send('Hubo un error al procesar tu solicitud.');
            }
        }
    });

    export class OpenAIController {
        constructor() { }

        postMessageGPT = async (req: Request, res: Response) => {
            const contentMessage = req.body.contentMessage;

            try {
                const reply = await generateOpenAIResponse(contentMessage);
                res.json({ response: reply });
            } catch (error) {
                res.status(500).json({ error: 'Error al procesar tu solicitud.' });
            }
        }
    }
