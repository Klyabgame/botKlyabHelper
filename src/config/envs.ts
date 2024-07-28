import 'dotenv/config';
import { get } from 'env-var';


export const envs = {

  PORT: get('PORT').required().asPortNumber(),
  CLAVE_API_OPENAI: get('CLAVE_API_OPENAI').default('public').asString(),
  DISCORD_TOKEN: get('DISCORD_TOKEN').default('public').asString(),
  WEB_DEPLOY:get('WEB_DEPLOY').default('public').asString()

}