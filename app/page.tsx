import AboutSectionOne from "@/components/About/AboutSectionOne";
import Blog from "@/components/Blog";
import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Video from "@/components/Video";
import { Metadata } from "next";

export const metadata: Metadata = {
  description:
    "Transform your business with cutting-edge AI solutions and modern web development. NeuByte delivers innovative technology solutions for startups and enterprises.",
};

export default function Page() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Video />
      <AboutSectionOne />
      <Blog />
      <Contact />
    </>
  );
}
