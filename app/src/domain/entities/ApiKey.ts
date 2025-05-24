export interface ApiKey {
  id: string;
  key: string;
  userId: string;
  isActive: boolean;
  lastUsed?: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
} 