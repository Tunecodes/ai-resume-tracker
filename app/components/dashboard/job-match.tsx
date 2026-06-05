export default function JobMatch({
  title,
  match,
}: {
  title: string;
  match: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-zinc-800 p-3">
      <span>{title}</span>
      <span className="font-semibold text-green-400">{match}</span>
    </div>
  );
}
