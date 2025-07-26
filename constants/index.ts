export const resumes: Resume[] = [
    {
        id: "1",
        companyName: "Google",
        jobTitle: "Frontend Developer",
        imagePath: "/assets/public/images/resume_01.png",
        resumePath: "/resumes/resume-1.pdf",
        feedback: {
            overallScore: 85,
            ATS: {
                score: 90,
                tips: [],
            },
            toneAndStyle: {
                score: 90,
                tips: [],
            },
            content: {
                score: 90,
                tips: [],
            },
            structure: {
                score: 90,
                tips: [],
            },
            skills: {
                score: 90,
                tips: [],
            },
        },
    },
    {
        id: "2",
        companyName: "Microsoft",
        jobTitle: "Cloud Engineer",
        imagePath: "/assets/public/images/resume_02.png",
        resumePath: "/resumes/resume-2.pdf",
        feedback: {
            overallScore: 55,
            ATS: {
                score: 90,
                tips: [],
            },
            toneAndStyle: {
                score: 90,
                tips: [],
            },
            content: {
                score: 90,
                tips: [],
            },
            structure: {
                score: 90,
                tips: [],
            },
            skills: {
                score: 90,
                tips: [],
            },
        },
    },
    {
        id: "3",
        companyName: "Apple",
        jobTitle: "iOS Developer",
        imagePath: "/assets/public/images/resume_03.png",
        resumePath: "/resumes/resume-3.pdf",
        feedback: {
            overallScore: 75,
            ATS: {
                score: 90,
                tips: [],
            },
            toneAndStyle: {
                score: 90,
                tips: [],
            },
            content: {
                score: 90,
                tips: [],
            },
            structure: {
                score: 90,
                tips: [],
            },
            skills: {
                score: 90,
                tips: [],
            },
        },
    },
    {
        id: "4",
        companyName: "Google",
        jobTitle: "Frontend Developer",
        imagePath: "/assets/public/images/resume_01.png",
        resumePath: "/resumes/resume-1.pdf",
        feedback: {
            overallScore: 85,
            ATS: {
                score: 90,
                tips: [],
            },
            toneAndStyle: {
                score: 90,
                tips: [],
            },
            content: {
                score: 90,
                tips: [],
            },
            structure: {
                score: 90,
                tips: [],
            },
            skills: {
                score: 90,
                tips: [],
            },
        },
    },
    {
        id: "5",
        companyName: "Microsoft",
        jobTitle: "Cloud Engineer",
        imagePath: "/assets/public/images/resume_02.png",
        resumePath: "/resumes/resume-2.pdf",
        feedback: {
            overallScore: 55,
            ATS: {
                score: 90,
                tips: [],
            },
            toneAndStyle: {
                score: 90,
                tips: [],
            },
            content: {
                score: 90,
                tips: [],
            },
            structure: {
                score: 90,
                tips: [],
            },
            skills: {
                score: 90,
                tips: [],
            },
        },
    },
    {
        id: "6",
        companyName: "Apple",
        jobTitle: "iOS Developer",
        imagePath: "/assets/public/images/resume_03.png",
        resumePath: "/resumes/resume-3.pdf",
        feedback: {
            overallScore: 75,
            ATS: {
                score: 90,
                tips: [],
            },
            toneAndStyle: {
                score: 90,
                tips: [],
            },
            content: {
                score: 90,
                tips: [],
            },
            structure: {
                score: 90,
                tips: [],
            },
            skills: {
                score: 90,
                tips: [],
            },
        },
    },
];

export const AIResponseFormat = `
      interface Feedback {
      overallScore: number; //max 100
      ATS: {
        score: number; //rate based on ATS suitability
        tips: {
          type: "good" | "improve";
          tip: string; //give 3-4 tips
        }[];
      };
      toneAndStyle: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
        }[]; //give 3-4 tips
      };
      content: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
        }[]; //give 3-4 tips
      };
      structure: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
        }[]; //give 3-4 tips
      };
      skills: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
        }[]; //give 3-4 tips
      };
    }`;

export const prepareInstructions = ({
  jobTitle,
  jobDescription,
}: {
  jobTitle: string;
  jobDescription: string;
}) => `
You are an expert in ATS (Applicant Tracking Systems), resume analysis, and recruitment.

Analyze the resume **strictly for the job title "${jobTitle}"**, and provide a detailed evaluation using the format below.

Be honest and critical—assign low scores where necessary. Your goal is to help the user improve. If the resume lacks relevance or quality, reflect it in your scoring and tips.

Use the job description **only as supporting context**. Do not copy it or the resume into your response.

Job Title: ${jobTitle}  
Job Description (trimmed): ${jobDescription.slice(0, 500)}

Scoring must follow this format:
${AIResponseFormat}

🧠 Rules:
- Output must be **valid JSON only**. No extra text, markdown, or comments.
- Do not include backticks or formatting.
- Keep output **under ~1400 tokens**.
- Provide 3–4 total tips per section.
- Prioritize impactful insights. Truncate or skip tips if necessary.
`;
