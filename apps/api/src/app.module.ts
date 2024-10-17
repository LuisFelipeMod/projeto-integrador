import { Module } from "@nestjs/common";
import { ServiceOrderModule } from './service-order/service-order.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [ServiceOrderModule, CompanyModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
