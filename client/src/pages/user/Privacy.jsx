import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white px-5 py-10 text-gray-900 dark:bg-gray-950 dark:text-white sm:px-8 lg:px-20">
      <div className="mx-auto max-w-4xl">

        {/* HEADER */}
        <div className="mb-10">
          <Link
            to="/"
            className="text-sm font-semibold text-green-600 hover:text-green-500"
          >
            ← Back to Rent a Ride
          </Link>

          <h1 className="mt-6 text-3xl font-bold sm:text-4xl">
            Privacy Policy
          </h1>

          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            Last updated: August 2026
          </p>
        </div>

        {/* CONTENT */}
        <div className="space-y-8 leading-7 text-gray-700 dark:text-gray-300">

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
              1. Introduction
            </h2>

            <p>
              Welcome to Rent a Ride. We respect your privacy and are
              committed to protecting the information you provide while
              using our website and services.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
              2. Information We Collect
            </h2>

            <p>
              When you create an account or use our services, we may
              collect information such as your username, email address,
              profile information, booking information, and other
              information that you voluntarily provide.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
              3. How We Use Your Information
            </h2>

            <p>
              We may use the information we collect to create and manage
              your account, provide vehicle rental services, process
              bookings, communicate with you, improve our website, and
              maintain the security of our services.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
              4. Google Authentication
            </h2>

            <p>
              If you choose to sign in using Google, we may receive
              information provided by Google, such as your name, email
              address, and profile picture, according to the permissions
              and settings associated with your Google account.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
              5. Information Security
            </h2>

            <p>
              We take reasonable measures to protect your information
              from unauthorized access, alteration, disclosure, or
              destruction. However, no online service can guarantee
              complete security.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
              6. Third-Party Services
            </h2>

            <p>
              Our application may use third-party services for
              authentication, payments, hosting, analytics, or other
              functionality. These services may process information
              according to their own privacy policies.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
              7. Cookies and Local Storage
            </h2>

            <p>
              Our website may use cookies, browser storage, or similar
              technologies to maintain authentication sessions, store
              preferences, and improve the user experience.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
              8. Your Information
            </h2>

            <p>
              You may update certain account information through your
              account settings. If you have questions about your
              personal information or want to request its removal,
              please contact us.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
              9. Changes to This Privacy Policy
            </h2>

            <p>
              We may update this Privacy Policy from time to time.
              Changes will be reflected on this page along with an
              updated date.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
              10. Contact Us
            </h2>

            <p>
              If you have questions about this Privacy Policy or how
              your information is handled, please contact the Rent a
              Ride team.
            </p>
          </section>

        </div>

        {/* FOOTER LINK */}
        <div className="mt-12 border-t border-gray-200 pt-6 dark:border-gray-800">
          <Link
            to="/"
            className="font-semibold text-green-600 hover:text-green-500"
          >
            Return to Rent a Ride
          </Link>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;