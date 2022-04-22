import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { WinstonModule, WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import winston from "winston";
import { kafkaConfigs } from "./config/kafka/kafka.config";
import winstonTransports from "./config/winston/winston.config";
import { AppModule } from "./modules/main/app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonModule.createLogger(winstonTransports),
  });
  const logger = app.get<winston.Logger>(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);

  app.connectMicroservice(kafkaConfigs);

  app.setGlobalPrefix(process.env.BASE_PATH ?? "");

  await app.startAllMicroservices();

  await app.listen(process.env.APP_PORT ?? "3000");
}

bootstrap();
