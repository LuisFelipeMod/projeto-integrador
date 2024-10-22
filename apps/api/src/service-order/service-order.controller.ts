import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ServiceOrderService } from './service-order.service';
import { CreateServiceOrderDto } from './dto/create-service-order.dto';
import { UpdateServiceOrderDto } from './dto/update-service-order.dto';
import { ShareServiceOrderDto } from './dto/share-service-order.dto';

@Controller('service-order')
export class ServiceOrderController {
  constructor(private readonly serviceOrderService: ServiceOrderService) { }

  @Post()
  create(@Body() createServiceOrderDto: CreateServiceOrderDto) {
    return this.serviceOrderService.create(createServiceOrderDto);
  }

  @Post("share")
  shateServiceOrder(@Body() shareServiceOrderDto: ShareServiceOrderDto) {
    return this.serviceOrderService.shareServiceOrder(shareServiceOrderDto.id, shareServiceOrderDto.email);
  }

  @Get()
  findAll() {
    return this.serviceOrderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceOrderService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceOrderDto: UpdateServiceOrderDto) {
    return this.serviceOrderService.update(id, updateServiceOrderDto);
  }

  @Put(':id')
  updateServiceOrderStatus(@Param('id') id: string, @Body() updateServiceOrderStatusDto: { status: string }) {
    return this.serviceOrderService.updateServiceOrderStatus(id, updateServiceOrderStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceOrderService.remove(id);
  }
}
