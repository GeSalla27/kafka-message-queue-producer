import { Module, ValidationPipe } from "@nestjs/common";
import { APP_PIPE } from "@nestjs/core";
import { WinstonModule } from "nest-winston";
import winstonConfig from "../../config/winston/winston.config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { KafkaEventsModule } from "../events/kafka-events.module";

@Module({
  imports: [WinstonModule.forRoot(winstonConfig), KafkaEventsModule],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_PIPE, useValue: new ValidationPipe({}) },
  ],
})
export class AppModule {}
