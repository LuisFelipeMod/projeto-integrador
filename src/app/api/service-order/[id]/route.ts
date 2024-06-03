import { prisma } from "@/services/database";
import { NextRequest, NextResponse } from "next/server";

type RequestBody = {
  client_cpf_cnpj: string;
  type: string;
  description: string;
  material_value: number;
  labor_value: number;
  status: string;
};

export async function PATCH(request: Request, context: any) {
  try {
    const body = await request.json();

    const requestBody: Partial<RequestBody> = {
      ...body,
    };

    const { params } = context;

    const serviceOrder = await prisma.serviceOrder.update({
      where: {
        id: params.id,
      },
      data: requestBody,
    });

    return NextResponse.json({ serviceOrder });
  } catch (error) {
    console.log("error: " + error);
  }
}
