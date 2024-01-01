export function SIMPLE_RESUME_PROMPT(resume) { `Create a cover letter for this resume\nResume:\n\n${resume}\n\nCover Letter:\n\n` }

export function RESUME_JOB_DESC_PROMPT(job_desc, resume) {
return `Create a cover letter tailored to the provided job-description using information from the resume.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Job Description:
${job_desc}


~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Resume:
${resume}
`
}