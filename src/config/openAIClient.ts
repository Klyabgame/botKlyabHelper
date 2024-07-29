import OpenAI from "openai";
import { envs } from "./envs";

export const openai = new OpenAI({
    apiKey: envs.CLAVE_API_OPENAI
});