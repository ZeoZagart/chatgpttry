import {ABHASH_RESUME_1} from "./resumes.js";
import {GOOGLE_JOB_DESC_1} from "./job_desc.js";
import {RESUME_JOB_DESC_PROMPT, SIMPLE_RESUME_PROMPT} from "./prompt.js";


const examples = [
    {
        resume: ABHASH_RESUME_1,
        job_desc: ``,
        prompt: SIMPLE_RESUME_PROMPT,
        output: {
            id: 'cmpl-6TqSP6tWvZiX0UfF43UIF2ISk1xLW',
            object: 'text_completion',
            created: 1672571177,
            model: 'text-davinci-003',
            choices: [
                {
                    text: "\nDear Hiring Manager,\n\nI am writing to apply for the position of Backend Engineer in your big tech company. With my Bachelor's degree in Computer Science from the Indian Institute of Technology, Ropar and my experience as a Software Engineer 2 at Coinbase and Flock (Directi), I believe I am well-suited for this role.\n\nAt Coinbase, I was the tech lead for Finhub asset addition improvements, reducing the engineering time to Finhub addition for new blockchains from 3 weeks to 1 week and new tokens from 1 week to 2 days. This had a significant impact on Coinbase's revenue, as newly listed assets contributed to more than 100 MM USD. I was also the tech lead for Coinbase assets Japan launch, making changes to Coinbase's internal systems to meet Japan's regulatory compliance policies.\n\nAt Flock (Directi), I owned some internal microservices, worked on Titan's Partner panel, and developed features for Flock-Messenger and TitanMail app. I also worked on improving ad click-through rate at Media.Net (Directi), leading to 8% CTR increase on test data.\n\nI have also worked on several projects, such as MyCity: PhotoSharing App, parts of blockchain, Face Movement Generation, and Natural Question Answering Using Bert.\n\nI am confident that my education and experience make me an ideal candidate for this position. I look forward to discussing my qualifications in more detail.\n\nThank you for your time and consideration.\n\nSincerely,\n[Your Name]",
                    index: 0,
                    logprobs: null,
                    finish_reason: 'stop',
                },
            ],
            usage: {
                prompt_tokens: 712,
                completion_tokens: 319,
                total_tokens: 1031,
            },
        },
    },
    {
        resume: ABHASH_RESUME_1,
        job_desc: GOOGLE_JOB_DESC_1,
        prompt: RESUME_JOB_DESC_PROMPT,
        output: {
            id: 'cmpl-6TqibAjoGSLvcZ7RGJLffY7zexJnk',
            object: 'text_completion',
            created: 1672572181,
            model: 'text-davinci-003',
            choices: [
                {
                    text: 'Dear Hiring Manager,\n\nI am writing to apply for the Software Engineer position at Google Cloud. With my Bachelor’s degree in Computer Science and five years of experience in software development, I am confident that I am the ideal candidate for this role.\n\nMy experience in software development includes working with software products, testing, maintaining, and launching them. I have also had experience with software design and architecture, and I have a strong understanding of data structures and algorithms. I have also had experience in a technical leadership role, and I am familiar with developing accessible technologies.\n\nI am also experienced in managing project priorities, deadlines, and deliverables. I have experience in designing, developing, testing, deploying, maintaining, and enhancing software solutions. My experience in software engineering also includes working with information retrieval, distributed computing, large-scale system design, networking and data storage, security, artificial intelligence, natural language processing, UI design and mobile.\n\nI am excited to bring my experience and knowledge to Google Cloud and help the company continue to push technology forward. I am confident that I am the ideal candidate for this role and I look forward to discussing my qualifications further.\n\nSincerely,\n[Your Name]',
                    index: 0,
                    logprobs: null,
                    finish_reason: 'stop',
                },
            ],
            usage: {
                prompt_tokens: 1400,
                completion_tokens: 249,
                total_tokens: 1649,
            },
        },
    },
];
