import express from 'express';
import { envs } from './config';
import { OpenAIController} from './presentation/openAI/controller';
import cors from 'cors';
import https from 'https';

(()=>{

  main();
  
})();

function main(){

    const app=express();
    app.use( express.json() ); // raw
    app.use( express.urlencoded({ extended: true }) ); // x-www-form-urlencoded
    app.use(cors());

    const controller=new OpenAIController();

    app.post('/api/openAI',controller.postMessageGPT)

    

    app.listen(envs.PORT || 3000 ,()=>{
      console.log(`APP running on port ${envs.PORT}`);
    })

    setInterval(() => {
      https.get(`${envs.WEB_DEPLOY}:${envs.PORT}`);
  },  780000); // Cada 5 minutos
}