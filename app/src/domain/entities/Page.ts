export interface Translation {
  id: string;
  pageId: string;
  locale: string;
  title: string;
  content: string;
  metaTitle?: string;
  metaDesc?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface Page {
  id: string;
  slug: string;
  translations: Translation[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
} 