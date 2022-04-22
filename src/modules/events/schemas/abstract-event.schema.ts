import { KafkaEventEnum } from "../enums/kafka-event.enum";

export abstract class AbstractEventSchema {
  type: KafkaEventEnum;

  message: unknown;
}
