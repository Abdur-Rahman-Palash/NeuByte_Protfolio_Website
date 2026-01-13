import SingleBlog from "@/components/Blog/SingleBlog";
import { getAllPosts } from "@/lib/markdown";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - AI & Web Development Insights",
  description: "Explore our latest articles on Artificial Intelligence, Machine Learning, Web Development, and how they can help small businesses grow.",
  alternates: {
    canonical: "https://neubyte.co/blog",
  },
  openGraph: {
    title: "Blog - AI & Web Development Insights",
    description: "Explore our latest articles on Artificial Intelligence, Machine Learning, Web Development, and how they can help small businesses grow.",
    url: "https://neubyte.co/blog",
    siteName: "NeuByte",
    images: [
      {
        url: "/images/blog/blog-01.jpg",
        width: 1200,
        height: 630,
        alt: "NeuByte Blog",
      },
    ],
    type: "website",
  },
};

const Blog = () => {
  const blogData = getAllPosts();

  return (
    <>
      <Breadcrumb
        pageName="NeuByte Blogs"
        description=""
      />

      <section className="pb-[120px] pt-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            {blogData.map((blog, index) => (
              <div
                key={index}
                className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
              >
                <SingleBlog blog={blog} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
