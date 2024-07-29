import { Response } from "express";
import { openai } from "../config";

export const generateOpenAIResponse = async (contentMessage: string) => {

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