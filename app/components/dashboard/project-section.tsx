export default function ProjectsSection({
  projects,
}: {
  projects: { name: string; description?: string }[];
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-3">Projects</h2>

      <div className="space-y-3">
        {projects.map((p) => (
          <div key={p.name} className="border p-3 rounded-lg">
            <p className="font-medium">{p.name}</p>
            <p className="text-sm text-gray-500">
              {p.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
