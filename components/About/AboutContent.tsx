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
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                <Image
                  src="/images/about/about-image.svg"
                  alt="NeuByte Company"
                  fill
                  className="object-cover drop-shadow-three dark:hidden"
                />
                <Image
                  src="/images/about/about-image-dark.svg"
                  alt="NeuByte Company"
                  fill
                  className="object-cover drop-shadow-three hidden dark:block"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-lg bg-primary px-6 py-3 text-white shadow-lg">
                <p className="text-sm font-semibold">Innovation Leaders</p>
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
            <div className="lg:pl-8">
              {/* Company Bio */}
              <motion.div
                className="mb-8"
                variants={fadeInUp}
              >
                <h2 className="mb-6 text-3xl font-bold text-black dark:text-white sm:text-4xl">
                  About NeuByte
                </h2>
                <p className="mb-6 text-base leading-relaxed text-body-color dark:text-body-color-dark">
                  NeuByte is a pioneering startup headquartered in Portland, Oregon, specializing in software, data analytics, data science, artificial intelligence (AI), and machine learning (ML). Founded with a vision to empower organizations through cutting-edge technology, we deliver research-driven solutions that transform data into actionable intelligence and drive strategic decision-making.
                </p>
              </motion.div>

              {/* Our Mission */}
              <motion.div
                className="mb-8"
                variants={fadeInUp}
              >
                <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                  Our Mission
                </h3>
                <p className="mb-6 text-base leading-relaxed text-body-color dark:text-body-color-dark">
                  At NeuByte, we focus on the research and development of advanced AI, ML, software, data science, data analytics, and cybersecurity solutions. Our nature of business centers on providing innovative technology consultation and services that equip businesses and organizations with smarter, data-informed decisions. By bridging complex challenges with practical insights, we enable our clients to thrive in an increasingly data-centric world.
                </p>
              </motion.div>

              {/* Products and Services */}
              <motion.div
                className="mb-8"
                variants={fadeInUp}
              >
                <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                  Products and Services
                </h3>
                <p className="mb-4 text-base leading-relaxed text-body-color dark:text-body-color-dark">
                  NeuByte offers a comprehensive suite of tailored solutions designed to meet diverse needs across industries:
                </p>
                <ul className="list-disc list-inside text-base leading-relaxed text-body-color dark:text-body-color-dark space-y-2">
                  <li>Custom Software Services: Bespoke software development aligned precisely with customer specifications and requirements, ensuring seamless integration and scalability.</li>
                  <li>Full-Stack Web Development and Maintenance: End-to-end web solutions, from design and development to ongoing maintenance, delivering robust, user-centric digital experiences.</li>
                  <li>Smart Agentic AI Models and ML Services: Autonomous AI agents and machine learning models that automate workflows, predict outcomes, and optimize operations with unparalleled efficiency.</li>
                  <li>Data Analytics Services for Businesses: In-depth analytics to uncover hidden patterns, generate actionable insights, and fuel growth through data-driven strategies.</li>
                </ul>
              </motion.div>

              {/* Why Choose NeuByte */}
              <motion.div
                className="mb-8"
                variants={fadeInUp}
              >
                <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                  Why Choose NeuByte?
                </h3>
                <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
                  Rooted in Portland's vibrant tech ecosystem, NeuByte combines local innovation with global expertise. Our team of seasoned professionals is committed to excellence, security, and client success, delivering solutions that not only meet today's demands but anticipate tomorrow's opportunities. Partner with us to unlock the full potential of your data and AI initiatives.
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

