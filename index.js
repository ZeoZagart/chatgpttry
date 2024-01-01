import {GOOGLE_JOB_DESC_1} from "./contants/job_desc.js";
import {ABHASH_RESUME_1} from "./contants/resumes.js";
import {RESUME_JOB_DESC_PROMPT} from "./contants/prompt.js";

const job_desc = GOOGLE_JOB_DESC_1;
const resume = ABHASH_RESUME_1;
const prompt = RESUME_JOB_DESC_PROMPT(job_desc, resume);

console.log(prompt)





