import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { Observable } from "rxjs";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(HttpStatus.ACCEPTED)
  sendMessage(): Observable<any> {
    return this.appService.sendMessage({
      id: "413e85f6-9be6-44f8-b22e-647e2eccb7f4",
      name: "Product message sending",
    });
  }
}
