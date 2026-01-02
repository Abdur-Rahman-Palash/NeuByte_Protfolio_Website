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
        description="Learn about our visionary leader, Dr. Ataur Sarkar, whose years of experience on Intel&apos;s cutting‑edge technologies now drive Neubyte&apos;s pioneering AI innovation."
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
                    className="object-center"
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
                  Ataur Sarkar, PhD, <span className="text-2xl">PE (Professional Engineer)</span> 
                </motion.h2>
                <motion.p
                  className="mb-6 text-base leading-relaxed text-body-color dark:text-body-color-dark"
                  variants={fadeInUp}
                >
                 Dr. Ataur Sarkar serves as the CEO and CRE (Chief Research Executive) of NeuByte, a Portland, Oregon-based startup pioneering AI agents, machine learning, and data analytics solutions.
                </motion.p>
                <motion.div
                  className="mb-8"
                  variants={fadeInUp}
                >
                  <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                    Industry Skills and Leadership
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-body-color dark:text-body-color-dark">
                    <li>Worked 13+ years at Intel Corporation, leading high-volume yield data and fault isolation and failure analysis for multi-billion-dollar chip manufacturing.</li>
                    <li>Worked across multiple technology generations, including Intel’s first AI PC, Lunar Lake.
</li>
                    <li>Performed automation of complex workflows and boosting production efficiency</li>
                    <li>Now applying above priceless skills to Neubyte’s intelligent AI agents for real-world impact.
</li>
                    
                  </ul>
                </motion.div>
                <motion.div
                  className="mb-8"
                  variants={fadeInUp}
                >
                  <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                   Academic and Research Excellence
                  </h3>
        
                  <ul className="list-disc list-inside space-y-2 text-body-color dark:text-body-color-dark">
                    <li>Holds a PhD in Electrical Engineering from UC Davis, with MSc degrees from University of Calgary and BUET (ranked top two in class).
</li>
                    <li>Published research work across disciplines in software development, nanophotonics, VLSI design, and optical communications.

</li>
                    <li>Recipient of NSF Fellowship and best poster awards</li>
                    <li>Former Assistant Professor at BUET and part-time faculty at several private universities with 12+ years of academic leadership.

</li>
<li>Mentored hundreds of engineers globally, fostering innovation and next-generation research talent.


</li>

                    
                  </ul>
                </motion.div>
                <motion.div
                  className="mb-8"
                  variants={fadeInUp}
                >
                  <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                    Professional Credentials
                  </h3>
                  
                 <li>Licensed Professional Engineer (PE) in Oregon, USA, specializing in Electronics, Controls, and Communications — a distinction held by very few globally.
</li>
<li>
Proficient in fabrication, advanced instrumentation, and chip design platforms.
</li>
                </motion.div>
               <motion.div
                  className="mb-8"
                  variants={fadeInUp}
                >
                  <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                    Outlook 
                  </h3>
                  
                 <li>Dr. Sarkar steers Neubyte reimagine enterprise AI and ML through scientific rigor and real-world application
</li>
<li>
Integrates academic and industrial excellence to build autonomous, ethical, and scalable systems
</li>
<li>Champions data-driven growth and ethical AI for a rapidly evolving digital economy.</li>
<li>Steers Neubyte to be a global leader in adaptive and intelligent enterprise technology.</li>
                </motion.div>
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