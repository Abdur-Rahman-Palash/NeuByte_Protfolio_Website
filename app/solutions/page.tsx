"use client";
import Breadcrumb from "@/components/Common/Breadcrumb";
import dynamic from "next/dynamic";
import Image from "next/image";

const AnimatedContent = dynamic(() => import("./AnimatedContent"), {
  ssr: false,
});

const Solutions = () => {
  return (
    <>
      <Breadcrumb
        pageName="Our Solutions"
        description="Innovative solutions powered by AI and cutting-edge web technologies."
      />

      <section className="pb-[120px] pt-[120px]">
        <div className="container">
          <AnimatedContent />
        </div>
      </section>
    </>
  );
};

export default Solutions;