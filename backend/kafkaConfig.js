

export const kafkaConfig = (environment) => {
    const brokers =
        environment === 'prod'
            ? ["brtlvlts1748co.bigdata.redecorp.br:9092", "brtlvlts1749co.bigdata.redecorp.br:9092", "brtlvlts1750co.bigdata.redecorp.br:9092"]
            : ["brtlvlts1716co.bigdata.redecorp.br:9092", "brtlvlts1717co.bigdata.redecorp.br:9092", "brtlvlts1718co.bigdata.redecorp.br:9092"];

    return {
        'metadata.broker.list': brokers.join(','),   // Lista de brokers
        'security.protocol': 'SASL_PLAINTEXT',       // Protocolo de segurança para SASL com Kerberos
        'sasl.mechanisms': 'GSSAPI',                 // Usando GSSAPI para Kerberos
        'sasl.kerberos.service.name': 'kafka',       // Nome do serviço Kerberos
        'sasl.kerberos.principal': 'SVC_FASTDATA__DEV@REDECORP.BR', // Principal Kerberos (variável de ambiente)
        'sasl.kerberos.keytab': '/Users/williamssousa/kerberos/SVC_FASTDATA_DEV.keytab',  // Caminho para o arquivo keytab (variável de ambiente)
        'group.id': 'kafka-consumer-group',          // Grupo do consumidor
        'enable.auto.commit': true,                  // Habilitar auto-commit
        'debug': 'security,broker,protocol',
    };
};
