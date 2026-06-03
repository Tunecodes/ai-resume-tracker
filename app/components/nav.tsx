"use client";

import { useState } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md text-white">
      {/* TOP BAR */}
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/dashboard" className="font-semibold text-lg">
          ResumeAI
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-sm text-white/70">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/dashboard/jobs">Jobs</Link>
          <Link href="/dashboard/resume/upload">Upload</Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/resume/upload"
            className="hidden sm:inline bg-white text-black px-4 py-1.5 rounded-full text-sm font-medium"
          >
            Upload
          </Link>

          <UserButton />

          {/* Hamburger (mobile only) */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white text-2xl ml-2"
          >
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-black px-4 py-4 space-y-3">
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="block text-white/80 hover:text-white"
          >
            Dashboard
          </Link>

          <Link
            href="/dashboard/jobs"
            onClick={() => setOpen(false)}
            className="block text-white/80 hover:text-white"
          >
            Jobs
          </Link>

          <Link
            href="/dashboard/resume/upload"
            onClick={() => setOpen(false)}
            className="block text-white/80 hover:text-white"
          >
            Upload Resume
          </Link>
        </div>
      )}
    </nav>
  );
}
