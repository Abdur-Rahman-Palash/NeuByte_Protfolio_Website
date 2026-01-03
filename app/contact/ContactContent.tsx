"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { useState } from "react";

const ContactContent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      // Using local API for server-side email handling
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setSubmitMessage("Message sent successfully! We'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitMessage("Failed to send message. Please try again.");
      }
    } catch (error) {
      setSubmitMessage("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="-mx-4 flex flex-wrap">
      {/* Contact Form */}
      <motion.div
        className="w-full px-4 lg:w-1/2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-12 lg:mb-0">
          <h2 className="mb-6 text-3xl font-bold text-black dark:text-white sm:text-4xl">
            Get In Touch
          </h2>
          <p className="mb-9 text-base text-body-color dark:text-body-color-dark">
            Have a project in mind or want to learn more about our AI and web solutions?
            We&apos;d love to hear from you.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <motion.input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-md border border-body-color border-opacity-50 bg-transparent px-6 py-4 text-base text-body-color placeholder-body-color/60 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white dark:border-opacity-30 dark:bg-dark dark:text-white dark:focus:border-primary"
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                required
              />
            </div>
            <div className="mb-6">
              <motion.input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-md border border-body-color border-opacity-50 bg-transparent px-6 py-4 text-base text-body-color placeholder-body-color/60 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white dark:border-opacity-30 dark:bg-dark dark:text-white dark:focus:border-primary"
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                required
              />
            </div>
            <div className="mb-6">
              <motion.textarea
                name="message"
                rows={6}
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full resize-none rounded-md border border-body-color border-opacity-50 bg-transparent px-6 py-4 text-base text-body-color placeholder-body-color/60 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white dark:border-opacity-30 dark:bg-dark dark:text-white dark:focus:border-primary"
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                required
              />
            </div>
            <div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="rounded-md bg-primary px-9 py-4 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </motion.button>
            </div>

            {submitMessage && (
              <div className={`mt-4 p-3 rounded-md text-center ${
                submitMessage.includes("successfully")
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
              }`}>
                {submitMessage}
              </div>
            )}
          </form>
        </div>
      </motion.div>

      {/* Contact Info */}
      <motion.div
        className="w-full px-4 lg:w-1/2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="lg:pl-8">
          <div className="mb-12">
            <motion.h3
              className="mb-8 text-2xl font-bold text-black dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Contact Information
            </motion.h3>

            <div className="space-y-8">
              <motion.div
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <motion.div
                  className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </motion.div>
                <div>
                  <h4 className="mb-1 text-lg font-semibold text-black dark:text-white">
                    Email Us
                  </h4>
                  <p className="text-base text-body-color dark:text-body-color-dark">
                    info@neubyte.tech
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.div
                  className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </motion.div>
                <div>
                  <h4 className="mb-1 text-lg font-semibold text-black dark:text-white">
                    Call Us
                  </h4>
                  <p className="text-base text-body-color dark:text-body-color-dark">
                    1-503-437-2165
                  </p>
                 
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            className="rounded-lg bg-gray-50 p-6 dark:bg-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h4 className="mb-4 text-lg font-semibold text-black dark:text-white">
              Why Choose NeuByte?
            </h4>
            <ul className="space-y-2 text-base text-body-color dark:text-body-color-dark">
              <li>• Cutting-edge AI solutions</li>
              <li>• Modern web development</li>
              
              <li>• Agile development process</li>
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactContent;