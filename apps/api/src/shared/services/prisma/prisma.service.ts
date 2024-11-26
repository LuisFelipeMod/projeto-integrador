import { Injectable } from '@nestjs/common';
import { PrismaClient } from "database";

@Injectable()
export class PrismaService extends PrismaClient {
  private static instance: PrismaService;

  private constructor() {
    super();
  }

  static getInstance(): PrismaService {
    if (!this.instance) {
      this.instance = new PrismaService();
    }
    return this.instance;
  }

}
