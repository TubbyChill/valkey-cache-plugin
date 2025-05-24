import { ApiKey } from '../../entities/ApiKey';
import { User } from '../../entities/User';
import { ApiKeyRepository } from '../../repositories/ApiKeyRepository';
import { UserRepository } from '../../repositories/UserRepository';

export interface ValidateApiKeyResult {
  isValid: boolean;
  apiKey?: ApiKey;
  user?: User;
  error?: string;
}

export class ValidateApiKeyUseCase {
  constructor(
    private apiKeyRepository: ApiKeyRepository,
    private userRepository: UserRepository
  ) {}

  async execute(key: string): Promise<ValidateApiKeyResult> {
    try {
      const apiKey = await this.apiKeyRepository.findByKey(key);
      
      if (!apiKey) {
        return { isValid: false, error: 'Invalid API key' };
      }

      if (!apiKey.isActive) {
        return { isValid: false, error: 'API key is inactive' };
      }

      if (apiKey.deletedAt) {
        return { isValid: false, error: 'API key has been revoked' };
      }

      const user = await this.userRepository.findById(apiKey.userId);
      
      if (!user) {
        return { isValid: false, error: 'User not found' };
      }

      if (user.deletedAt) {
        return { isValid: false, error: 'User account is inactive' };
      }

      // Update last used timestamp
      await this.apiKeyRepository.updateLastUsed(apiKey.id);

      return {
        isValid: true,
        apiKey,
        user
      };
    } catch (error) {
      return {
        isValid: false,
        error: 'Error validating API key'
      };
    }
  }
} 