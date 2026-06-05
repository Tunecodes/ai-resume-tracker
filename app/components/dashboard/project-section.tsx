import Card from "./card";
import ProjectCard from "./project-card";

export default function ProjectsSection() {
  return (
    <Card title="Projects">
      <div className="space-y-4">
        <ProjectCard
          name="ResumeAI"
          description="AI-powered resume analysis platform."
        />

        <ProjectCard
          name="Cough Detection"
          description="Machine learning system for cough classification."
        />
      </div>
    </Card>
  );
}
