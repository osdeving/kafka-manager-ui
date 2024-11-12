// index.js
import 'dotenv/config';
import { startConsumer } from './kafkaConsumer.js';

const environment = 'pre'; // Alterar para 'prod' conforme necessário
const topic = 'events.biometry.qa1'; // Nome do tópico desejado

startConsumer(environment, topic);
