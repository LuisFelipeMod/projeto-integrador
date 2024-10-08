import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, InternalServerErrorException, HttpException } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    try {
      const createdCompany = await this.companyService.create(createCompanyDto);;

      return {
        message: 'Empresa criada com sucesso',
        data: createdCompany,
      };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException(
          'Não foi possível criar empresa. (Os dados já estão sendo utilizados)',
        );
      }

      console.log(error.response)
      
      if (error.response.statusCode != 500) {
        throw new HttpException(error.response.message, error.response.statusCode);
      }

      throw new InternalServerErrorException(
        'Algum erro inesperado aconteceu, tente novamente mais tarde',
      );
    }
  }

  @Get()
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(id);
  }
}
