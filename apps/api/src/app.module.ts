import { Module } from "@nestjs/common";
import { ServiceOrderModule } from './service-order/service-order.module';

@Module({
  imports: [ServiceOrderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
