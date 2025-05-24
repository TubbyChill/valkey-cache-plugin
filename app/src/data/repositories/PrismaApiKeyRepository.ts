import { PrismaClient } from '@prisma/client';
import { ApiKey } from '../../domain/entities/ApiKey';
import { ApiKeyRepository } from '../../domain/repositories/ApiKeyRepository';

export class PrismaApiKeyRepository implements ApiKeyRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<ApiKey | null> {
    return this.prisma.apiKey.findUnique({
      where: { id }
    });
  }

  async findByKey(key: string): Promise<ApiKey | null> {
    return this.prisma.apiKey.findUnique({
      where: { key }
    });
  }

  async findByUserId(userId: string): Promise<ApiKey[]> {
    return this.prisma.apiKey.findMany({
      where: { userId }
    });
  }

  async create(apiKey: Omit<ApiKey, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiKey> {
    return this.prisma.apiKey.create({
      data: apiKey
    });
  }

  async update(id: string, apiKey: Partial<ApiKey>): Promise<ApiKey> {
    return this.prisma.apiKey.update({
      where: { id },
      data: apiKey
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.apiKey.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  }

  async updateLastUsed(id: string): Promise<void> {
    await this.prisma.apiKey.update({
      where: { id },
      data: { lastUsed: new Date() }
    });
  }
} 