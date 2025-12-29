import { Blog } from "@/types/blog";

const blogData: Blog[] = [
  {
    id: 1,
    title: "The Future of AI in Web Development",
    paragraph:
      "Explore how artificial intelligence is revolutionizing the way we build and maintain modern web applications. From automated testing to intelligent code generation, AI is transforming the developer experience.",
    image: "/images/blog/blog-01.jpg",
    author: {
      name: "Alex Chen",
      image: "/images/blog/author-01.png",
      designation: "AI Engineer",
    },
    tags: ["AI", "Web Development"],
    publishDate: "2025",
  },
  {
    id: 2,
    title: "Building Responsive Web Apps with Modern Frameworks",
    paragraph:
      "Learn the best practices for creating responsive, performant web applications using the latest frameworks and technologies. Discover how to optimize for mobile-first design and cross-device compatibility.",
    image: "/images/blog/blog-02.jpg",
    author: {
      name: "Sarah Johnson",
      image: "/images/blog/author-02.png",
      designation: "Frontend Developer",
    },
    tags: ["Web Development", "Responsive Design"],
    publishDate: "2025",
  },
  {
    id: 3,
    title: "Machine Learning Integration in Web Applications",
    paragraph:
      "A comprehensive guide to integrating machine learning models into web applications. Learn about deployment strategies, performance optimization, and real-world use cases for ML-powered web features.",
    image: "/images/blog/blog-03.jpg",
    author: {
      name: "Dr. Michael Torres",
      image: "/images/blog/author-03.png",
      designation: "ML Researcher",
    },
    tags: ["AI", "Machine Learning", "Web"],
    publishDate: "2025",
  },
];
export default blogData;
