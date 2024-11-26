import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) { }

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Post("/invite")
  inviteEmployee(@Body() inviteEmployeeDto: { email: string, companyId: string }) {
    return this.employeeService.inviteEmployee(inviteEmployeeDto.email, inviteEmployeeDto.companyId);
  }

  @Get(':companyId')
  findAll(@Param('companyId') companyId: string, ) {
    return this.employeeService.findAll(companyId);
  }

  @Get(':id')
  findOne(@Param('companyId') companyId: string, @Param('id') id: string) {
    return this.employeeService.findOne(companyId, id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(id);
  }
}
