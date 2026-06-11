import { ai } from "../gemini";
import { getResume } from "../utility";

export async function getResumeScore() {
  //get both the text and parsejson resume
  const { rawText, parsedJson } = await getResume();

  //turn the json into string
  const resumeJsonString =
    typeof parsedJson === "string"
      ? parsedJson
      : JSON.stringify(parsedJson, null, 2);

  //get score of the resume
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: {
      role: "user",
      parts: [
        {
          text: `Act as an expert ATS (Applicant Tracking System) algorithm and resume auditor. I am going to provide the parsed JSON output of my resume. Analyze this data and provide an ATS readiness score out of 100 based on the following strict criteria:
          
1. Data Integrity: Did the parser correctly separate my contact info, education, experience, and skills without breaking or mixing text?
2. Quantifiable Impact: Do the experience descriptions include measurable metrics and outcomes, or are they just task lists?
3. Action Verbs: Are the sentences starting with strong, varied action verbs?
4. Formatting Vulnerabilities: Based on how the text parsed, are there any weird characters, missing dates, or formatting gaps?

Here is the JSON data:
${resumeJsonString}

Only give the score, do not give summary and other informations`,
        },
      ],
    },
  });

  return response.text;
}

//function fetch resume score from api wtih retries
export async function fetchScore(retries = 3) {
  for (let i = 0; i < retries; i++) {
    const res = await fetch("/api/dashboard/resume-score");
    if (res.ok) return res.json();
    if (res.status < 500) {
      throw new Error(`request failed: ${res.status}`);
    }

    await new Promise((r) => setTimeout(r, 1000 * (i * 1)));
  }
  throw new Error("failed to fetch resume score");
}
