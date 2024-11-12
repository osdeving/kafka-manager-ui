// backend/server.js
import express from 'express';
import http from 'http';
import WebSocket, { WebSocketServer } from 'ws';
import { exec } from 'child_process';
import { getBrokers } from './kafkaConfig.js';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Middleware para permitir JSON
app.use(express.json());

// Endpoint para iniciar o consumidor Kafka
app.post('/start-consumer', (req, res) => {
    const { environment, principal, topic, flags } = req.body;

    const command = `
    KAFKA_OPTS="-Djava.security.auth.login.config=/path/to/${principal}-jaas.conf"
    /path/to/kafka/bin/kafka-console-consumer.sh
    --bootstrap-server ${getBrokers(environment)}
    --topic ${topic} ${flags}
  `;

    // Execução do consumidor Kafka
    const kafkaProcess = exec(command);

    // Enviar mensagens para o WebSocket ao receber novos dados
    kafkaProcess.stdout.on('data', (data) => {
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    });

    kafkaProcess.stderr.on('data', (data) => {
        console.error('Kafka Error:', data);
    });

    res.send({ message: "Consumer started" });
});

// Inicia o servidor
server.listen(3000, () => console.log('Backend server started on http://localhost:3000'));
