import { generateOpenAIResponse } from "./openAIMessage.configuration";


export const discordChanelMessage=(client:any)=>{
    
    client.on('messageCreate', async (message:any) => {
        
        if (message.author.bot) return;
    
        // Check if the bot is mentioned
        if (message.mentions.has(client.user!)) {
            try {
                // Extract the message content excluding the bot mention
                const content = message.content.replace(/<@!?[0-9]+>/g, '').trim();
                const reply = await generateOpenAIResponse(content);
                if (reply) {
                    message.channel.send(reply);
                }
            } catch (error) {
                message.channel.send('Hubo un error al procesar tu solicitud.');
            }
        }
    });
}