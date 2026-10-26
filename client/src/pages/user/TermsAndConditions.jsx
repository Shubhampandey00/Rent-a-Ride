import { Link } from "react-router-dom";

const TermsAndConditions = () => {
  return (
    <div className="max-w-5xl mx-auto px-5 py-12 text-slate-800">
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Terms & Conditions
        </h1>

        <p className="text-sm text-slate-500 mb-8">
          Last updated: August 30, 2026
        </p>

        <section className="mb-6">
          <h2 className="text-xl font-bold mb-3">1. Acceptance of Terms</h2>
          <p>
            By using Rent a Ride, you agree to follow these Terms & Conditions.
            If you do not agree with these terms, please do not use the website.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-bold mb-3">2. User Account</h2>
          <p>
            You are responsible for providing accurate information when creating
            an account and for keeping your account information secure.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-bold mb-3">3. Vehicle Rental</h2>
          <p>
            Users must provide correct information when making a vehicle rental
            request. Vehicle availability, rental conditions, and other details
            may depend on the vehicle owner or vendor.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-bold mb-3">4. User Responsibilities</h2>
          <p>
            Users must use the website and rented vehicles responsibly and must
            not use the platform for illegal or unauthorized activities.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-bold mb-3">5. Payments and Charges</h2>
          <p>
            Any rental charges, deposits, or other applicable fees will be
            determined according to the rental agreement and the information
            provided by the vehicle owner or vendor.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-bold mb-3">6. Prohibited Activities</h2>
          <p>
            Users must not attempt to misuse the platform, access another
            user's account, provide false information, or interfere with the
            normal operation of the website.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-bold mb-3">7. Changes to These Terms</h2>
          <p>
            Rent a Ride may update these Terms & Conditions when necessary.
            Updated terms will be posted on this page.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">8. Contact</h2>
          <p>
            If you have questions about these Terms & Conditions, please
            contact the Rent a Ride team.
          </p>
        </section>

        <Link
          to="/"
          className="inline-block bg-green-500 text-white px-5 py-2 rounded-md hover:bg-green-600"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default TermsAndConditions;