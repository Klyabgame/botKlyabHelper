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
exports.generateOpenAIResponse = generateOpenAIResponse;
