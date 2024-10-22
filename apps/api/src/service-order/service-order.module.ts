import { Module } from "@nestjs/common";
import { ServiceOrderService } from "./service-order.service";
import { ServiceOrderController } from "./service-order.controller";
import { PrismaService } from "../shared/services/database";
import { MailService } from "../shared/services/mail.service";

@Module({
  controllers: [ServiceOrderController],
  providers: [ServiceOrderService, PrismaService, MailService],
})
export class ServiceOrderModule {}
