import Link from "next/link";

export default function Privacy() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Privacy Policy</h1>
      <p className="mb-8 text-gray-600">Last Updated: 4th of December, 2024</p>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">1. Introduction</h2>
        <p className="mb-4">
          Welcome to wrapped.wordware.ai (&quot;we,&quot; &quot;us,&quot; or
          &quot;our&quot;). This Privacy Policy explains how Wordware Inc., a
          Delaware C-Corp located at 746 Kansas St, San Francisco, CA 94107,
          USA, collects, uses, discloses, and protects your personal information
          when you use our website and services (collectively, the
          &quot;Services&quot;). By accessing or using our Services, you agree
          to the collection and use of information in accordance with this
          Privacy Policy.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">
          2. Information We Collect
        </h2>

        <div className="mb-6">
          <h3 className="mb-3 text-xl font-semibold">2.1 Personal Data</h3>
          <p className="mb-3">
            While using our Services, we may ask you to provide certain
            personally identifiable information ("Personal Data") that can be
            used to contact or identify you. Personal Data may include, but is
            not limited to:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              Email Address: Collected via authentication or registration.
            </li>
            <li>
              Display Name or Username: Provided by connected services or user
              input.
            </li>
            <li>
              User ID: Unique identifiers associated with your account(s).
            </li>
            <li>
              Country: Your country, as determined by your account or input.
            </li>
            <li>
              Subscription Level or Preferences: Information about service
              subscriptions, usage, or preferences.
            </li>
          </ul>
        </div>
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

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">17. Contact Information</h2>
        <p className="mb-4">
          If you have questions or concerns, please contact us:
        </p>
        <div className="pl-4">
          <p className="mb-2">
            Email:{" "}
            <a
              href="mailto:sebastian@wordware.ai"
              className="text-blue-600 hover:text-blue-800"
            >
              sebastian@wordware.ai
            </a>
          </p>
          <p className="mb-2">Address:</p>
          <address className="pl-4 not-italic">
            Wordware Inc.
            <br />
            746 Kansas St
            <br />
            San Francisco, CA 94107
            <br />
            USA
          </address>
        </div>
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
