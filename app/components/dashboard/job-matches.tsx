export default function JobMatches({ skills }: { skills: string[] }) {
  const jobs = [
    { title: "Frontend Engineer", match: 85 },
    { title: "Full Stack Developer", match: 78 },
    { title: "Software Engineer", match: 72 },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-3">
        Job Matches
      </h2>

      <div className="space-y-3">
        {jobs.map((job) => (
          <div key={job.title}>
            <div className="flex justify-between text-sm">
              <span>{job.title}</span>
              <span>{job.match}%</span>
            </div>

            <div className="w-full bg-gray-200 h-2 rounded">
              <div
                className="bg-black h-2 rounded"
                style={{ width: `${job.match}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
