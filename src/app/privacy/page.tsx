import Link from "next/link";

export default function Privacy() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Privacy Policy</h1>
      <p className="mb-8 text-gray-600">Last Updated: 10.09.2023</p>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">1. Introduction</h2>
        <p className="mb-4">
          Thank you for using Wordware. Protecting your privacy is essential to
          us. This Privacy Policy outlines how Wordware (&apos;Wordward&apos;,
          &apos;we&apos;, &apos;us&apos;) collects, uses, and protects your
          personal information.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">
          2. Information We Collect
        </h2>
        <p className="mb-2 font-medium">Account Information:</p>
        <p className="mb-4">
          When you sign up for an account with Wordware, we collect your name,
          email address, and password.
        </p>

        <p className="mb-2 font-medium">Usage Information:</p>
        <p className="mb-4">
          We collect information about the applications you create, the tools
          you use, and how you interact with our platform.
        </p>

        <p className="mb-2 font-medium">Cookies and Similar Technologies:</p>
        <p className="mb-4">
          We use cookies and similar tracking technologies to enhance user
          experience and to analyze traffic patterns.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">
          3. How We Use Your Information
        </h2>
        <ul className="mb-4 list-disc space-y-2 pl-6">
          <li>To provide, maintain, and improve the Service.</li>
          <li>
            To analyze usage patterns and trends to improve user experience.
          </li>
          <li>To send you updates, security alerts, and support messages.</li>
          <li>
            To communicate with you about products, services, offers,
            promotions, and events.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">
          4. Data Storage and Analysis
        </h2>
        <p className="mb-4">
          We store and analyze the data related to the applications created
          using the Service to improve our offerings. The analysis is strictly
          for service enhancement and will not be used for any independent
          purposes.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">
          5. Sharing of Information
        </h2>
        <p className="mb-4">
          We do not sell or lease your personal information to third parties. We
          might share your information with third-party service providers that
          support our Service, under strict confidentiality agreements.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">6. Security</h2>
        <p className="mb-4">
          We employ a variety of security measures designed to protect your
          information and keep it confidential and free from any unauthorized
          alteration. However, no system can be 100% secure, and there&apos;s a
          risk that data transmission over the internet may be intercepted or
          accessed by unauthorized parties.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">7. Your Rights</h2>
        <p className="mb-4">
          Depending on where you reside, you may have the right to access,
          correct, or delete the personal information we hold about you. You can
          access and update most of this information through your Wordware
          account.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">
          8. Changes to This Policy
        </h2>
        <p className="mb-4">
          We may revise this Privacy Policy from time to time, and we will post
          the most current version on our website. If a revision meaningfully
          impacts your rights, we will notify you.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">9. Contact Us</h2>
        <p className="mb-4">
          If you have questions or comments about this Privacy Policy or our
          practices, please contact us at{" "}
          <a
            href="mailto:support@wordware.ai"
            className="text-blue-600 hover:text-blue-800"
          >
            support@wordware.ai
          </a>
          .
        </p>
      </section>

      <footer className="mt-16 border-t border-gray-200 pt-8">
        <div className="text-sm text-gray-600">
          © 2024 Wordware. All rights reserved.
          <div className="mt-2 space-x-4">
            <Link href="/privacy" className="hover:text-gray-900">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gray-900">
              Terms and Conditions
            </Link>
            <Link href="/fulfillment" className="hover:text-gray-900">
              Fulfillment Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
