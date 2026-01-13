export type Author = {
  name: string;
  image: string;
  designation: string;
};

export type Blog = {
  id?: number | string;
  slug: string;
  title: string;
  image: string;
  tags: string[];
  excerpt: string;
  content: string;
  publishDate?: string;
  author?: Author;
};
