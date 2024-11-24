import { Module } from "@nestjs/common";
import { MailService } from "../shared/services/mail.service";
import { EmployeeController } from "./employee.controller";
import { EmployeeService } from "./employee.service";

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService, MailService],
})
export class EmployeeModule {}
