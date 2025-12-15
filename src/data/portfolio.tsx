import React from 'react';
import { FaGoogle, FaFilePdf, FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa6";

export interface Link {
  icon?: React.ReactNode;
  label: string;
  url: string;
}

export interface NewsItem {
  date: string;
  content: string;
}

export interface DiagramTopic {
  id: string;
  label: string;
  color: string;
}

export interface DiagramPointer {
  items: { label: string; targetId: string }[];
  topicIds: string[]; // ['ai', 'design']
  angleOffset?: number; // Degrees to rotate the elbow
  distanceOffset?: number; // Additional length for elbow radius
}

export interface WorkExperience {
  company: string;
  role: string;
  duration: string;
  description: string;
  image?: string; 
}

export interface ResearchExperience {
  institution: string;
  role: string;
  duration: string;
  description: string;
  image?: string;
}

export interface Project {
  name: string;
  description: string;
  link?: string;
  links?: { label: string; url: string }[];
  image?: string;
  authors?: React.ReactNode;
  date?: string;
  venue?: string; 
}

export interface Publication {
  id: string; // Added for scrolling
  title: string;
  authors: React.ReactNode; 
  venue: string;
  abstract: string;
  links: { label: string; url: string }[];
}


export const portfolioData = {
  sidebar: {
    profile: {
      name: "Jane Doe",
      title: "Software Engineer\nTech Institute\nDepartment of Innovation",
    },
    contact: [
      "jane.doe [at] tech.institute.edu",
      "Innovation Lab, Building 42",
      "123 Tech Avenue",
      "San Francisco, CA 94107"
    ],
    links: [
      { label: "Google Scholar", url: "#", icon: <FaGoogle className="text-blue-500" /> },
      { label: "Resume / CV", url: "#", icon: <FaFilePdf className="text-red-500" /> },
      { label: "GitHub", url: "#", icon: <FaGithub /> },
      { label: "Twitter / X", url: "#", icon: <FaTwitter className="text-blue-400" /> },
      { label: "LinkedIn", url: "#", icon: <FaLinkedin className="text-blue-700" /> },
    ] as Link[],
    news: [
      { date: "Mar '25", content: "Project Alpha featured in Tech Weekly" },
      { date: "Jan '25", content: "Joined the Open Source Committee" },
      { date: "Sep '24", content: "Started new role at Tech Corp" },
    ] as NewsItem[]
  },
  main: {
    bio: [
      "Hi there! 👋 I am a Software Engineer at the Innovation Lab in 🏰 Tech Institute, working on cutting-edge solutions. My work is supported by the 🚀 Future Tech Grant. Previously, I interned at 🔺 OmniCorp and 📹 Visionary AI, and received my B.S. in Computer Science from 💧 State University.",
      "Outside of engineering, I enjoy photography 📸 and hiking 🏔️."
    ],
    interests: "My current interests focus on artificial intelligence, distributed systems, and human-computer interaction, specifically in the context of scalable applications.",
    
    diagram: {
      topics: [
        { id: "ai", label: "AI", color: "#FFD6A5" },
        { id: "design", label: "Design", color: "#FFADAD" },
        { id: "systems", label: "Systems", color: "#A0C4FF" },
        { id: "web", label: "Web", color: "#CAFFBF" },
        { id: "data", label: "Data", color: "#FFC6FF" },
      ] as DiagramTopic[],
      pointers: [
        { 
          topicIds: ["ai", "design"],
          items: [
             { label: "Smart Interfaces, CHI '24", targetId: "pub-smart-interfaces" },
             { label: "Adaptive UI", targetId: "proj-adaptive-ui" }
          ]
        },
        { 
          topicIds: ["ai", "data"],
          items: [{ label: "Data Insight, KDD '23", targetId: "pub-data-insight" }]
        },
        { 
           topicIds: ["design", "web"],
           items: [{ label: "Web Accessibility, UIST '23", targetId: "pub-web-accessibility" }],
           angleOffset: -10
        },
        { 
           topicIds: ["systems"],
           items: [{ label: "Scalable Backend", targetId: "proj-scalable-backend" }],
           angleOffset: 10,
           distanceOffset: 20
        },
        { 
           topicIds: ["data", "web"],
           items: [{ label: "Visual Analytics", targetId: "proj-visual-analytics" }]
        },
        { 
           topicIds: ["ai", "systems"],
           items: [{ label: "Distributed ML, NeurIPS '24", targetId: "pub-distributed-ml" }]
        },
      ] as DiagramPointer[]
    },

    workExperience: [
      {
        company: "Tech Corp",
        role: "Software Engineer Intern",
        duration: "Summer 2023",
        description: "Developed a new feature for the main product that increased user engagement by 15%. Collaborated with the design team to implement a responsive UI.",
        image: "https://placehold.co/100x100/EEE/31343C"
      },
      {
        company: "Startup Inc",
        role: "Full Stack Developer",
        duration: "2021 - 2022",
        description: "Built and maintained multiple web applications using React and Node.js. Optimized database queries to improve performance.",
        image: "https://placehold.co/100x100/EEE/31343C"
      }
    ] as WorkExperience[],

    researchExperience: [
      {
        institution: "Innovation Lab",
        role: "Research Assistant",
        duration: "2023 - Present",
        description: "Conducting research on human-AI collaboration. Designed and ran user studies to evaluate the effectiveness of AI-assisted tools.",
        image: "https://placehold.co/100x100/EEE/31343C"
      },
      {
        institution: "State University",
        role: "Undergraduate Researcher",
        duration: "2021 - 2023",
        description: "Investigated algorithms for distributed systems. Published a paper in a student conference.",
        image: "https://placehold.co/100x100/EEE/31343C"
      }
    ] as ResearchExperience[],
    
    publications: [
      {
        id: "pub-smart-interfaces",
        title: "Generative Interfaces for Enhanced User Experience",
        authors: <><b>Jane Doe</b>, John Smith, Alice Johnson</>,
        venue: "CHI 2024",
        abstract: "This paper explores how generative models can dynamically adapt user interfaces to individual preferences, improving engagement and usability scores by 40%.",
        links: [
          { label: "PDF", url: "#" },
          { label: "Code", url: "#" },
          { label: "Project Page", url: "#" }
        ]
      },
      {
        id: "pub-distributed-ml",
        title: "Optimizing Distributed Machine Learning Training",
        authors: <>Alice Johnson, <b>Jane Doe</b>, Bob Williams</>,
        venue: "NeurIPS 2024",
        abstract: "We propose a novel gradient compression technique that reduces communication overhead in distributed training clusters by up to 60% without accuracy loss.",
        links: [
           { label: "PDF", url: "#" },
           { label: "Code", url: "#" }
        ]
      },
      {
         id: "pub-web-accessibility",
         title: "Automated Accessibility Auditing for Modern Web Apps",
         authors: <><b>Jane Doe</b>, Emily Davis</>,
         venue: "UIST 2023",
         abstract: "A tool that integrates with CI/CD pipelines to automatically detect and suggest fixes for WCAG compliance issues in React applications.",
         links: [
            { label: "PDF", url: "#" },
            { label: "Tool", url: "#" }
         ]
      },
      {
        id: "pub-data-insight",
        title: "Unsupervised Anomaly Detection in High-Dimensional Data",
        authors: <>Michael Brown, <b>Jane Doe</b></>,
        venue: "KDD 2023",
        abstract: "Introducing a density-based clustering approach to identify outliers in streaming sensor data with minimal latency.",
        links: [
          { label: "PDF", url: "#" }
        ]
      }
    ] as Publication[],

    projects: [
      {
        name: "Scalable Backend Infrastructure",
        description: "Designed and implemented a microservices architecture handling 1M+ concurrent users. Utilized Kubernetes and Go for high performance.",
        image: "https://placehold.co/600x400/EEE/31343C",
        date: "2023 - Present",
        links: [
          { label: "Architecture Blog", url: "#" }
        ]
      } as Project,
      {
        name: "EcoTrack Mobile App",
        description: "A cross-platform mobile application that helps users track their carbon footprint. Built with React Native and Firebase.",
        image: "https://placehold.co/600x400/EEE/31343C",
        date: "2022",
        links: [
          { label: "App Store", url: "#" },
          { label: "Website", url: "#" }
        ]
      } as Project,
      {
        name: "Visual Analytics Dashboard",
        description: "An interactive dashboard for visualizing complex financial datasets. Features real-time updates and custom filtering logic.",
        image: "https://placehold.co/600x400/EEE/31343C",
        date: "2023",
        links: [
          { label: "Demo", url: "#" }
        ]
      } as Project
    ]
  }
};
