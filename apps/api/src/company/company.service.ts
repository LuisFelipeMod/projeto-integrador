import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from "../shared/services/prisma/prisma.service";

@Injectable()
export class CompanyService {
  constructor(
    private readonly prismaService: PrismaService,
    // private readonly serviceOrder: ServiceOrderService
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    const owner = await this.prismaService.user.findUnique({
      where: { id: createCompanyDto.ownerId }
    });

    if(!owner) {
      throw new NotFoundException(
        "Não foi possível criar empresa. (O usuário não existe)"
      )
    }

    const company = await this.prismaService.company.create({
      data: createCompanyDto,
    }); 

    return company;
  }

  async findAll() {
    const companies = await this.prismaService.company.findMany()
    
    if(!companies) {
        throw new NotFoundException(
          "Ainda não existe empresas cadastradas"
        )
    }

    return companies;
  }


  async findOne(id: string) {
    const company = await this.prismaService.company.findUnique({
      where: {
        id: id
      }
    })
    
    if(!company) {
        throw new NotFoundException(
          "Empresa não encontrada"
        )
    }

    return company;
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.findOne(id);

    return await this.prismaService.company.update({
      data: updateCompanyDto,
      where: { id: id}
    });
  }

  async remove(id: string) {    
    const company = await this.findOne(id);

    await this.prismaService.company.delete({
      where: { id: id}
    });

    return "Empresa Deletada com sucesso"
  }
}
