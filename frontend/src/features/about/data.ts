/** Structured resume data for the About page, sourced from the site author's LinkedIn profile. */

export interface ExperienceEntry {
  org: string;
  role: string;
  dateRange: string;
  location?: string;
  description?: string;
  logo?: string;
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    org: "ZS",
    role: "Advanced Data Science Associate",
    dateRange: "November 2025 - Present",
    location: "Bengaluru",
    logo: "/about/logos/zs.svg",
  },
  {
    org: "Epsilon",
    role: "Associate Data Scientist",
    dateRange: "August 2024 - November 2025",
    location: "Bengaluru, Karnataka, India",
    logo: "/about/logos/epsilon.svg",
  },
  {
    org: "Amazon",
    role: "Mentee, Amazon ML Summer School '24",
    dateRange: "July 2024 - August 2024",
    description: "Selected as part of the 4th cohort of the Amazon ML Summer School.",
    logo: "/about/logos/amazon.svg",
  },
  {
    org: "Intemo Technologies Private Limited",
    role: "Data Science Intern",
    dateRange: "March 2024 - May 2024",
    location: "Mumbai, Maharashtra, India",
    description:
      "Designed a custom Levenshtein distance algorithm for character-to-character OCR accuracy scoring against manually typed text, incorporating weighted character and symbol mismatches. Processed unstructured PDF and image data into accuracy metrics and optimal OCR settings recommendations.",
    logo: "/about/logos/intemo.jpg",
  },
  {
    org: "National Institute of Technology, Tiruchirappalli",
    role: "Summer Research Intern",
    dateRange: "May 2023 - July 2023",
    location: "Tiruchirappalli, Tamil Nadu, India",
    description:
      "Researched and developed an algorithm for insider threat detection, to mitigate risks posed by authorized individuals. Advised by Dr. R. Mohan, Dept. of CSE.",
    logo: "/about/logos/nit-trichy.png",
  },
  {
    org: "Coding Ninjas",
    role: "Summer Intern, Technical Content Writer",
    dateRange: "April 2023 - June 2023",
    description:
      "Wrote 15 published articles on Python, web development, operating systems, and sentiment analysis for the Code Studio Resource Vertical.",
    logo: "/about/logos/coding-ninjas.svg",
  },
  {
    org: "ESCP Business School",
    role: "Summer Research Intern",
    dateRange: "June 2022 - August 2022",
    location: "Paris, Ile-de-France, France",
    description:
      "Social Innovation Index and application of new and deep tech in rural scenarios, advised by Dr. Gorgi Krlev (ESCP France) and Dr. Sreevas Sahasranamam (University of Strathclyde).",
    logo: "/about/logos/escp.png",
  },
  {
    org: "National Institute of Technology, Tiruchirappalli",
    role: "Summer Research Intern",
    dateRange: "May 2022 - August 2022",
    location: "Tiruchirappalli, Tamil Nadu, India",
    description:
      "A comparative study of hybrid machine learning approaches for fake news detection, combining multi-stage ensemble learning and an NLP-based framework. Advised by Dr. Selvakumar K, Dept. of CA.",
    logo: "/about/logos/nit-trichy.png",
  },
  {
    org: "Code in Place (Stanford University)",
    role: "Student Trainee",
    dateRange: "April 2021 - May 2021",
    location: "California, United States",
    description:
      "A 5-week introductory Python course based on the first half of Stanford's CS106A. Built a closing project, a \"Who Wants to Be a Millionaire?\" game, later hosted on Stanford's own site.",
    logo: "/about/logos/stanford.svg",
  },
];

export interface EducationEntry {
  org: string;
  degree: string;
  dateRange: string;
  logo?: string;
}

export const EDUCATION: EducationEntry[] = [
  {
    org: "National Institute of Technology, Tiruchirappalli",
    degree: "B.Tech, Metallurgy and Materials Engineering, Minor in Computer Applications",
    dateRange: "July 2020 - May 2024",
    logo: "/about/logos/nit-trichy.png",
  },
  {
    org: "Indian Institute of Technology, Madras",
    degree: "Diploma, Data Science and Programming",
    dateRange: "January 2022 - August 2025",
    logo: "/about/logos/iit-madras.svg",
  },
];

