import StatCard from "../components/dashboard/state-card";
import ResumeSummary from "../components/dashboard/resume-summary";
import SkillsSection from "../components/dashboard/skill-section";
import JobMatches from "../components/dashboard/job-matches";
import AIInsights from "../components/dashboard/ai-insight";
import ProjectsSection from "../components/dashboard/project-section";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray text-white">
      <div className="mx-auto max-w-7xl p-6 space-y-6">
        <section>
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-zinc-400">
            Track your resume, discover opportunities, and improve your ATS
            score.
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Resume Score" value="82" subtitle="ATS Ready" />

          <StatCard title="Skills Found" value="14" subtitle="Across Resume" />

          <StatCard title="Job Matches" value="27" subtitle="Available" />

          <StatCard title="Projects" value="5" subtitle="Detected" />
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <ResumeSummary />
            <SkillsSection skills={["cooking", "cleaning"]} />
            <ProjectsSection />
          </div>

          <div className="space-y-6">
            <JobMatches />
            <AIInsights />
          </div>
        </section>
      </div>
    </div>
  );
}
