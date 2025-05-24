import { ApiKey } from '../entities/ApiKey';

export interface ApiKeyRepository {
  findById(id: string): Promise<ApiKey | null>;
  findByKey(key: string): Promise<ApiKey | null>;
  findByUserId(userId: string): Promise<ApiKey[]>;
  create(apiKey: Omit<ApiKey, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiKey>;
  update(id: string, apiKey: Partial<ApiKey>): Promise<ApiKey>;
  delete(id: string): Promise<void>;
  updateLastUsed(id: string): Promise<void>;
} 