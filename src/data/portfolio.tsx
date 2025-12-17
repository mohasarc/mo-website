import React from 'react';
import { FaBehance, FaFilePdf, FaGithub, FaLinkedin, FaUpwork } from "react-icons/fa6";

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
  video?: string;
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
  image?: string;
}


export const portfolioData = {
  sidebar: {
    profile: {
      name: "Mohammed Yaseen",
      title: "Full-Stack Software Engineer\nExperienced white (or glass) boarder",
    },
    contact: [
      "moha.98.1900 [at] gmail.com",
      // "Innovation Lab, Building 42",
      // "123 Tech Avenue",
      // "San Francisco, CA 94107"
    ],
    links: [
      { label: "GitHub", url: "https://github.com/mohasarc", icon: <FaGithub /> },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/mohasy/", icon: <FaLinkedin className="text-blue-700" /> },
      { label: "UpWork", url: "https://freelancerprofilenuxt.mesh.prod.platform.usw2.upwork/freelancers/~01f49cf3f56619fe1d?mp_source=share", icon: <FaUpwork /> },
      { label: "Behance", url: "https://www.behance.net/myds", icon: <FaBehance /> },
      { label: "Resume / CV", url: "#", icon: <FaFilePdf className="text-red-500" /> },
      // { label: "Twitter / X", url: "#", icon: <FaTwitter className="text-blue-400" /> },
      // { label: "Google Scholar", url: "#", icon: <FaGoogle className="text-blue-500" /> },
    ] as Link[],
    news: [
      // { date: "Mar '25", content: "Project Alpha featured in Tech Weekly" },
      // { date: "Jan '25", content: "Joined the Open Source Committee" },
      // { date: "Sep '24", content: "Started new role at Tech Corp" },
    ] as NewsItem[]
  },
  main: {
    bio: [
      `Hi there! 👋 I am a Software Engineer at ![logo](logos/filemap-logo.png)[FileMap](https://filemap.com), a spatial collaboration platform for creatives.
Additionally, I'm an independent researcher collaborating with Professor [Marcelo d'Amorim](https://damorim.github.io/) from ![logo](logos/ncstate-circle-red-whtwolf.png) North Carolina State University 
and Professor [Owolabi Legunsen](https://www.cs.cornell.edu/~legunsen/) from ![logo](logos/Cornell__C__logo.svg.png) Cornell University 
on improving runtime verefication for python. Previously, I participated in UIUC+ Summer Undergraduate Research 
program where I worked with Professor [Darko Marinov](https://mir.cs.illinois.edu/marinov/) from ![logo](logos/uiuc-logo.webp) the University of Illinois at Urbana-Champaign 
on flaky tests detection in Java. I received my B.S. in Computer Engineering from ![logo](logos/bilkent-ing-amblem.png) Bilkent University at Ankara, Turkey.`,
`I am well versed in Full Stack Development using technologies such as Next.js, React, Nest.js, Node.js, Postgres, Convex, Tailwind CSS, Electron.js, GraphQL, WebGL, Neo4j. Additionally, I am experienced in agentic AI and machine learning using technologies such as LangChain, LangGraph, OpenAI API, Google Generative AI, and Huggingface.`,
      
`Outside of engineering, I enjoy [graphic design](https://www.behance.net/myds) 🎨 and swimming 🏊.`
    ],
    interests: `My current interests lie in the intersection between artificial intelligence and design processes. I aim to bridge the gap between the idea space, 
what a creative professional imagines, and reality, the final implementation, by leveraging generative AI. Additionally, I am interested in software verification and testing.`,
    diagram: {
      topics: [
        { id: "ai", label: "AI", color: "#FFD6A5" },
        { id: "design", label: "Design", color: "#FFADAD" },
        { id: "systems", label: "Systems", color: "#A0C4FF" },
        { id: "web", label: "3D", color: "#CAFFBF" },
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
        company: "FileMap",
        role: "Software Engineer",
        duration: "2020 - Present",
        description: `I joined filemap from its inception and have been working on the platform ever since. 
I have mainly worked on the viewers, the subsystem responsible for both reducing files (e.g., images, videos, 
3D models, PDFs, etc.) into simple visuals and the rendering mechanism in the frontend. In addition, I worked 
on many other subsystems of the platform, such as the process management system (RunnerKit) and a highly-reliable 
multi-platform watcher system for detecting file changes.`,
        image: "filemap-team.webp"
      },
      {
        company: "Freelance",
        role: "Full-stack Software Engineer",
        duration: "2022 - 2024",
        description: "I have worked as a full-stack software engineer for various clients. On Upwork, I have a success score of 100% after completing over 10 projects and 1700+ hours of work. I have worked on a wide range of projects, including projects in the 3D space, AI, and web development. One notable project was ![logo](logos/upwork.webp) Codelab, a no-code web application builder, where I did over 1700+ hours of contribution to the project. I worked on the frontend and backend of the application, using technologies like Next.js, Tailwind CSS, MobX, GraphQL, Nest.js, and Neo4j.",
        image: "logos/upwork.webp"
      }
    ] as WorkExperience[],

    researchExperience: [
      // {
      //   institution: "Innovation Lab",
      //   role: "Research Assistant",
      //   duration: "2023 - Present",
      //   description: "Conducting research on human-AI collaboration. Designed and ran user studies to evaluate the effectiveness of AI-assisted tools.",
      //   image: "https://placehold.co/100x100/EEE/31343C"
      // },
      // {
      //   institution: "State University",
      //   role: "Undergraduate Researcher",
      //   duration: "2021 - 2023",
      //   description: "Investigated algorithms for distributed systems. Published a paper in a student conference.",
      //   image: "https://placehold.co/100x100/EEE/31343C"
      // }
    ] as ResearchExperience[],
    
    publications: [
      {
        id: "pub-smart-interfaces",
        title: "A Generic and Efficient Python Runtime Verification System and its Large-scale Evaluation",
        authors: <><b>Zhuohang Shen</b>, <b className='text-primary'>Mohammed Yaseen</b>, <b>Denini Silva</b>, <b>Kevin Guan</b>, <b>Junho Lee</b>, <b>Marcelo d&apos;Amorim</b>, <b>Owolabi Legunsen</b></>,
        venue: "TBD. 2025",
        abstract: "We propose PyMOP, a generic and efficient Runtime Verification system for Python. Unlike existing attempts, PyMOP supports multiple logics and algorithms. Validated on 1,463 projects, it outperforms comparable tools by up to 1,168x and has already helped fix 44 bugs, establishing it as a robust platform for future Python RV research.",
        image: "logos/pymop-concept.png",
        links: [
          { label: "PDF", url: "https://arxiv.org/pdf/2509.06324" },
          // { label: "Code", url: "#" },
          // { label: "Project Page", url: "#" }
        ]
      },
    ] as Publication[],

    projects: [
      {
        name: "Waylum",
        description: "An app that turns simple compositions/sketches into high fedility renders. Technologies like Stable Diffusion, LoRa, ControlNet, and ComfyUI were used for the image generation pipeline. Next.js, Tailwind CSS, and MobX were used for the frontend.",
        video: "demos/waylum-demo.mp4",
        date: "2025",
        links: [
          // { label: "Video", url: "demos/waylum-demo.mp4" }
        ]
      } as Project,
      // {
      //   name: "Synapcast",
      //   description: "Designed and implemented a microservices architecture handling 1M+ concurrent users. Utilized Kubernetes and Go for high performance.",
      //   video: "demos/synapcast-demo.mp4",
      //   date: "2025",
      //   links: [
      //     // { label: "Video", url: "demos/waylum-demo.mov" }
      //   ]
      // } as Project,
      {
        name: "3D Model Configurator",
        description: "This was developped for a client. A web app that allows users to configure 3D models. Technologies like Three.js and React were used for the frontend.",
        video: "demos/3d-configurator-demo.mp4",
        date: "2023",
        links: [
          // { label: "Video", url: "demos/waylum-demo.mov" }
        ]
      } as Project,
      {
        name: "ModMod",
        description: "This was developped for a client. A web app that allows for composing AI models of different capabilities and modalities by plugging them into each other like puzzle pieces.",
        video: "demos/modmod-demo.mp4",
        date: "2024",
        links: [
          // { label: "Video", url: "demos/waylum-demo.mov" }
        ]
      } as Project,
      {
        name: "Aether",
        description: "A reverse image search app that allows users to search for images by their visual similarity to multiple weighted input images. Built with Faiss and React.",
        video: "demos/aether-short-demo.mp4",
        date: "2024",
        links: [
          { label: "App Store", url: "#" },
          { label: "Website", url: "#" }
        ]
      } as Project,
      {
        name: "Instacook",
        description: "This was our senior capstone project. A mobile app that allows users to find recipes based on scanned ingredients. The app was built with React Native and Firebase; and the ingredient detection was done using YOLOv7. We won the best UI/UX app award at the capstone fair.",
        video: "demos/instacook-demo.mp4",
        date: "2022",
        links: [  
          { label: "Video", url: "https://www.youtube.com/watch?v=YSEf-RcxMu0" },
          { label: "The Award", url: "https://www.linkedin.com/posts/mohasy_obss-bilkentuniversity-csfair2022-activity-6931271100110630912-s_fc" }
        ]
      } as Project,
      {
        name: "TreeViz",
        description: "I was during the covid lockdown in 2020. it was my sophomore year and I was taking a data structures and algorithms course. I decided to spend my time visualizing tree data structures and came up with this project.",
        video: "demos/treeviz-demo.mp4",
        date: "2020",
        links: [
          { label: "Demo", url: "#" }
        ]
      } as Project,
      {
        name: "Monk Assistant",
        description: "This was an experiment for implementing a live AI conversation system. It is basically an AI agent that calls the user's phone and has a conversation with them. It does also have the ability to perfrom actions on behalf of the user like fetching the user's calendar, or sending a message to a contact. The system was built using Nest.js for the backend and VAPI api with a custom LLM integration (GPT OSS 120B) for the live conversation system.",
        image: "demos/monk-assistant.png",
        date: "2025",
        links: [
          { label: "Demo", url: "#" }
        ]
      } as Project,
      {
        name: "priority-task",
        description: "This project was developped initially for FileMap, then was later released as an open-source npm package. It aims to simplify managing and executing tasks based on priority, offering features like runtime priority updates, pausing, resuming, and aborting tasks.",
        image: "demos/priority-task.png",
        date: "2021",
        links: [
          { label: "Code", url: "https://github.com/FileMap/priority-task" },
          { label: "npm", url: "https://www.npmjs.com/package/priority-task" }
        ]
      } as Project,
      {
        name: "workers-pool",
        description: "I built this project as a subsystem for FileMap. It is a worker pool that allows for parallel execution of tasks. I later replaced it with a more advanced internal implementation.",
        image: "demos/workerspool-1.png",
        date: "2022",
        links: [
          { label: "Code", url: "https://github.com/mohasarc/workers-pool" },
          { label: "npm", url: "https://www.npmjs.com/package/workers-pool" }
        ]
      } as Project,
      {
        name: "WorkGround",
        description: "Instead of studing for the C++ final exam, I built this app. It is a command-line tool that lets me define different 'modes' for my computer (like 'coding' or 'socializing') and instantly switch between them, automatically opening the right programs and closing the others with one command.",
        image: "demos/workground-2.png",
        date: "2020",
        links: [
          { label: "Video", url: "https://www.youtube.com/watch?v=LtrBkidOaDs" },
          { label: "Code", url: "https://github.com/mohasarc/WorkGround" }
        ]
      } as Project,
      {
        name: "supernova-chat",
        description: "An interactive dashboard for visualizing complex financial datasets. Features real-time updates and custom filtering logic.",
        video: "demos/supernova-chat-demo.mp4",
        date: "2021",
        links: [
          { label: "Demo", url: "#" }
        ]
      } as Project
    ]
  }
};
