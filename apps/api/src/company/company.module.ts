import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { PrismaService } from '../shared/services/prisma/prisma.service';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
