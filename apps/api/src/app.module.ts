import { Module } from "@nestjs/common";
import { ServiceOrderModule } from './service-order/service-order.module';
import { CompanyModule } from './company/company.module';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [ServiceOrderModule, CompanyModule, EmployeeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
