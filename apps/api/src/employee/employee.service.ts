import { Injectable } from "@nestjs/common";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { PrismaService } from "../shared/services/database";
import { MailService } from "../shared/services/mail.service";

@Injectable()
export class EmployeeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mailService: MailService,
  ) { }

  create(createEmployeeDto: CreateEmployeeDto) { }

  async findAll() {
    try {
      const employees = await this.prismaService.employee.findMany({
        where: {
          companyId: "teste",
        },
      });
      return employees;
    } catch (error) {
      console.log("error: " + error);
    }
  }

  async findOne(id: string) {
    try {
      const employees = await this.prismaService.employee.findMany({
        where: {
          companyId: "teste",
          id,
        },
      });
      return employees;
    } catch (error) {
      console.log("error: " + error);
    }
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    try {
      const employees = await this.prismaService.employee.update({
        where: {
          id,
        },
        data: updateEmployeeDto,
      });
      return employees;
    } catch (error) {
      console.log("error: " + error);
    }
  }

  async remove(id: string) {
    try {
      const employees = await this.prismaService.employee.update({
        where: {
          id,
        },
        data: {
          endDate: new Date(),
        }
      });
      return employees;
    } catch (error) {
      console.log("error: " + error);
    }
  }

  async inviteEmployee(email: string, companyId: string) {
    try {
      const company = await this.prismaService.company.findUnique({
        where: { id: companyId },
      });

      if (!company) {
        throw new Error("Company not found");
      }

      await this.mailService
        .setTo(email)
        .setSubject("Você foi convidado para participar de uma empresa!")
        .setHtml(
          `<a href="${process.env.CLIENT_URL}/invite-employee?company=${companyId}">Clique aqui para aceitar!</a>`,
        )
        .send();
    } catch (error) {
      throw new Error(error);
    }
  }
}
