import Kafka from 'node-rdkafka';
import fs from 'fs';
import path from 'path';
import express from 'express';
import { WebSocketServer } from 'ws';

// Função para configurar o consumidor Kafka com base no ambiente e Kerberos
export const startConsumer = (environment, principal, topic, callback) => {
    // Caminhos dos arquivos de configuração fixos
    const kerberosPath = '/Users/williamssousa/kerberos';
    const keytabPath = path.join(kerberosPath, `${principal.split('@')[0]}.keytab`);
    const krb5ConfigPath = path.join(kerberosPath, 'kafka-krb5.conf');

    // Verificar se o arquivo keytab existe
    if (!fs.existsSync(keytabPath)) {
        console.error(`Arquivo keytab não encontrado: ${keytabPath}`);
        return;
    }

    // Definir o broker com base no ambiente
    let brokers;
    switch (environment) {
        case 'prod':
            brokers = 'brtlvlts1748co.bigdata.redecorp.br:9092,brtlvlts1749co.bigdata.redecorp.br:9092,brtlvlts1750co.bigdata.redecorp.br:9092';
            break;
        case 'pre':
            brokers = 'brtlvlts1716co.bigdata.redecorp.br:9092,brtlvlts1717co.bigdata.redecorp.br:9092,brtlvlts1718co.bigdata.redecorp.br:9092';
            break;
        default:
            console.error('Ambiente inválido:', environment);
            return;
    }

    // Configurar variáveis de ambiente para o Kerberos e arquivo de configuração
    process.env.KRB5_CONFIG = krb5ConfigPath;

    // Configuração do consumidor Kafka
    const config = {
        'metadata.broker.list': brokers,
        'group.id': 'kafka-node-consumer-group',
        'security.protocol': 'SASL_PLAINTEXT',
        'sasl.mechanisms': 'GSSAPI',
        'sasl.kerberos.principal': principal,
        'sasl.kerberos.keytab': keytabPath,
    };

    // Configuração adicional
    const consumer = new Kafka.KafkaConsumer(config, {
        'auto.offset.reset': 'earliest',
    });

    // Conectar e consumir mensagens
    consumer.connect();

    consumer
        .on('ready', () => {
            console.log(`Consumidor conectado. Assinando o tópico "${topic}"...`);
            consumer.subscribe([topic]);
            consumer.consume();
        })
        .on('data', (message) => {
            console.log(`Mensagem recebida: ${message.value.toString()}`);
            if (callback) {
                callback(message.value.toString());
            }
        })
        .on('event.error', (err) => {
            console.error('Erro no consumidor:', err);
        });
};

// Configurar o servidor Express
const app = express();
app.use(express.json());
const port = 3000;
let messages = [];

// Configurar o WebSocket Server
const wss = new WebSocketServer({ noServer: true });

wss.on('connection', (ws) => {
    console.log('Cliente WebSocket conectado');
    ws.send(JSON.stringify(messages)); // Enviar mensagens armazenadas quando o cliente se conecta

    ws.on('close', () => {
        console.log('Cliente WebSocket desconectado');
    });
});

// Endpoint para obter as mensagens consumidas
app.get('/api/messages', (req, res) => {
    res.json(messages);
});

// Endpoint para iniciar o consumidor Kafka
app.post('/start-consumer', (req, res) => {
    const { environment, principal, topic, flags } = req.body;
    startConsumer(environment, principal, topic, (message) => {
        messages.push(message);
        // Enviar mensagem para todos os clientes conectados via WebSocket
        wss.clients.forEach((client) => {
            if (client.readyState === client.OPEN) {
                client.send(JSON.stringify([message]));
            }
        });
    });
    res.send('Consumidor iniciado');
});

// Iniciar o servidor Express
const server = app.listen(port, () => {
    console.log(`Servidor Express rodando em http://localhost:${port}`);
});

// Atualizar o servidor para também lidar com WebSocket
server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});
