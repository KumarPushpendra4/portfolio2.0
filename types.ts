
export interface Experience {
  role: string;
  company: string;
  location: string;
  duration: string;
  details: string[];
}

export interface Project {
  title: string;
  techStack: string[];
  description: string;
  githubLink?: string;
}

export interface Education {
  institution: string;
  degree: string;
  location: string;
  duration: string;
  score: string;
}

export interface Certification {
  name: string;
  issuer: string;
}
