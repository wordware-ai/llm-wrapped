import Link from "next/link";

export default function Terms() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Terms and Conditions</h1>
      <p className="mb-8 text-gray-600">Last Updated: 4th of December 2024</p>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">1. Introduction</h2>
        <p className="mb-4">
          Welcome to wrapped.wordware.ai (&apos;we,&apos; &apos;us,&apos; or
          &apos;our&apos;). These Terms and Conditions (&apos;Terms&apos;)
          govern your access to and use of our website and services
          (collectively, the s&apos;Services&apos;), which provide personalized
          insights and summaries based on user-provided data from Spotify and
          other authorized sources. The Services are operated by Wordware Inc.,
          a Delaware C-Corp located at 746 Kansas St, San Francisco, CA 94107,
          USA.
        </p>
        <p className="mb-4">
          By accessing or using our Services, you agree to be bound by these
          Terms and our Privacy Policy. If you do not agree to these Terms, do
          not use our Services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">
          5. User Responsibilities
        </h2>

        <div className="mb-6">
          <h3 className="mb-3 text-xl font-semibold">
            5.1 Legal Rights to Input Data
          </h3>
          <p className="mb-3">
            You are solely responsible for ensuring that you have the legal
            right to authorize access to any data sources or provide data
            manually. By connecting a data source (e.g., Spotify) or submitting
            data manually, you represent and warrant that:
          </p>
          <ul className="mb-4 list-disc space-y-2 pl-6">
            <li>You are the owner of the account or data; or</li>
            <li>
              You have obtained explicit consent from the owner to authorize its
              use in our Services.
            </li>
          </ul>
          <p className="mb-4">
            We reserve the right to request evidence of such consent and to
            refuse or terminate access to the Services if we suspect misuse.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="mb-3 text-xl font-semibold">
            5.2 Compliance with Laws and Regulations
          </h3>
          <p className="mb-4">
            You agree to use the Services in compliance with all applicable
            local, national, and international laws, regulations, and policies,
            including but not limited to data protection and privacy laws such
            as the General Data Protection Regulation (GDPR) and the California
            Consumer Privacy Act (CCPA).
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">14. Contact Information</h2>
        <p className="mb-4">
          If you have questions about these Terms, please contact us:
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
