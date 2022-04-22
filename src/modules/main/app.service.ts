import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { KafkaEventEnum } from "../events/enums/kafka-event.enum";
import { KafkaService } from "../events/kafka-events.service";
import { ProductMessageType } from "../types/product-message-type";

@Injectable()
export class AppService {
  // eslint-disable-next-line class-methods-use-this

  constructor(private readonly kafkaService: KafkaService) {}

  sendMessage(product: ProductMessageType): Observable<any> {
    return this.kafkaService.emitDataToTopic(
      product,
      KafkaEventEnum.PRODUCT_CREATE_DATA_SENT
    );
  }
}
