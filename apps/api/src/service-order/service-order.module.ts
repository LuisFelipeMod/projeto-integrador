import { Module } from '@nestjs/common';
import { ServiceOrderService } from './service-order.service';
import { ServiceOrderController } from './service-order.controller';
import { PrismaService } from '../shared/services/database';

@Module({
  controllers: [ServiceOrderController],
  providers: [ServiceOrderService, PrismaService],
})
export class ServiceOrderModule {}
