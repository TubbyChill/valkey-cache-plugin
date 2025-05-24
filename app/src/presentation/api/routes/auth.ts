import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { PrismaAuthRepository } from '../../../data/repositories/auth-repository'
import { RegisterUserUseCase } from '../../../domain/usecases/auth/register-user'
import { LoginUserUseCase } from '../../../domain/usecases/auth/login-user'

const router = Router()
const prisma = new PrismaClient()
const authRepository = new PrismaAuthRepository(prisma)

router.post('/register', async (req, res) => {
  try {
    const registerUseCase = new RegisterUserUseCase(authRepository)
    const user = await registerUseCase.execute({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
    })

    res.status(201).json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
})

router.post('/login', async (req, res) => {
  try {
    const loginUseCase = new LoginUserUseCase(authRepository)
    const user = await loginUseCase.execute({
      email: req.body.email,
      password: req.body.password,
    })

    // Create session token
    const token = 'your-jwt-token-here' // TODO: Implement JWT token generation

    res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
})

export { router as authRouter } 