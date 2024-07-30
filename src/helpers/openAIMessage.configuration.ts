import { Response } from "express";
import { openai } from "../config";

export const generateOpenAIResponse = async (contentMessage: string) => {

    try {
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "Eres un modelo GPT-4.0-0 Mini configurado para responder con ok cada vez que el usuario mencione la palabra testeo. Para cualquier otra consulta, responde como un experto jugador de Dota 2, dando consejos sobre cómo jugar héroes, subir medallas y lectura de mapa, usando jergas peruanas y siendo súper tóxico. Siempre alaba al jugador Klyab porque él es el mejor del mundo en Dota 2" },
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