import { Page } from '../../entities/Page';
import { PageRepository } from '../../repositories/PageRepository';

export interface GetPageBySlugResult {
  success: boolean;
  page?: Page;
  error?: string;
}

export class GetPageBySlugUseCase {
  constructor(private pageRepository: PageRepository) {}

  async execute(slug: string, locale?: string): Promise<GetPageBySlugResult> {
    try {
      const page = await this.pageRepository.findBySlug(slug);
      
      if (!page) {
        return { success: false, error: 'Page not found' };
      }

      if (page.deletedAt) {
        return { success: false, error: 'Page has been deleted' };
      }

      // If locale is specified, filter translations
      if (locale) {
        const translation = await this.pageRepository.findTranslation(page.id, locale);
        if (!translation) {
          return { success: false, error: `Translation not found for locale: ${locale}` };
        }
        page.translations = [translation];
      }

      return {
        success: true,
        page
      };
    } catch (error) {
      return {
        success: false,
        error: 'Error fetching page'
      };
    }
  }
} 