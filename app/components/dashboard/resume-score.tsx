"use client";

import { useEffect, useState } from "react";

function useResumeScore() {
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchScore(retries = 3) {
      for (let i = 0; i < retries; i++) {
        const res = await fetch("/api/dashboard/resume-score");

        if (res.ok) {
          const data = await res.json();
          return data.score;
        }

        if (res.status < 500) {
          throw new Error("Failed to fetch score");
        }

        await new Promise((r) => setTimeout(r, 1000 * (i + 1)));
      }

      throw new Error("Failed after retries");
    }

    async function load() {
      try {
        setLoading(true);
        const result = await fetchScore();
        setScore(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { score, loading, error };
}

export default function ResumeScoreCard() {
  const { score, loading, error } = useResumeScore();

  if (loading) {
    return (
      <div className="p-4 border rounded-lg animate-pulse">
        Loading resume score...
      </div>
    );
  }

  if (error) {
    return <div className="p-4 border rounded-lg text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 border rounded-xl shadow-sm bg-white">
      <h2 className="text-xl font-semibold">Resume Score</h2>

      <p className="text-4xl font-bold mt-2 text-black">{score}%</p>

      <p className="text-sm text-gray-500 mt-1">ATS Ready Analysis</p>
    </div>
  );
}
