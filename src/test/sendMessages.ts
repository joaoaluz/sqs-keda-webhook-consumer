import { fromEnv } from '@aws-sdk/credential-providers';
import { SQSClient, SendMessageBatchCommand } from '@aws-sdk/client-sqs'; 

const message = 'ola mubdo';
const total = 100; // Coloque total de mensagens;

/**
 * Para rodar defina as variaveis de ambiente 
 * export AWS_SECRET_ACCESS_KEY=XXXXXXXXXXXX
 * export AWS_ACCESS_KEY_ID=XXXXXXXXXXXX
 * export QueueUrl=XXXXXXXXXXXX
 * @command npm run mock
 */
(async () => {
  try {
    const {
      QueueUrl,
    } = process.env;
    
    console.log('Start script');

    const sqsClient = new SQSClient({
      credentials: fromEnv(),
      region: 'us-east-1'
    });
    
    let entriesToSend: any[] = [];
  
    for (let index = 0; index < total; index++) {
      entriesToSend.push({
        MessageBody: `Message ${index}: ${message}`,
        Id: `${(new Date().getTime()).toString()}-${index}`,
        MessageGroupId: `${(new Date().getTime()).toString()}-${index}`,
        MessageDeduplicationId: `${(new Date().getTime()).toString()}-${index}`,
      })
    }

    while (entriesToSend.length > 0) {
      const Entries = entriesToSend.splice(0,9);

      const sendCommand = new SendMessageBatchCommand({
        QueueUrl,
        Entries,
      });  

      await sqsClient.send(sendCommand);
    }
    
    console.log('Success in send messages');
  } catch (error) {
    console.log(error) 
  }  
})();
