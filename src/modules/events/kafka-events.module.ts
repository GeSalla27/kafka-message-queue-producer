import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { kafkaConfigs } from "../../config/kafka/kafka.config";
import { KafkaService } from "./kafka-events.service";

@Module({
  imports: [HttpModule, ClientsModule.register([kafkaConfigs])],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaEventsModule {}
