import { Module } from "@nestjs/common";
import { MailService } from "../shared/services/mail.service";
import { ServiceOrderController } from "./service-order.controller";
import { ServiceOrderService } from "./service-order.service";

@Module({
  controllers: [ServiceOrderController],
  providers: [ServiceOrderService, MailService],
})
export class ServiceOrderModule {}
