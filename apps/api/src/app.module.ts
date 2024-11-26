import { Module } from "@nestjs/common";
import { CompanyModule } from './company/company.module';
import { EmployeeModule } from './employee/employee.module';
import { ServiceOrderModule } from './service-order/service-order.module';
import { PrismaModule } from "./shared/services/prisma/prisma.module";

@Module({
  imports: [PrismaModule, ServiceOrderModule, CompanyModule, EmployeeModule],
})
export class AppModule { }