export const SKILLS = ["Amazon Web Services (AWS)", "Web Development", "AWS SageMaker"];

export const CERTIFICATIONS = [
  "Data Analyst with Python, Career Track",
  "SQL for Data Science",
  "Python (Basics)",
  "Python Data Structures",
];

export const HONORS = [
  "1st Rank, SURV-X-CEL",
  "1st Rank, Space-O-Analytics",
  "Winner, The PAN BS AI-ML Hackathon",
];

export interface PublicationEntry {
  title: string;
  url?: string;
}

export const PUBLICATIONS: PublicationEntry[] = [
  {
    title:
      "A Comparative Study of Hybrid Machine Learning Approaches for Fake News Detection that Combine Multi-Stage Ensemble Learning and NLP-Based Framework",
    url: "https://www.techrxiv.org/doi/full/10.36227/techrxiv.21856671.v3",
  },
];

export const LANGUAGES = [
  { name: "Hindi", level: "Native or bilingual" },
  { name: "English", level: "Professional working" },
  { name: "Gujarati", level: "Elementary" },
];

export interface ProjectEntry {
  name: string;
  description: string;
  url?: string;
  homepage?: string;
  language: string;
}

export const PROJECTS: ProjectEntry[] = [
  {
    name: "How Models Think",
    description:
      "This site: a visual, plain-language explainer for transformers, RNNs, backpropagation, and how large language models work. FastAPI backend, React and TypeScript frontend.",
    url: "https://github.com/Gaurav1921/how-models-think",
    language: "TypeScript",
  },
  {
    name: "Smart Recruiter AI",
    description:
      "An agentic, RAG-based resume screener that reads resumes the way a human would instead of doing brittle keyword matching, built on Docling, OpenSearch, and Gemini.",
    url: "https://github.com/Gaurav1921/smart-recruiter-ai",
    homepage: "https://smart-recruiter-ai.streamlit.app/",
    language: "Python",
  },
  {
    name: "Pharma Assist",
    description:
      "A conversational AI assistant for pharmaceutical sales reps: answers drug FAQs, summarizes clinical trial data, and personalizes sales pitches, built on LangChain, GPT-4, RAG, and FAISS.",
    language: "Python",
  },
  {
    name: "MovieSage",
    description:
      "A movie recommendation engine combining content-based filtering with Word2Vec embeddings and RNNs, served through a Streamlit app.",
    url: "https://github.com/Gaurav1921/Movie-Recommender-System",
    language: "Python",
  },
  {
    name: "AlphaExtract",
    description:
      "An AI-powered financial intelligence pipeline: downloads SEC 10-K filings, parses them with Docling, runs FinBERT sentiment analysis, and produces ensemble-scored, backtested trading signals.",
    url: "https://github.com/Gaurav1921/AlphaExtract",
    language: "Python",
  },
  {
    name: "Databricks Certification Prep",
    description: "A Databricks certification prep app.",
    url: "https://github.com/Gaurav1921/databricks_platform",
    homepage: "https://databricks-certification-prep.streamlit.app/",
    language: "Python",
  },
  {
    name: "Hostile Ledger",
    description:
      "A web-based financial strategy game for 3 to 10 friends, playable start to finish in under an hour: build a company, grow a Power score across cash, real estate, stock, and rivals, and bluff your way through hostile takeovers.",
    url: "https://github.com/Gaurav1921/Hostile-Ledger-A-Financial-Strategy-Game",
    language: "Python",
  },
  {
    name: "Building ML Models from First Principles",
    description:
      "Classic ML algorithms implemented from scratch rather than imported from a library, to build real intuition for how they work, the same philosophy behind this site.",
    url: "https://github.com/Gaurav1921/Building-ML-Models-from-First-Principles",
    language: "Python",
  },
];
