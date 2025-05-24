import { User } from '@prisma/client'
import { AuthRepository } from '../../repositories/auth-repository'

export interface LoginUserInput {
  email: string
  password: string
}

export class LoginUserUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(input: LoginUserInput): Promise<User> {
    const user = await this.authRepository.findUserByEmail(input.email)
    if (!user) {
      throw new Error('Invalid credentials')
    }

    if (!user.password) {
      throw new Error('User has no password set')
    }

    const isValidPassword = await this.authRepository.verifyPassword(user.password, input.password)
    if (!isValidPassword) {
      throw new Error('Invalid credentials')
    }

    return user
  }
} 