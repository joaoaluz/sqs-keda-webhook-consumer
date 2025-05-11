import { fromEnv } from '@aws-sdk/credential-providers';
import { SQSClient, DeleteMessageCommand, ReceiveMessageCommand } from '@aws-sdk/client-sqs'; 
import axios from 'axios';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
  while (true) {
    try {
      await sleep(5000);

      const {
        QueueUrl,
        webhookUrl = '',
      } = process.env;
      
      console.log('Start script', {
        QueueUrl,
        webhookUrl,
      });
  
      const sqsClient = new SQSClient({
        credentials: fromEnv(),
        region: 'us-east-1'
      });
        
      const receiveCommand = new ReceiveMessageCommand({
        QueueUrl,
        MaxNumberOfMessages: 1,
      });
  
      const {
        Messages,
      } = await sqsClient.send(receiveCommand);
  
      console.log(Messages);  
      if (Messages && Messages?.length > 0) {
        const {
          Body,
          ReceiptHandle,
        } = Messages[0];
  
        await axios.post(webhookUrl, {
          message: Body,
        });
        
        console.log('Success in send message to webhook');
  
        const deleteCommand = new DeleteMessageCommand({
          QueueUrl,
          ReceiptHandle,
        });
  
        await sqsClient.send(deleteCommand);
  
        console.log('Success in delete message');
      }
      
      console.log('finished');
    } catch (error) {
      console.log(error) 
    }  
  }
})();
