import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { KAFKA_TOKEN } from "../../config/kafka/kafka.config";
import { KafkaEventEnum } from "./enums/kafka-event.enum";
import { TopicEnum } from "./enums/topic.enum";
import { AbstractEventSchema } from "./schemas/abstract-event.schema";

@Injectable()
export class KafkaService implements OnModuleInit {
  // eslint-disable-next-line no-useless-constructor
  constructor(@Inject(KAFKA_TOKEN) private readonly kafkaClient: ClientKafka) {}

  async onModuleInit(): Promise<void> {
    await this.kafkaClient.connect();
  }

  emitDataToTopic<TResult>(
    input: unknown,
    type: KafkaEventEnum
  ): Observable<TResult> {
    const data = {
      message: input,
      type,
    };

    return this.emitToService(data);
  }

  emitToService<TResult>(data: AbstractEventSchema): Observable<TResult> {
    return this.emit(TopicEnum.PRODUCT, data);
  }

  emit<TInput, TResult>(pattern: TopicEnum, data: TInput): Observable<TResult> {
    return this.kafkaClient.emit(pattern, JSON.stringify(data));
  }
}
