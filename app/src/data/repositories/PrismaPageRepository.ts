import { PrismaClient } from '@prisma/client';
import { Page, Translation } from '../../domain/entities/Page';
import { PageRepository } from '../../domain/repositories/PageRepository';

export class PrismaPageRepository implements PageRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<Page | null> {
    return this.prisma.page.findUnique({
      where: { id },
      include: { translations: true }
    });
  }

  async findBySlug(slug: string): Promise<Page | null> {
    return this.prisma.page.findUnique({
      where: { slug },
      include: { translations: true }
    });
  }

  async findAll(): Promise<Page[]> {
    return this.prisma.page.findMany({
      include: { translations: true }
    });
  }

  async create(page: Omit<Page, 'id' | 'createdAt' | 'updatedAt' | 'translations'>): Promise<Page> {
    return this.prisma.page.create({
      data: page,
      include: { translations: true }
    });
  }

  async update(id: string, page: Partial<Page>): Promise<Page> {
    const { translations, ...pageData } = page;
    return this.prisma.page.update({
      where: { id },
      data: pageData,
      include: { translations: true }
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.page.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  }

  async addTranslation(
    pageId: string,
    translation: Omit<Translation, 'id' | 'pageId' | 'createdAt' | 'updatedAt'>
  ): Promise<Translation> {
    return this.prisma.translation.create({
      data: {
        ...translation,
        pageId
      }
    });
  }

  async updateTranslation(id: string, translation: Partial<Translation>): Promise<Translation> {
    return this.prisma.translation.update({
      where: { id },
      data: translation
    });
  }

  async deleteTranslation(id: string): Promise<void> {
    await this.prisma.translation.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  }

  async findTranslation(pageId: string, locale: string): Promise<Translation | null> {
    return this.prisma.translation.findFirst({
      where: {
        pageId,
        locale,
        deletedAt: null
      }
    });
  }
} 