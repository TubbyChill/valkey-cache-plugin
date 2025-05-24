import { Router } from 'express'
import { PrismaClient, User } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'

interface AuthenticatedRequest extends Request {
  user: User
}

const router = Router()
const prisma = new PrismaClient()

// Middleware to verify API key
const verifyApiKey = async (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key']
  if (!apiKey) {
    return res.status(401).json({ error: 'API key is required' })
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        apiKeys: {
          some: {
            key: String(apiKey),
            isActive: true,
          },
        },
      },
    })

    if (!user) {
      return res.status(401).json({ error: 'Invalid API key' })
    }

    ;(req as AuthenticatedRequest).user = user
    next()
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Create plugin log
router.post('/', verifyApiKey, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { siteUrl, eventType, eventData, status } = req.body

    const log = await prisma.pluginLog.create({
      data: {
        userId: req.user.id,
        siteUrl,
        eventType,
        eventData,
        status,
        created_by: req.user.id,
      },
    })

    res.status(201).json(log)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get plugin logs for a user
router.get('/', verifyApiKey, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { page = 1, limit = 10, eventType, status, startDate, endDate } = req.query

    const where = {
      userId: req.user.id,
      ...(eventType && { eventType: String(eventType) }),
      ...(status && { status: String(status) }),
      ...(startDate && endDate && {
        created_at: {
          gte: new Date(String(startDate)),
          lte: new Date(String(endDate)),
        },
      }),
    }

    const [logs, total] = await Promise.all([
      prisma.pluginLog.findMany({
        where,
        orderBy: { created_at: 'desc' },
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
      }),
      prisma.pluginLog.count({ where }),
    ])

    res.status(200).json({
      data: logs,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit)),
      },
    })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get plugin log by ID
router.get('/:id', verifyApiKey, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const log = await prisma.pluginLog.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    })

    if (!log) {
      return res.status(404).json({ error: 'Log not found' })
    }

    res.status(200).json(log)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

export { router as pluginLogsRouter } 