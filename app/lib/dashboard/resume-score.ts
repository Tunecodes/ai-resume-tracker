import { ai } from "../gemini";
import { getResume } from "../utility";

const {rawText, parsedJson} = await getResume();
const score = await
