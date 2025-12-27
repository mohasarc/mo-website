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
  description: string | string[];
  image?: string | string[]; 
}

export interface ResearchExperience {
  institution: string;
  role: string;
  duration: string;
  description: string | string[];
  image?: string;
}

export interface Project {
  id?: string;
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

export interface Language {
  language: string;
  proficiency: string;
}

export const portfolioData = {
  sidebar: {
    profile: {
      name: "Mohammed Yaseen",
      // title: "Full-Stack Software Engineer\nProfessional Glass-boarder",
      title: "Full-Stack Software Engineer\nStrong on whiteboards (and glass ones)",
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
      { label: "UpWork", url: "https://www.upwork.com/freelancers/~01f49cf3f56619fe1d?mp_source=share", icon: <FaUpwork /> },
      { label: "Behance", url: "https://www.behance.net/myds", icon: <FaBehance /> },
      { label: "Resume / CV", url: "/personal/Mohammed_S_Yaseen__Software_Engineer.pdf", icon: <FaFilePdf className="text-red-500" /> },
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
      `Hi there! 👋 I am a Software Engineer at ![logo](logos/sm/filemap-logo.webp)[FileMap](https://filemap.com), a spatial collaboration platform for creatives.
Additionally, I'm an independent researcher collaborating with Professor [Marcelo d'Amorim](https://damorim.github.io/) from ![logo](logos/sm/ncstate-circle-red-whtwolf.webp) North Carolina State University 
and Professor [Owolabi Legunsen](https://www.cs.cornell.edu/~legunsen/) from ![logo](logos/sm/Cornell__C__logo.svg.webp) Cornell University 
on improving runtime verification for Python. Previously, I participated in the UIUC+ Summer Undergraduate Research 
program where I worked with Professor [Darko Marinov](https://mir.cs.illinois.edu/marinov/) from ![logo](logos/sm/uiuc-logo.webp) the University of Illinois at Urbana-Champaign 
on flaky tests detection in Java. I received my B.S. in Computer Engineering from ![logo](logos/sm/bilkent.webp) Bilkent University in Ankara, Turkey.`,
`I am well-versed in Full Stack Development using technologies such as Next.js, React, Nest.js, Node.js, Postgres, Convex, Tailwind CSS, Electron.js, GraphQL, WebGL, Neo4j. Additionally, I am experienced in agentic AI and machine learning using technologies such as LangChain, LangGraph, OpenAI API, Google Generative AI, and Hugging Face.`,
      
`Outside of engineering, I enjoy [graphic design](https://www.behance.net/myds) 🎨 and swimming 🏊.`
    ],
    interests: `My current interests lie in the intersection between artificial intelligence and design processes. I aim to bridge the gap between the idea space, 
what a creative professional imagines, and reality, the final implementation, by leveraging generative AI. Additionally, I am interested in software verification and testing.`,
    diagram: {
      topics: [
        { id: "ai", label: "AI", color: "#FFD6A5" },
        { id: "design", label: "Design", color: "#FFADAD" },
        { id: "verification", label: "SW\nVerification", color: "#A0C4FF" },
        { id: "3d", label: "3D", color: "#CAFFBF" },
        { id: "systems", label: "Systems", color: "#FFC6FF" },
      ] as DiagramTopic[],
      pointers: [
        {
          topicIds: ["ai", "design"],
          items: [
             { label: "Waylum", targetId: "proj-waylum" },
             { label: "Instacook", targetId: "proj-instacook" },
            ]
          },
          { 
            topicIds: ["ai", "systems"],
            items: [
              //  { label: "PaperBot FM", targetId: "proj-paperbot" },
              { label: "ModMod", targetId: "proj-modmod" },
            { label: "Aether", targetId: "proj-aether" },
            //  { label: "Monk Assistant", targetId: "proj-monk-assistant" },
          ]
        },
        { 
           topicIds: ["3d"],
           items: [{ label: "3D Configurator", targetId: "proj-3d-model-config" }],
           angleOffset: -10
        },
        { 
           topicIds: ["verification"],
           items: [{ label: "PyMOP - Python RV System", targetId: "pub-pymop" }],
           angleOffset: 10
        },
        { 
           topicIds: ["systems"],
           items: [
              // { label: "TreeViz", targetId: "proj-treeviz" },
              { label: "priority-task", targetId: "proj-priority-task" },
              { label: "workers-pool", targetId: "proj-workers-pool" }
           ],
           distanceOffset: 20
        },
      ] as DiagramPointer[]
    },

    workExperience: [
      {
        company: "FileMap",
        role: "Software Engineer",
        duration: "2020 - Present",
        description: [
          `I joined FileMap at its inception and have built multiple core systems that power the platform. 
My primary focus has been the viewers subsystem, the pipeline responsible for transforming large files 
(images, videos, 3D models, PDFs, etc.) into fast, lightweight visuals for the frontend.  I also architected 
the frontend rendering engine that renders 20,000+ images at once while keeping everything smooth and responsive.`,
          `Beyond that, I've touched nearly every part of the stack: I built RunnerKit, our process management system 
that keeps node.js processes and worker threads reliable, and designed a robust, cross-platform 
file watcher for detecting changes across Windows, macOS, and Linux.`
        ],
        image: "filemap-team.webp"
      },
      {
        company: "Freelance",
        role: "Full-stack Software Engineer",
        duration: "2022 - 2024",
        description: [
          `I worked as a freelance full-stack engineer with clients across web, AI, and 3D-centric applications. 
On Upwork, I maintained a 100% Job Success Score after completing 10+ projects and logging 1,700+ hours of work. 
I also earned the Top Rated Plus badge, which places me in the top 3% of talent on the platform`,
          `One notable engagement was with![logo](logos/sm/codelab-logo-sm.webp)CodeLab, a no-code web application 
builder, where I contributed 1,700+ hours across frontend and backend development, using technologies like Next.js, 
Tailwind CSS, MobX, GraphQL, Nest.js, Neo4j, Jest, and Cypress.`,
        ],
        image: ["logos/lg/upwork.webp", 'personal/upwork-top-rated-plus-badge.webp']
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
        id: "pub-pymop",
        title: "A Generic and Efficient Python Runtime Verification System and its Large-scale Evaluation",
        authors: <><b>Zhuohang Shen</b>, <b className='text-primary'>Mohammed Yaseen</b>, <b>Denini Silva</b>, <b>Kevin Guan</b>, <b>Junho Lee</b>, <b>Marcelo d&apos;Amorim</b>, <b>Owolabi Legunsen</b></>,
        venue: "TBD. 2026",
        abstract: "We propose PyMOP, a generic and efficient Runtime Verification system for Python. Unlike existing attempts, PyMOP supports multiple logics and algorithms. Validated on 1,463 projects, it outperforms comparable tools by up to 1,168x and has already helped fix 44 bugs, establishing it as a robust platform for future Python RV research.",
        image: "logos/lg/pymop-concept.webp",
        links: [
          { label: "PDF", url: "https://arxiv.org/pdf/2509.06324" },
          // { label: "Code", url: "#" },
          // { label: "Project Page", url: "#" }
        ]
      },
    ] as Publication[],

    projects: [
      {
        id: "proj-waylum",
        name: "Waylum - AI-Powered Design Tool",
        description: `An app that transforms simple compositions/sketches into high-fidelity renders. The pipeline 
utilizes Stable Diffusion, LoRa, ControlNet, and ComfyUI for generation, with a Next.js, Tailwind CSS, 
and MobX frontend.`,
        video: "demos/vids/small/waylum-demo-small.mp4",
        date: "2025",
        links: [
          { label: "Video", url: "https://www.youtube.com/watch?v=s2tvn935FGc" }
        ]
      } as Project,
      {
        id: "proj-paperbot",
        name: "PaperBot FM - AI Research Discussion Platform",
        description: `Making multiple LLMs discuss research papers so I don't have to read them.`,
        image: "demos/imgs/webp/paperbot-fm.webp",
        date: "Comming soon...",
        links: [
          // { label: "Video", url: "demos/waylum-demo.mov" }
        ]
      } as Project,
      {
        id: "proj-3d-model-config",
        name: "3D Model Configurator (client project)",
        description: "A web app that lets users customize 3D models directly in the browser. It relies heavily on Three.js and React.",
        video: "demos/vids/small/3d-configurator-demo-small.mp4",
        date: "2023",
        links: [
          // { label: "Video", url: "demos/waylum-demo.mov" }
        ]
      } as Project,
      {
        id: "proj-modmod",
        name: "ModMod - AI Model Composer (client project)",
        description: "A web app where users can build AI pipelines by plugging different models together like puzzle pieces, mixing and matching capabilities and modalities.",
        video: "demos/vids/small/modmod-demo-small.mp4",
        date: "2024",
        links: [
          // { label: "Video", url: "demos/waylum-demo.mov" }
        ]
      } as Project,
      {
        id: "proj-aether",
        name: "Aether - Reverse Visual Search Engine",
        description: "A reverse image search tool that lets you search using multiple weighted input images at once to find visual matches. It’s powered by Faiss for vector search and React on the frontend.",
        video: "demos/vids/small/aether-short-demo-small.mp4",
        date: "2024",
        links: [
          { label: "Code", url: "https://github.com/mohasarc/image-inspired-search" },
        ]
      } as Project,
      {
        id: "proj-instacook",
        name: "Instacook - AI Recipe Finder",
        description: "This was our senior capstone project. A mobile app that scans ingredients and suggests recipes. We used the object detection model YOLOv7 for ingredient detection and React Native for the app. We ended up winning the Best UI/UX award at the capstone fair.",
        video: "demos/vids/small/instacook-demo-small.mp4",
        date: "2022",
        links: [  
          { label: "Video", url: "https://www.youtube.com/watch?v=YSEf-RcxMu0" },
          { label: "The Award", url: "https://www.linkedin.com/posts/mohasy_obss-bilkentuniversity-csfair2022-activity-6931271100110630912-s_fc" }
        ]
      } as Project,
      {
        id: "proj-treeviz",
        name: "TreeViz - Interactive Data Structures Visualizer",
        description: `I built this during the COVID lockdown because I was getting bored with my online 
Data Structures course. It helps students visualize how BSTs, AVL trees, and Red-Black trees actually 
work under the hood. The app runs on React and Node.js, but I wrote the core logic using Node C++ addons, totally 
unnecessary, but I just wanted the challenge of learning how to bridge C++ with Node.
`,
        video: "demos/vids/small/treeviz-demo-small.mp4",
        date: "2020",
        links: [
          { label: "Video", url: "https://www.youtube.com/watch?v=vBTfkbvI63Y" }
        ]
      } as Project,
      {
        id: "proj-monk-assistant",
        name: "Monk Assistant - Live AI Phone Agent",
        description: "An experimental AI agent capable of performing real-world actions. It can phone the user for a live conversation, fetch calendar events, or message contacts. Built using Nest.js, VAPI, and a custom LLM integration (GPT OSS 120B).",
        image: "demos/imgs/webp/monk-assistant.webp",
        date: "2025",
        links: [
          { label: "Demo", url: "#" }
        ]
      } as Project,
      {
        id: "proj-priority-task",
        name: "priority-task - Open-Source Task Manager",
        description: "Originally developed for FileMap and later released as an open-source npm package. It simplifies priority-based task management, supporting runtime priority updates, pausing, resuming, and task cancellation.",
        image: "demos/imgs/webp/priority-task.webp",
        date: "2021",
        links: [
          { label: "Code", url: "https://github.com/FileMap/priority-task" },
          { label: "npm", url: "https://www.npmjs.com/package/priority-task" }
        ]
      } as Project,
      {
        id: "proj-workers-pool",
        name: "workers-pool - Parallel Processing Library",
        description: "I built this project as a worker pool subsystem for FileMap to enable parallel task execution. As platform requirements evolved, I later designed and implemented its replacement, a more advanced internal system that superseded this version.",
        image: "demos/imgs/webp/workerspool-1.webp",
        date: "2022",
        links: [
          { label: "Code", url: "https://github.com/mohasarc/workers-pool" },
          { label: "npm", url: "https://www.npmjs.com/package/workers-pool" }
        ]
      } as Project,
      {
        id: "proj-workground",
        name: "WorkGround - Developer Productivity CLI",
        description: "Built during my sophomore year finals as a way of preparing for THE DREADED C++ exam. A command-line productivity tool for defining and switching between computer “modes,” automatically opening and closing applications with a single command.",
        image: "demos/imgs/webp/workground-2.webp",
        date: "2020",
        links: [
          { label: "Video", url: "https://www.youtube.com/watch?v=LtrBkidOaDs" },
          { label: "Code", url: "https://github.com/mohasarc/WorkGround" }
        ]
      } as Project,
      {
        id: "proj-supernova-chat",
        name: "supernova-chat - Real-time Messaging App",
        description: "A simple real-time messaging application with Google Sign-In authentication. Powered by MongoDB Atlas, using Pusher and MongoDB Change Streams for instant message synchronization.",
        video: "demos/vids/small/supernova-chat-demo-small.mp4",
        date: "2021",
        links: [
          { label: "Code", url: "https://github.com/mohasarc/supernova_chat" }
        ]
      } as Project
    ],
    languages: [
      // { language: "Arabic", proficiency: "Native" },
      // { language: "English", proficiency: "Native-level fluency" },
      // { language: "Turkish", proficiency: "Fluent" },
      // { language: "French", proficiency: "Intermediate" },
    ] as Language[]
  }
};
