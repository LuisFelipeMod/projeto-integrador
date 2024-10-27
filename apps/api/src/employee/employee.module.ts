import { Module } from "@nestjs/common";
import { EmployeeService } from "./employee.service";
import { EmployeeController } from "./employee.controller";
import { PrismaService } from "../shared/services/database";
import { MailService } from "../shared/services/mail.service";

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService, PrismaService, MailService],
})
export class EmployeeModule {}
