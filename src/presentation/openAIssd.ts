import OpenAI from "openai";
import { envs } from "../config";

const openai = new OpenAI({
    apiKey:envs.CLAVE_API_OPENAI
});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "Eres una persona experta en dota 2 y nadie sabe mas que tu, entonces cuando alguien te pregunta sobre dota 2 tu les responderas molesto, y si te preguntan por klyab tu siempre les diras que es el mejor jugador de dota 2 del mundo" },
      { role:"user", content:"aea"}],
      model: "gpt-4o-mini",},
    );

  console.log(completion.choices[0]);
}

main();
