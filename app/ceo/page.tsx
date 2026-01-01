"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";
import SectionTitle from "@/components/Common/SectionTitle";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import Image from "next/image";

const CEO = () => {
  return (
    <>
      <Breadcrumb
        pageName="Meet Our CEO"
        description="Learn about Ataur Sarkar, PhD, PE, the visionary leader driving NeuByte's AI innovation from Intel's cutting-edge technology to pioneering AI agents."
      />

      <section className="pb-[120px] pt-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap items-start">
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
                    src="/images/blog/CEO.jpeg"
                    alt="CEO Ataur Sarkar"
                    fill
                    className="object-cover"
                  />
                </div>
              
              </div>
            </motion.div>

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
                <motion.h2
                  className="mb-6 text-3xl font-bold text-black dark:text-white sm:text-4xl"
                  variants={fadeInUp}
                >
                  Ataur Sarkar, PhD, PE
                </motion.h2>
                <motion.p
                  className="mb-6 text-base leading-relaxed text-body-color dark:text-body-color-dark"
                  variants={fadeInUp}
                >
                  Ataur Sarkar, PhD, PE, serves as President, CEO, and Chief Research Executive (CRE) of NeuByte, a Portland, Oregon-based startup pioneering AI agents, machine learning, and data analytics solutions.
                </motion.p>
                <motion.div
                  className="mb-8"
                  variants={fadeInUp}
                >
                  <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                    Dr. Sarkar — Professional Highlights
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-body-color dark:text-body-color-dark">
                    <li>Over 13 years of industry experience and leadership at Intel Corporation</li>
                    <li>Led high-volume yield data analysis to support critical decision-making in multi-billion-dollar semiconductor manufacturing</li>
                    <li>Played a key role across multiple generations of advanced technology nodes</li>
                    <li>Contributed to Intel&apos;s first AI PC platform — Lunar Lake</li>
                    <li className="font-semibold">Extensively used Python and JMP scripting to automate:</li>
                    <ul className="list-disc list-inside ml-6 space-y-1">
                      <li>High-volume product testing workflows</li>
                      <li>Day-to-day critical data analysis processes</li>
                    </ul>
                    <li>Improved operational efficiency, scalability, and reliability of large-scale testing systems</li>
                    <li>Brings deep expertise in data-driven engineering and automation</li>
                    <li>Now applies this experience to supercharge NeuByte&apos;s agentic AI solutions for real-world, enterprise-grade impact</li>
                  </ul>
                </motion.div>
                <motion.div
                  className="mb-8"
                  variants={fadeInUp}
                >
                  <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                    Academic and Research Excellence
                  </h3>
                  <p className="mb-4 text-body-color dark:text-body-color-dark">
                    A PhD from University of California, Davis in Electrical Engineering, with MSc degrees from University of Calgary, Canada, and BUET, and being top two in BSc, Dr. Sarkar has authored publications in automation of commercial electrical energy demand forecasting, nanophotonics, VLSI design, and optical communications, earning NSF Fellowship and best poster awards. As a former BUET Assistant Professor of Electrical and Electronic Engineering and part time faculty of several private universities in Bangladesh- MIST, NSU, AUST to name a few- with 12 years of university teaching, he instructed and mentored hundreds of young engineering minds across the globe.
                  </p>
                </motion.div>
                <motion.div
                  className="mb-8"
                  variants={fadeInUp}
                >
                  <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                    Professional Credentials
                  </h3>
                  <p className="mb-4 text-body-color dark:text-body-color-dark">
                    Dr. Sarkar is a licensed Professional Engineer (PE) in the State of Oregon, USA, in Electronics, Controls, and Communications. Holding a PE in this discipline is a very rare, unique, and highly prestigious achievement among the top talents in the field of engineering. Dr. Sarkar excels in cleanroom fabrication, hardware tools (SEM, AFM, TEM), and chip design software (Cadence, ADS). His transition from Intel to NeuByte positions the company at the forefront of AI- and ML-native innovation.
                  </p>
                </motion.div>
                <motion.p
                  className="text-lg font-semibold text-primary"
                  variants={fadeInUp}
                >
                  &ldquo;Under Dr. Sarkar&apos;s guidance with solid experience in top tech industry and academia and research, NeuByte looks forward to redefine enterprise AI and ML applications by integrating rigorous research with practical, autonomous deployments, empowering organizations to harness data for ethical, scalable growth in a rapidly evolving tech landscape.&rdquo;
                </motion.p>
              </div>
            </motion.div>
          </div>

          {/* Contact CTA */}
          <motion.div
            className="mt-20 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 p-8 dark:from-primary/5 dark:to-secondary/5">
              <h3 className="mb-4 text-2xl font-bold text-black dark:text-white">
                Ready to Innovate Together?
              </h3>
              <p className="mb-6 text-base text-body-color dark:text-body-color-dark">
                Let&apos;s discuss how NeuByte can help transform your business with AI-powered solutions.
              </p>
              <motion.a
                href="/contact"
                className="inline-block rounded-md bg-primary px-8 py-4 text-base font-semibold text-white transition hover:bg-primary/90"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default CEO;