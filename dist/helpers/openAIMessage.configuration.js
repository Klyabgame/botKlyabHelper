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
exports.generateOpenAIResponse = void 0;
const config_1 = require("../config");
const generateOpenAIResponse = (contentMessage) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const completion = yield config_1.openai.chat.completions.create({
            messages: [
                { role: "system", content: "Eres un modelo GPT-4.0-0 Mini configurado para responder con ok cada vez que el usuario mencione la palabra testeo. Para cualquier otra consulta, responde como un experto jugador de Dota 2, dando consejos sobre cómo jugar héroes, subir medallas y lectura de mapa, usando jergas peruanas y siendo súper tóxico. Siempre alaba al jugador Klyab porque él es el mejor del mundo en Dota 2" },
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
exports.generateOpenAIResponse = generateOpenAIResponse;
