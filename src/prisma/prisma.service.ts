import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
  }

  async onModuleInit() {
    await this.$disconnect(); // 기존 연결 닫기
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
