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

    app.get('/', (req, res) => {
      res.send('Bot de Discord está activo.');
  });

    app.post('/api/openAI',controller.postMessageGPT)

    

    app.listen(envs.PORT || 3000 ,()=>{
      console.log(`APP running on port ${envs.PORT}`);
    })

    setInterval(() => {
    const url = envs.WEB_DEPLOY;  // Reemplaza con la URL de tu aplicación en Render
    https.get(url, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`);
        });
        res.on('end', () => {
            console.log('No more data in response.');
        });
    }).on('error', (e) => {
        console.error(`Error with request: ${e.message}`);
    });
    }, 780000); // Cada 13 minutos
}