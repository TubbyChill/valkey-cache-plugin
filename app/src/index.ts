import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { validateApiKeyRouter } from './presentation/api/routes/validateApiKey';
import { pagesRouter } from './presentation/api/routes/pages';
import { PrismaUserRepository } from './data/repositories/PrismaUserRepository';
import { PrismaApiKeyRepository } from './data/repositories/PrismaApiKeyRepository';
import { PrismaPageRepository } from './data/repositories/PrismaPageRepository';
import { ValidateApiKeyUseCase } from './domain/usecases/auth/ValidateApiKeyUseCase';
import { GetPageBySlugUseCase } from './domain/usecases/page/GetPageBySlugUseCase';

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// Repositories
const userRepository = new PrismaUserRepository(prisma);
const apiKeyRepository = new PrismaApiKeyRepository(prisma);
const pageRepository = new PrismaPageRepository(prisma);

// Use cases
const validateApiKeyUseCase = new ValidateApiKeyUseCase(apiKeyRepository, userRepository);
const getPageBySlugUseCase = new GetPageBySlugUseCase(pageRepository);

// Routes
app.use('/api/validate-key', validateApiKeyRouter(validateApiKeyUseCase));
app.use('/api/pages', pagesRouter(getPageBySlugUseCase));

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal server error'
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 