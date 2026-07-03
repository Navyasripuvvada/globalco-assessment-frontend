import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <main className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <section>
            <p className="text-sm uppercase tracking-[0.35em] text-sky-400">JobBoard</p>
            <h1 className="mt-6 text-5xl font-semibold leading-tight sm:text-6xl">
              See our career opportunities — sign in first to view and apply.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Create an account or login to unlock the full job board. Only registered users can browse listings and submit applications.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/register"
                className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-400"
              >
                Get Started
              </Link>
              <Link
                href="/login"
                className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Login
              </Link>
            </div>
          </section>

          <section className="rounded-[32px] bg-white/5 p-10 ring-1 ring-white/10 shadow-2xl">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Why register?</p>
            <div className="mt-8 space-y-6 text-slate-200">
              <div>
                <h2 className="text-xl font-semibold text-white">Browse exclusive jobs</h2>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Only authenticated users can view current openings and application details.
                </p>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Apply with confidence</h2>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Register once and apply for jobs without leaving the platform.
                </p>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Manage your experience</h2>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Secure login keeps your application flow protected and ready for the next opportunity.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
