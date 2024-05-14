import { prisma } from "@/services/database";
import { NextRequest, NextResponse } from "next/server";

type RequestBody = {
  client_cpf_cnpj: string;
  type: string;
  description: string;
  material_value: number;
  labor_value: number;
};

export async function POST(request: Request, context: any) {
  try {
    const body = await request.json();

    const requestBody: RequestBody = {
      ...body,
    };

    const serviceOrder = await prisma.serviceOrder.create({
      data: requestBody,
    });

    return NextResponse.json(serviceOrder);
  } catch (error) {
    console.log("error: " + error);
  }
}
