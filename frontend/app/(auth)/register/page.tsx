"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { register } from "@/services/auth.service";
import Toast from "@/components/Toast";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await register(form);

      setToast({ message: "Registration successful.", type: "success" });

      router.push("/login");
    } catch (error: any) {
      console.error(error);
      const message =
        error?.message ||
        error?.response?.data?.message ||
        "Registration failed.";
      setToast({ message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl overflow-hidden rounded-[32px] bg-white shadow-2xl">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="p-10 sm:p-12">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.4em] text-emerald-500">Create account</p>
              <h1 className="mt-4 text-4xl font-semibold text-slate-900">Join JobBoard today</h1>
              <p className="mt-4 text-slate-600">
                Sign up to post jobs, manage listings, and keep track of applications in one place.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <button
                disabled={loading}
                className="w-full rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Creating account..." : "Register"}
              </button>
            </form>
          {toast ? (
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => setToast(null)}
            />
          ) : null}
          </div>

          <div className="hidden rounded-br-[32px] rounded-tr-[32px] bg-gradient-to-br from-emerald-500 to-sky-600 p-10 text-white lg:block">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.3em]">JobBoard</p>
              <h2 className="text-3xl font-semibold">Get discovered by top employers.</h2>
              <p className="text-slate-100/90 leading-7">
                Create your account and start posting roles, tracking applications, and building your employer brand.
              </p>
              <div className="grid gap-3 pt-6">
                <div className="rounded-3xl bg-white/10 p-4">
                  <p className="text-sm text-slate-200">Fast setup</p>
                  <p className="mt-2 text-lg font-semibold">Complete your profile quickly</p>
                </div>
                <div className="rounded-3xl bg-white/10 p-4">
                  <p className="text-sm text-slate-200">Smart tools</p>
                  <p className="mt-2 text-lg font-semibold">Keep hiring simple</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}