import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function AppliedPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl rounded-[32px] bg-white p-10 shadow-2xl">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <CheckCircle2 className="h-10 w-10" />
          </div>

          <h1 className="text-4xl font-semibold text-slate-900">Application Submitted</h1>
          <p className="max-w-xl text-lg leading-8 text-slate-600">
            Your application has been submitted successfully. We will review your details and contact you soon with next steps.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/job"
              className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Back to Jobs
            </Link>
            <Link
              href="/"
              className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
