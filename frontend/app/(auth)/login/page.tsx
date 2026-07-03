"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth.service";
import Toast from "@/components/Toast";

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const [form, setForm] = useState({
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

      const data = await login(form);

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      window.dispatchEvent(new Event("authChanged"));

      setToast({ message: "Login successful.", type: "success" });

      router.push("/job");
    } catch (error) {
      console.error(error);
      setToast({ message: "Invalid email or password.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-xl overflow-hidden rounded-[32px] bg-white shadow-2xl">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="p-10 sm:p-12">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.4em] text-sky-500">Welcome back</p>
              <h1 className="mt-4 text-4xl font-semibold text-slate-900">Login to your account</h1>
              <p className="mt-4 text-slate-600">
                Access your dashboard, manage your jobs, and continue your job search with ease.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Enter your email"
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
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Enter your password"
                />
              </div>

              <button
                disabled={loading}
                className="w-full rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Logging in..." : "Login"}
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

          <div className="hidden rounded-br-[32px] rounded-tr-[32px] bg-gradient-to-br from-sky-600 to-indigo-700 p-10 text-white lg:block">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.3em]">Job Board</p>
              <h2 className="text-3xl font-semibold">Find the right opportunity faster.</h2>
              <p className="text-slate-100/90 leading-7">
                Keep your profile and saved roles organized, then return to what matters most: a better career.
              </p>
              <div className="grid gap-3 pt-6">
                <div className="rounded-3xl bg-white/10 p-4">
                  <p className="text-sm text-slate-200">Save time</p>
                  <p className="mt-2 text-lg font-semibold">One central dashboard</p>
                </div>
                <div className="rounded-3xl bg-white/10 p-4">
                  <p className="text-sm text-slate-200">Stay focused</p>
                  <p className="mt-2 text-lg font-semibold">Easy job browsing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}