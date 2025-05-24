import { Page, Translation } from '../entities/Page';

export interface PageRepository {
  findById(id: string): Promise<Page | null>;
  findBySlug(slug: string): Promise<Page | null>;
  findAll(): Promise<Page[]>;
  create(page: Omit<Page, 'id' | 'createdAt' | 'updatedAt' | 'translations'>): Promise<Page>;
  update(id: string, page: Partial<Page>): Promise<Page>;
  delete(id: string): Promise<void>;
  
  // Translation methods
  addTranslation(pageId: string, translation: Omit<Translation, 'id' | 'pageId' | 'createdAt' | 'updatedAt'>): Promise<Translation>;
  updateTranslation(id: string, translation: Partial<Translation>): Promise<Translation>;
  deleteTranslation(id: string): Promise<void>;
  findTranslation(pageId: string, locale: string): Promise<Translation | null>;
} 