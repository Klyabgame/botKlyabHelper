import { Request, Response } from "express";
import { generateOpenAIResponse } from "../../helpers";


export class OpenAIController {
        constructor() { }

        postMessageGPT = async (req: Request, res: Response) => {
            const contentMessage = req.body.contentMessage;

            try {
                const reply = await generateOpenAIResponse(contentMessage);
                if (reply) {
                    res.status(200).json({ message: reply });
                } else {
                    res.status(500).json({ message: 'No se pudo procesar la solicitud.' });
                }
            } catch (error) {
                res.status(500).json({ error: 'Error al procesar tu solicitud.' });
            }
        }
    }
