import express from 'express';
import { envs } from './config';
import { OpenAIController} from './presentation/openAI/controller';
import cors from 'cors';

(()=>{

  main();
  
})();

function main(){

    const app=express();
    app.use( express.json() ); // raw
    app.use( express.urlencoded({ extended: true }) ); // x-www-form-urlencoded
    app.use(cors());

    const controller=new OpenAIController();

    app.get('/', (req, res) => {
      res.send('Bot de Discord está activo.');
  });

    app.post('/api/openAI',controller.postMessageGPT)


    app.listen(envs.PORT,()=>{
      console.log(`APP running on port ${envs.PORT}`);
    })

}