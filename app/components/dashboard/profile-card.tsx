import { Resume } from "@/lib/types";

export default function ProfileCard({ resume }: { resume: Resume }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold">
        {resume.parsed_json.name || "No Name Found"}
      </h1>

      <p className="text-gray-500 mt-1">
        Uploaded: {resume.file_name}
      </p>
    </div>
  );
}
