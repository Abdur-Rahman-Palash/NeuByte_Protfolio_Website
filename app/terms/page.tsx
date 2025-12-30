"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";

const Terms = () => {
  return (
    <>
      <Breadcrumb
        pageName="Terms of Service"
        description="Read our terms and conditions for using NeuByte's services and website."
      />

      <section className="pb-[120px] pt-[120px]">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8">
              <h1 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl">
                Terms of Service
              </h1>
              <p className="text-base text-body-color dark:text-body-color-dark">
                Last updated: December 31, 2025
              </p>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2>Acceptance of Terms</h2>
              <p>
                By accessing and using NeuByte&apos;s website and services, you accept and agree to be bound by the terms
                and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>

              <h2>Use License</h2>
              <p>
                Permission is granted to temporarily download one copy of the materials on NeuByte&apos;s website for personal,
                non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under
                this license you may not:
              </p>
              <ul>
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to decompile or reverse engineer any software contained on NeuByte&apos;s website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>

              <h2>Services</h2>
              <p>
                NeuByte provides AI-powered solutions including machine learning, data analytics, and intelligent
                automation services. All services are provided &ldquo;as is&rdquo; without warranty of any kind.
              </p>

              <h2>User Responsibilities</h2>
              <p>
                As a user of our services, you agree to:
              </p>
              <ul>
                <li>Provide accurate and complete information</li>
                <li>Use our services only for lawful purposes</li>
                <li>Not interfere with or disrupt our services</li>
                <li>Respect intellectual property rights</li>
                <li>Maintain the confidentiality of your account information</li>
              </ul>

              <h2>Intellectual Property</h2>
              <p>
                The service and its original content, features, and functionality are and will remain the exclusive
                property of NeuByte and its licensors. The service is protected by copyright, trademark, and other laws.
              </p>

              <h2>Limitation of Liability</h2>
              <p>
                In no event shall NeuByte, nor its directors, employees, partners, agents, suppliers, or affiliates,
                be liable for any indirect, incidental, special, consequential, or punitive damages, including without
                limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>

              <h2>Termination</h2>
              <p>
                We may terminate or suspend your account and bar access to the service immediately, without prior notice
                or liability, under our sole discretion, for any reason whatsoever and without limitation, including but
                not limited to a breach of the Terms.
              </p>

              <h2>Governing Law</h2>
              <p>
                These Terms shall be interpreted and governed by the laws of the State of Oregon, United States,
                without regard to its conflict of law provisions.
              </p>

              <h2>Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision
                is material, we will provide at least 30 days notice prior to any new terms taking effect.
              </p>

              <h2>Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <p>
                Email: legal@neubyte.com<br />
                Phone: (555) 123-4567<br />
                Address: Portland, Oregon, USA
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Terms;