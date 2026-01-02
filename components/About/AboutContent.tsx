"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import Image from "next/image";

const AboutContent = () => {
  return (
    <section className="pb-[120px] pt-[120px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          {/* Company Image */}
          <motion.div
            className="w-full px-4 lg:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="flex flex-col gap-4">
                <div className="relative aspect-[1/1] overflow-hidden rounded-lg">
                  <Image
                    src="/images/about/neubytes.png"
                    alt="NeuByte Company"
                    fill
                    className="object-cover drop-shadow-three"
                  />
                </div>
                {/* <div className="relative aspect-[1/1] overflow-hidden rounded-lg">
                  <Image
                    src="/images/about/banner.png"
                    alt="NeuByte Company"
                    fill
                    className="object-cover drop-shadow-three"
                  />
                </div> */}
              </div>
             
            </div>
          </motion.div>

          {/* Company Bio and Vision */}
          <motion.div
            className="w-full px-4 lg:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            <div className="lg:pl-8 text-justify">
              {/* Company Bio */}
              <motion.div
                className="mb-8"
                variants={fadeInUp}
              >
                <h2 className="mb-6 text-3xl font-bold text-bold dark:text-white sm:text-4xl">
                  About Us
                </h2>
                <p className="mb-6 text-base leading-relaxed text-body-color dark:text-body-color-dark">
                  Neubyte is a Portland-born technology company dedicated to transforming raw data into reliable decisions. Drawing on deep expertise in data analytics, AI agents, and machine learning, Neubyte helps organizations turn complex, fragmented information into clear, actionable insight that drives measurable business outcomes. From early-stage startups to established enterprises, the company focuses on building intelligent, scalable solutions that are as practical in the field as they are advanced in the lab
                </p>
              </motion.div>

              {/* Our Mission */}
              <motion.div
                className="mb-8"
                variants={fadeInUp}
              >
              
                <p className="mb-6 text-base leading-relaxed text-body-color dark:text-body-color-dark">
                  At the heart of Neubyte is a belief that modern organizations deserve tools that think with them, not just for them. Its AI-native agents are designed to understand context, automate repetitive work, and collaborate with human teams so they can focus on strategy, creativity, and high value decisions. Neubyte’s data and machine learning pipelines are engineered for robustness, security, and transparency, ensuring stakeholders can trust both the models and the insights they produce.

                </p>
              </motion.div>

              {/* Products and Services */}
              

              {/* Why Choose NeuByte */}
              <motion.div
                className="mb-8"
                variants={fadeInUp}
              >
                
                <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
              Neubyte combines a culture of innovation with a grounded, service oriented mindset. The team brings together technologists, data scientists, and industry practitioners who care as much about domain nuance and user experience as they do about algorithms. Whether it is optimizing operations, enhancing customer journeys, or building intelligent products end to end, Neubyte partners closely with clients to design solutions that align with real business goals—not just technical trends.

                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutContent;

