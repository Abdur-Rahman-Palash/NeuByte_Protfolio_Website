"use client";
import Breadcrumb from "@/components/Common/Breadcrumb";
import dynamic from "next/dynamic";

const ContactContent = dynamic(() => import("./ContactContent"), {
  ssr: false,
});

const Contact = () => {
  return (
    <>
      <Breadcrumb
        pageName="Contact Us"
        description="Ready to transform your business with AI and web innovation? Let's connect."
      />

      <section className="pb-[120px] pt-[120px]">
        <div className="container">
          <ContactContent />
        </div>
      </section>
    </>
  );
};

export default Contact;
