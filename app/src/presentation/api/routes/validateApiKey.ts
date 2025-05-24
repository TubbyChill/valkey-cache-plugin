import { Router } from 'express';
import { ValidateApiKeyUseCase } from '../../../domain/usecases/auth/ValidateApiKeyUseCase';

export const validateApiKeyRouter = (validateApiKeyUseCase: ValidateApiKeyUseCase) => {
  const router = Router();

  router.get('/validate-key', async (req, res) => {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey || typeof apiKey !== 'string') {
      return res.status(401).json({
        valid: false,
        error: 'API key is required'
      });
    }

    const result = await validateApiKeyUseCase.execute(apiKey);

    if (!result.isValid) {
      return res.status(401).json({
        valid: false,
        error: result.error
      });
    }

    return res.json({
      valid: true,
      user: {
        id: result.user!.id,
        email: result.user!.email,
        role: result.user!.role
      }
    });
  });

  return router;
}; 