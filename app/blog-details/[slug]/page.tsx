import SharePost from "@/components/Blog/SharePost";
import TagButton from "@/components/Blog/TagButton";
import Image from "next/image";
import { getPostBySlug, getAllPosts, markdownToHtml } from "@/lib/markdown";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = getPostBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Not Found | NeuByte",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: blog.title,
    description: blog.excerpt,
    alternates: {
      canonical: `https://neubyte.co/blog-details/${blog.slug}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      url: `https://neubyte.co/blog-details/${blog.slug}`,
      siteName: "NeuByte",
      images: [
        {
          url: blog.image,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      type: "article",
      publishedTime: blog.publishDate,
      authors: [blog.author?.name || "NeuByte"],
      tags: blog.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      images: [blog.image],
    },
  };
}

const BlogDetailsPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const blog = getPostBySlug(slug);

  if (!blog) {
    notFound();
  }

  const content = await markdownToHtml(blog.content || "");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    image: [blog.image],
    datePublished: blog.publishDate,
    dateModified: blog.publishDate,
    description: blog.excerpt,
    author: {
      "@type": "Person",
      name: blog.author?.name || "NeuByte",
      jobTitle: blog.author?.designation,
      image: blog.author?.image,
    },
    publisher: {
      "@type": "Organization",
      name: "NeuByte",
      logo: {
        "@type": "ImageObject",
        url: "https://neubyte.co/images/logo/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://neubyte.co/blog-details/${blog.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="pb-[120px] pt-[150px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            <div className="w-full px-4 lg:w-8/12">
              <article>
                <h1 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight">
                  {blog.title}
                </h1>
                <div className="mb-10 flex flex-wrap items-center justify-between border-b border-body-color border-opacity-10 pb-4 dark:border-white dark:border-opacity-10">
                  <div className="flex flex-wrap items-center">
                    <div className="mb-5 mr-10 flex items-center">
                      <div className="mr-4">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full">
                          <Image
                            src={blog.author?.image || "/images/blog/author-01.png"}
                            alt="author"
                            fill
                          />
                        </div>
                      </div>
                      <div className="w-full">
                        <span className="mb-1 block text-base font-medium text-body-color">
                          By{" "}
                          <span className="text-black dark:text-white">
                            {blog.author?.name}
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="mb-5 flex items-center">
                      <span className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.5417 1.75H11.0833V0.583333C11.0833 0.2625 10.8208 0 10.5 0C10.1792 0 9.91667 0.2625 9.91667 0.583333V1.75H4.08333V0.583333C4.08333 0.2625 3.82083 0 3.5 0C3.17917 0 2.91667 0.2625 2.91667 0.583333V1.75H1.45833C0.653333 1.75 0 2.40333 0 3.20833V12.5417C0 13.3467 0.653333 14 1.45833 14H12.5417C13.3467 14 14 13.3467 14 12.5417V3.20833C14 2.40333 13.3467 1.75 12.5417 1.75ZM1.45833 12.5417V4.375H12.5417V12.5417H1.45833Z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                      <span className="text-base font-medium text-body-color">
                        {blog.publishDate && new Date(blog.publishDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                  <div className="mb-5">
                    {blog.tags && blog.tags.length > 0 && (
                      <a
                        href="#0"
                        className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
                      >
                        {blog.tags[0]}
                      </a>
                    )}
                  </div>
                </div>
                <div>
                  <div className="mb-10 w-full overflow-hidden rounded">
                    <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                      <Image
                        src={blog.image}
                        alt="image"
                        fill
                        className="object-cover object-center"
                      />
                    </div>
                  </div>
                  <div 
                    className="prose dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: content }} 
                  />
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetailsPage;
