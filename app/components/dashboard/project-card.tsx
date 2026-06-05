export default function ProjectCard({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 p-4">
      <h3 className="font-medium">{name}</h3>
      <p className="mt-1 text-sm text-zinc-400">
        {description}
      </p>
    </div>
  );
}
