import Breadcrumb from "@/components/Common/Breadcrumb";
import AboutContent from "@/components/About/AboutContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About NeuByte | AI & Web Development Company",
  description: "Learn about NeuByte - a leading company in AI and web development, committed to democratizing AI and creating human-centered technology solutions.",
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="About NeuByte"
        description="Discover our mission to revolutionize technology through AI innovation and human-centered design."
      />
      <AboutContent />
    </>
  );
};

export default AboutPage;
