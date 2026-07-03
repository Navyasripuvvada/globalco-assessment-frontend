"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useauth";

export default function Navbar() {
  const { user, isAuthenticated, handleLogout } = useAuth();

  return (
    <nav className="sticky top-0 z-30 w-full border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="text-xl font-semibold tracking-tight text-slate-900">
          JobBoard
        </Link>

        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-700">
          {isAuthenticated && (
            <Link href="/job" className="rounded-full px-3 py-2 transition hover:bg-slate-100 hover:text-blue-600">
              Jobs
            </Link>
          )}

          {isAuthenticated && (
            <Link
              href="/job/create"
              className="rounded-full px-3 py-2 transition hover:bg-slate-100 hover:text-blue-600"
            >
              Post Job
            </Link>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {!isAuthenticated ? (
            <>
              <Link href="/login" className="text-sm font-medium text-slate-700 transition hover:text-blue-600">
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm text-slate-600">{user?.email}</span>
              <button
                onClick={handleLogout}
                className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}