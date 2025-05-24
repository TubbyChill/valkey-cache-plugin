import { User } from '@prisma/client'
import { AuthRepository, CreateUserInput } from '../../repositories/auth-repository'

export class RegisterUserUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(input: CreateUserInput): Promise<User> {
    const existingUser = await this.authRepository.findUserByEmail(input.email)
    if (existingUser) {
      throw new Error('User already exists')
    }

    return this.authRepository.createUser(input)
  }
} 