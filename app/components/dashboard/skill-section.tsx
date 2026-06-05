// app/dashboard/components/SkillsSection.tsx

type SkillsSectionProps = {
  skills: string[];
};

export default function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
      <h2 className="mb-4 text-lg font-semibold">Skills</h2>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-violet-500/20 px-3 py-1 text-sm text-violet-300"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
