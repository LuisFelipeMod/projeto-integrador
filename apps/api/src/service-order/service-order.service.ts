import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/services/database";
import { CreateServiceOrderDto } from "./dto/create-service-order.dto";
import { UpdateServiceOrderDto } from "./dto/update-service-order.dto";
import { MailService } from "src/shared/services/mail.service";

@Injectable()
export class ServiceOrderService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mailService: MailService,
  ) {}

  async create(createServiceOrderDto: CreateServiceOrderDto) {
    try {
      const serviceOrder = await this.prismaService.serviceOrder.create({
        data: createServiceOrderDto,
      });

      return serviceOrder;
    } catch (error) {
      console.log("error: " + error);
    }
  }

  async findAll() {
    try {
      const serviceOrder = await this.prismaService.serviceOrder.findMany();
      return serviceOrder;
    } catch (error) {
      console.log("error: " + error);
    }
  }

  async findOne(id: string) {
    try {
      const serviceOrder = await this.prismaService.serviceOrder.findUnique({
        where: {
          id,
        },
      });

      return serviceOrder;
    } catch (error) {
      console.log("error: " + error);
    }
  }

  async update(id: string, updateServiceOrderDto: UpdateServiceOrderDto) {
    try {
      const serviceOrder = await this.prismaService.serviceOrder.update({
        where: {
          id,
        },
        data: updateServiceOrderDto,
      });

      return serviceOrder;
    } catch (error) {
      console.log("error: " + error);
    }
  }

  async updateServiceOrderStatus(id: string, { status }: { status: string }) {
    try {
      const serviceOrder = await this.prismaService.serviceOrder.update({
        where: {
          id,
        },
        data: {
          status,
        },
      });

      return serviceOrder;
    } catch (error) {
      console.log("error: " + error);
    }
  }

  async remove(id: string) {
    try {
      const serviceOrder = await this.prismaService.serviceOrder.delete({
        where: {
          id,
        },
      });

      return serviceOrder;
    } catch (error) {
      console.log("error: " + error);
    }
  }

  async getProfitsAndLoss() {
    try {
      const profitsAndLoss = await this.prismaService.serviceOrder.aggregate({
        _sum: {
          labor_value: true,
          material_value: true,
        },
      });

      const data = {
        mao_de_obra: Number(profitsAndLoss._sum.labor_value),
        material: Number(profitsAndLoss._sum.material_value),
        lucro:
          Number(profitsAndLoss._sum.labor_value) -
          Number(profitsAndLoss._sum.material_value),
      };

      return data;
    } catch (error) {
      console.log("error: " + error);
    }
  }

  async shareServiceOrder(id: string, email: string) {
    try {
      const serviceOrder = await this.prismaService.serviceOrder.findUnique({
        where: { id },
      });

      if (!serviceOrder) {
        throw new Error("Service order not found");
      }

      await this.mailService
        .setTo(email)
        .setSubject("Uma ordem de serviço foi compartilhada com você")
        .setHtml(
          `<h1>Uma ordem de serviço foi compartilhada com você</h1>
          <p>Parabéns, você recebeu uma ordem de serviço!</p>
          <p>Para visualizar a ordem de serviço, acesse o link abaixo:</p>
          <a href="${process.env.CLIENT_URL}/shared/${id}">${process.env.CLIENT_URL}/shared/${id}</a>`,
        )
        .send();
    } catch (error) {
      throw new Error(error);
    }
  }
}
