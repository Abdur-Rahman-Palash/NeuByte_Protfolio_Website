"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";

const Privacy = () => {
  return (
    <>
      <Breadcrumb
        pageName="Privacy Policy"
        description="Learn about how NeuByte collects, uses, and protects your personal information."
      />

      <section className="pb-[120px] pt-[120px]">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8">
              <h1 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl">
                Privacy Policy
              </h1>
              <p className="text-base text-body-color dark:text-body-color-dark">
                Last updated: December 31, 2025
              </p>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2>Information We Collect</h2>
              <p>
                NeuByte collects information you provide directly to us, such as when you contact us through our website,
                subscribe to our newsletter, or interact with our services. This may include your name, email address,
                phone number, and any other information you choose to provide.
              </p>

              <h2>How We Use Your Information</h2>
              <p>
                We use the information we collect to:
              </p>
              <ul>
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send you technical notices, updates, security alerts, and support messages</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Communicate with you about products, services, offers, and events</li>
              </ul>

              <h2>Information Sharing</h2>
              <p>
                We do not sell, trade, or otherwise transfer your personal information to third parties without your
                consent, except as described in this policy. We may share your information in the following circumstances:
              </p>
              <ul>
                <li>With service providers who assist us in operating our website and conducting our business</li>
                <li>When required by law or to protect our rights and safety</li>
                <li>In connection with a business transfer, such as a merger or sale of assets</li>
              </ul>

              <h2>Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information
                against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission
                over the internet is 100% secure.
              </p>

              <h2>Your Rights</h2>
              <p>
                You have the right to:
              </p>
              <ul>
                <li>Access the personal information we hold about you</li>
                <li>Correct any inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to or restrict certain processing of your information</li>
                <li>Data portability</li>
              </ul>

              <h2>Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p>
                Email: info@neubyte.tech <br />
                Phone: 1-503-437-2165<br />
                Address: 18165 NW Corinthian St
Portland, Oregon 97229
USA
              </p>

              <h2>Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
                new Privacy Policy on this page and updating the &ldquo;Last updated&rdquo; date.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Privacy;