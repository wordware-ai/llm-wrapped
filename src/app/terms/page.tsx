import Link from "next/link";

export default function Terms() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Terms and Conditions</h1>
      <p className="mb-8 text-gray-600">Last Updated: 10.09.2023</p>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing and using Wordware&apos;s services at app.wordware.ai
          (&ldquo;the Service&rdquo;), provided by Wordware
          (&ldquo;Wordware&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), you
          agree to comply with and be bound by these terms and conditions. If
          you do not agree to these terms, please do not use the Service.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">2. Changes to Terms</h2>
        <p className="mb-4">
          Wordware reserves the right to change, modify, or revise these terms
          and conditions at any time. The continued use of the Service following
          the posting of any changes to the terms constitutes acceptance of
          those changes.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">
          3. Registration and Account Security
        </h2>
        <p className="mb-4">
          To use the Service, User must register for an account. User agrees to
          provide accurate, current, and complete information during the
          registration process and to update such information to keep it
          accurate, current, and complete.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">4. User Conduct</h2>
        <p className="mb-4">Users agree not to use the Service to:</p>
        <ul className="mb-4 list-disc space-y-2 pl-6">
          <li>Violate any laws or regulations.</li>
          <li>
            Infringe upon the rights of any third party, including copyright,
            trademark, privacy, or other personal or proprietary rights.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">
          Acceptable Use Policy (AUP)
        </h2>
        <h3 className="mb-2 text-xl font-medium">
          Ethical and Responsible Use
        </h3>
        <p className="mb-4">
          Ensuring the ethical and responsible use of WordWare is paramount. All
          users of WordWare must adhere to our Acceptable Use Policy (AUP). It
          is important to clarify that WordWare does not permit users to create
          chatbots. The platform solely leverages the reasoning abilities of
          Claude for its functionalities.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">
          API Providers and Foundational LLM Models
        </h2>
        <p className="mb-4">
          Our services are underpinned by foundational Large Language Models
          (LLMs), primarily provided by partners such as OpenAI, Claude and
          Google (PaLM). Users must:
        </p>
        <ul className="mb-4 list-disc space-y-2 pl-6">
          <li>
            Refrain from using LLMs for generating misleading information,
            deepfakes, or any content that can be harmful or deceitful.
          </li>
          <li>Not use LLMs to promote hate, discrimination, or violence.</li>
          <li>
            Respect any additional terms, guidelines, and policies set forth by
            our API providers.
          </li>
          <li>
            Ensure that any data or content used with LLMs does not violate
            privacy laws, intellectual property rights, or other legal
            standards.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">
          5. Data Storage and Analysis
        </h2>
        <p className="mb-4">
          Wordware will store and analyze data related to the applications
          created through the Service. The analysis of data is for the purpose
          of improving the Service and will not be used for our independent
          purposes.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">
          6. Intellectual Property
        </h2>
        <p className="mb-4">
          Users retain ownership of the intellectual content they create using
          Wordware. However, by using the Service, users grant Wordware a
          non-exclusive, transferable, sub-licensable, royalty-free, and global
          license to use, store, display, reproduce, modify, create derivative
          works, and distribute user content solely for the purpose of operating
          and improving the Service.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">7. Privacy</h2>
        <p className="mb-4">
          Your use of Wordware is also governed by our Privacy Policy, which can
          be found{" "}
          <Link href="/privacy" className="text-blue-600 hover:text-blue-800">
            here
          </Link>
          .
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">
          8. Limitation of Liability
        </h2>
        <p className="mb-4">
          To the maximum extent permitted by applicable law, Wordware shall not
          be liable for any indirect, incidental, special, consequential, or
          punitive damages, or any loss of profits or revenues, whether incurred
          directly or indirectly, or any loss of data, use, goodwill, or other
          intangible losses.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">9. Termination</h2>
        <p className="mb-4">
          Wordware reserves the right to terminate or suspend your account and
          access to the Service at our sole discretion, without notice, for
          conduct that we believe violates these terms or is harmful to other
          users of the Service, us, third parties, or for other conduct that we
          believe to be harmful to our business or reputation.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">10. Governing Law</h2>
        <p className="mb-4">
          These terms and conditions and any dispute or claim arising out of or
          in connection with them or their subject matter or formation shall be
          governed by and construed in accordance with the law of the State of
          California.
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
