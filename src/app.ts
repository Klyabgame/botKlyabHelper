import express from 'express';
import { envs } from './config';
import { OpenAIController} from './presentation/openAI/controller';
import cors from 'cors';
import http from 'http';

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
      http.get(`${envs.WEB_DEPLOY}:${envs.PORT}`);
  }, 300000); // Cada 5 minutos
}