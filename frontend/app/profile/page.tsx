"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Mail, User, Shield } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";


interface UserPayload {
  sub: string;
  email: string;
  exp: number;
  iat: number;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserPayload | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) return;

    try {
      const decoded = jwtDecode<UserPayload>(token);
      setUser(decoded);
    } catch (error) {
      console.error(error);
    }
  }, []);

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center">
        <h2 className="text-3xl font-bold">
          Please Login
        </h2>
      </div>
    );
  }

  return (
    <ProtectedRoute>
    <div className="max-w-4xl mx-auto py-12 px-6">

      <div className="bg-white rounded-2xl shadow-lg p-10">

        <div className="flex items-center gap-6">

          <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">
            {user.email.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1 className="text-4xl font-bold">
              My Profile
            </h1>

            <p className="text-gray-500 mt-2">
              Manage your account information
            </p>
          </div>

        </div>

        <div className="mt-10 space-y-6">

          <div className="flex items-center gap-4 p-4 border rounded-xl">

            <User className="text-blue-600" />

            <div>
              <p className="text-gray-500">User ID</p>
              <h3 className="font-semibold">
                {user.sub}
              </h3>
            </div>

          </div>

          <div className="flex items-center gap-4 p-4 border rounded-xl">

            <Mail className="text-green-600" />

            <div>
              <p className="text-gray-500">Email</p>
              <h3 className="font-semibold">
                {user.email}
              </h3>
            </div>

          </div>

          <div className="flex items-center gap-4 p-4 border rounded-xl">

            <Shield className="text-purple-600" />

            <div>
              <p className="text-gray-500">Authentication</p>
              <h3 className="font-semibold">
                JWT Protected Account
              </h3>
            </div>

          </div>

        </div>

      </div>

    </div>
    </ProtectedRoute>
  );
}