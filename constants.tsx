
import React from 'react';
import { 
  Code2, 
  Layers, 
  Database, 
  Server, 
  Layout, 
  Cpu, 
  GitBranch, 
  Terminal,
  Search,
  Cloud,
  ShieldCheck,
  MessageSquare
} from 'lucide-react';
import { Experience, Project, Education, Certification } from './types';

export const PERSONAL_INFO = {
  name: "Pankaj Kumar",
  email: "krm.pankaj.07@gmail.com",
  phone: "+91-9006886481",
  linkedin: "https://linkedin.com",
  summary: "Full-Stack Developer with 3+ years of experience in developing scalable web applications and managing end-to-end project lifecycles using C#, .NET, Angular, and SQL. Expertise in designing secure, efficient systems and deploying features that improve performance and user experience."
};

export const SKILLS = [
  { name: "C#", icon: <Code2 className="w-6 h-6" /> },
  { name: ".Net Core", icon: <Server className="w-6 h-6" /> },
  { name: "Angular", icon: <Layout className="w-6 h-6" /> },
  { name: "SQL Server", icon: <Database className="w-6 h-6" /> },
  { name: "TypeScript", icon: <Layers className="w-6 h-6" /> },
  { name: "Azure", icon: <Cloud className="w-6 h-6" /> },
  { name: "Microservices", icon: <Cpu className="w-6 h-6" /> },
  { name: "Postman", icon: <MessageSquare className="w-6 h-6" /> },
  { name: "Git", icon: <GitBranch className="w-6 h-6" /> },
  { name: "API Testing", icon: <ShieldCheck className="w-6 h-6" /> },
  { name: "JavaScript", icon: <Terminal className="w-6 h-6" /> },
  { name: "Unit Testing", icon: <Search className="w-6 h-6" /> }
];

export const EXPERIENCES: Experience[] = [
  {
    role: "Full Stack Engineer",
    company: "Persistent System",
    location: "Pune, India",
    duration: "04/2025 – Present",
    details: [
      "Developed and maintained insurance domain applications using .NET Core, MVC, Web API, and SQL Server.",
      "Implemented secure and scalable backend solutions with role-based authentication and error handling."
    ]
  },
  {
    role: ".NET Developer",
    company: "Dreamline Technologies Private Ltd",
    location: "Bihar, India",
    duration: "10/2023 – 02/2025",
    details: [
      "Developed a comprehensive solution for the Government of Bihar (Biada) using .NET and C#.",
      "Integrated SQL Server for efficient database management and performed robust API testing using Postman."
    ]
  },
  {
    role: "Full-Stack Developer",
    company: "SOTI India Private Ltd",
    location: "Gurgaon, India",
    duration: "08/2022 – 09/2023",
    details: [
      "Developed SOTI SNAP: a tool using ASP.NET and Angular for secure management of configuration keys.",
      "Integrated OneLogin for SSO and built utilities for service setup, reducing deployment time by 20%."
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    title: "Dating App",
    techStack: ["C#", "ASP.NET", "Angular", "SQL", "Typescript", "Bootstrap"],
    description: "Features login, user authentication, photo upload, profile matching, real-time messaging, and online status indicators.",
    githubLink: "#"
  }
];

export const EDUCATION: Education[] = [
  {
    institution: "Vellore Institute of Technology",
    degree: "Master of Computer Application",
    location: "Vellore, Tamil Nadu",
    duration: "08/2020 - 07/2022",
    score: "CGPA: 7.99"
  },
  {
    institution: "Sai Nath University",
    degree: "Bachelor of Computer Application",
    location: "Ranchi, Jharkhand",
    duration: "08/2017 - 07/2020",
    score: "Percentage: 84.59%"
  }
];

export const CERTIFICATIONS: Certification[] = [
  { name: "Programming in C#", issuer: "LinkedIn" },
  { name: "ASP.NET And Angular", issuer: "Udemy" }
];
