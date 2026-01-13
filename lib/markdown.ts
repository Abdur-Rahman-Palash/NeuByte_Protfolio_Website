import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { Blog } from "@/types/blog";

const postsDirectory = path.join(process.cwd(), "markdown/blogs");

export function getPostSlugs() {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return [];
    }
    return fs.readdirSync(postsDirectory).filter((file) => file.endsWith('.md'));
  } catch (error) {
    console.error('Error reading posts directory:', error);
    return [];
  }
}

export function getPostBySlug(slug: string): Blog {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    title: data.title,
    image: data.coverImage,
    tags: data.tags,
    excerpt: data.excerpt,
    publishDate: data.date,
    author: data.author,
    content: content,
  };
}

export function getAllPosts(): Blog[] {
  try {
    const slugs = getPostSlugs();
    if (slugs.length === 0) {
      return [];
    }
    const posts = slugs
      .map((slug) => {
        try {
          return getPostBySlug(slug);
        } catch (error) {
          console.error(`Error loading post ${slug}:`, error);
          return null;
        }
      })
      .filter((post): post is Blog => post !== null)
      // sort posts by date in descending order
      .sort((post1, post2) => {
        const date1 = post1.publishDate || '';
        const date2 = post2.publishDate || '';
        return date2.localeCompare(date1);
      });
    return posts;
  } catch (error) {
    console.error('Error getting all posts:', error);
    return [];
  }
}

export async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}
