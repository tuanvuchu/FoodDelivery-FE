type Child = { image: string; slug: string; title: string };

export type Blog = {
  id: string;
  title: string;
  image: string;
  description: string;
  content: Array<{ paragraph: string; quote?: string }>;
  slug: string;
  created_at: Date;
  author: string;
  comment_count: number;
  categories: Array<{ name?: string; slug?: number }>;
  pre?: Child;
  next?: Child;
};
