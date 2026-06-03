import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="flex justify-between p-4 border-b bg-black">
      <Link href="/dashboard">ResumeAI</Link>

      <div className="flex items-center gap-4">
        <Link href="/dashboard/resume/upload">Upload</Link>
        <UserButton />
      </div>
    </nav>
  );
}
