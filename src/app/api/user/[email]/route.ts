import { prisma } from "@/services/database";
import { NextRequest, NextResponse } from "next/server";

type ResponseData = {
  message: string;
};

export async function GET(request: Request, context: any) {
  try {
    const { params } = context;

    const loggedUser = await prisma.user.findUnique({
      where: {
        email: params.email,
      },
      include: {
        companies_owner: true
      }
    });

    return NextResponse.json(loggedUser);
  } catch (error) {
    console.log("teste");
  }
}
