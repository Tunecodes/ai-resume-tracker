import Card from "./card";
import JobMatch from "./job-match";

export default function JobMatches() {
  return (
    <Card title="Job Matches">
      <div className="space-y-3">
        <JobMatch title="Software Engineer Intern" match="88%" />

        <JobMatch title="Full Stack Developer" match="84%" />

        <JobMatch title="Backend Developer" match="79%" />
      </div>
    </Card>
  );
}
