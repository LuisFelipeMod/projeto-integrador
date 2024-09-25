import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from "../shared/services/database";

@Injectable()
export class CompanyService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCompanyDto: CreateCompanyDto) {
    try {

      const company = await this.prismaService.company.create({
        data: createCompanyDto,
      }); 

      return company;
    } catch (error) {
      console.log("teste: " + error);
    }
  }

  findAll() {
    return `This action returns all company`;
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
