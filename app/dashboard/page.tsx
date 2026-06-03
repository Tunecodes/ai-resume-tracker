import { Resume } from "../lib/types";
import ProfileCard from "../components/dashboard/profile-card";
import SkillsSection from "../components/dashboard/skill-section";
import ProjectsSection from "../components/dashboard/project-section";
import JobMatches from "../components/dashboard/job-matches";
import AIInsights from "../components/dashboard/ai-panel";
import Navbar from "../components/nav";

// mock data for now (replace with DB fetch later)
const resume: Resume = {
  id: "1",
  file_name: "resume.pdf",
  parsed_json: {
    name: "Tun Lin Naine",
    skills: ["React", "Node.js", "PostgreSQL"],
    education: [{ school: "UMass Amherst", degree: "CS" }],
    projects: [{ name: "Resume AI", description: "AI resume parser" }],
  },
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-3 gap-6">
        {/* LEFT MAIN */}
        <div className="col-span-2 space-y-6">
          <ProfileCard resume={resume} />
          <SkillsSection skills={resume.parsed_json.skills || []} />
          <ProjectsSection projects={resume.parsed_json.projects || []} />
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">
          <JobMatches skills={resume.parsed_json.skills || []} />
          <AIInsights />
        </div>
      </div>
    </div>
  );
}
