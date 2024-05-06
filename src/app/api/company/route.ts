import { prisma } from "@/services/database";
import { NextRequest, NextResponse } from "next/server";

type RequestBody = {
  fantasy_name?: string;
  corporate_name: string;
  cnpj_cpf: string;
  ownerId: string;
};

export async function POST(request: Request, context: any) {
  try {
    const body = await request.json();

    const requestBody: RequestBody = {
      ...body,
    };

    const loggedUser = await prisma.company.create({
      data: requestBody,
    });

    return NextResponse.json(loggedUser);
  } catch (error) {
    console.log("teste");
  }
}
