import { Router } from 'express';
import { GetPageBySlugUseCase } from '../../../domain/usecases/page/GetPageBySlugUseCase';

export const pagesRouter = (getPageBySlugUseCase: GetPageBySlugUseCase) => {
  const router = Router();

  router.get('/:slug', async (req, res) => {
    const { slug } = req.params;
    const { locale } = req.query;

    const result = await getPageBySlugUseCase.execute(
      slug,
      typeof locale === 'string' ? locale : undefined
    );

    if (!result.success) {
      return res.status(404).json({
        success: false,
        error: result.error
      });
    }

    return res.json({
      success: true,
      page: result.page
    });
  });

  return router;
}; 