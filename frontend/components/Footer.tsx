import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid md:grid-cols-3 gap-8">

          <div>
            <h2 className="text-2xl font-bold">
              JobBoard
            </h2>

            <p className="text-gray-400 mt-3">
              Find your dream job and connect with top companies.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">
              Quick Links
            </h3>

            <div className="flex flex-col gap-2">
              <Link href="/">Home</Link>
              <Link href="/job">Jobs</Link>
              <Link href="/login">Login</Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">
              Contact
            </h3>

            <p>Email: support@jobboard.com</p>
            <p>Hyderabad, India</p>
          </div>

        </div>

        <hr className="my-8 border-gray-700" />

        <p className="text-center text-gray-400">
          © {new Date().getFullYear()} JobBoard. All rights reserved.
        </p>

      </div>
    </footer>
  );
}