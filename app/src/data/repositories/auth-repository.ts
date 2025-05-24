import { PrismaClient, User } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { AuthRepository, CreateUserInput } from '../../domain/repositories/auth-repository'

export class PrismaAuthRepository implements AuthRepository {
  constructor(private prisma: PrismaClient) {}

  async createUser(input: CreateUserInput): Promise<User> {
    const hashedPassword = await this.hashPassword(input.password)
    return this.prisma.user.create({
      data: {
        email: input.email,
        password: hashedPassword,
        name: input.name,
      },
    })
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    })
  }

  async findUserById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    })
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    })
  }

  async verifyPassword(hashedPassword: string, password: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword)
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10)
  }
} 