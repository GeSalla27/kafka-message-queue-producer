import { ClientProviderOptions, Transport } from "@nestjs/microservices";
import { SASLOptions } from "@nestjs/microservices/external/kafka.interface";
import env from "../../modules/main/app.env";

const KAFKA_TOKEN = "KAFKA_CLIENT";

const getSasl = (isSsl: boolean): SASLOptions | undefined => {
  if (!isSsl) {
    return undefined;
  }

  return {
    mechanism: "plain",
    username: env.KAFKA_SASL_USERNAME,
    password: env.KAFKA_SASL_PASSWORD,
  };
};

const getKafkaConfigs = () => {
  const isSsl = env.KAFKA_SSL;

  const kafkaConfigs: ClientProviderOptions = {
    name: KAFKA_TOKEN,
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [env.KAFKA_CLIENT_BROKER],
        connectionTimeout: 4000,
        sasl: getSasl(isSsl),
        ssl: isSsl,
        requestTimeout: 60000,
      },
      consumer: {
        groupId: env.KAFKA_CONSUMER_GROUP,
        heartbeatInterval: 3000,
        metadataMaxAge: 180000,
        sessionTimeout: 30000,
      },
      producer: {
        metadataMaxAge: 180000,
      },
    },
  };

  return kafkaConfigs;
};

const kafkaConfigs = getKafkaConfigs();

export { KAFKA_TOKEN, kafkaConfigs };
