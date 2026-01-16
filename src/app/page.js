"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">Smart Health Kiosk</h1>
      <p className="text-gray-500">
        Monitor and track your health records securely
      </p>

      <div className="flex gap-4">
        <Link href="/login" className="btn-primary px-6 py-2">
          Sign In
        </Link>
        <Link href="/register" className="border px-6 py-2 rounded-lg">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
