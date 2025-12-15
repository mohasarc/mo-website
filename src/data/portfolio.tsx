
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

export interface Publication {
  title: string;
  authors: React.ReactNode; 
  venue: string;
  abstract: string;
  links: { label: string; url: string }[];
}

export const portfolioData = {
  sidebar: {
    profile: {
      name: "Dr. Alex J. Rivera",
      title: "Postdoctoral Researcher, Stanford University.\nDept. of Computer Science.",
      // In a real app, this might be a path string, but we are using a placeholder div in the component for now.
      // We can add an imageUrl field later if needed.
    },
    contact: [
      "Gates Building, Room 312",
      "353 Serra Mall",
      "Stanford, CA 94305"
    ],
    links: [
      { label: "Google Scholar", url: "#", icon: React.createElement(FaGoogle) },
      { label: "Curriculum Vitae (PDF)", url: "#", icon: React.createElement(FaFilePdf) },
      { label: "GitHub", url: "#", icon: React.createElement(FaGithub) },
      { label: "Twitter / X", url: "#", icon: React.createElement(FaTwitter) },
      { label: "LinkedIn", url: "#", icon: React.createElement(FaLinkedin) },
    ] as Link[],
    news: [
      { date: "Nov '23:", content: "Paper on generative models accepted to CVPR 2024." },
      { date: "Sep '23:", content: "Started Postdoc position at Stanford." },
      { date: "Jul '23:", content: "Defended PhD dissertation at MIT." },
      { date: "May '23:", content: "Received \"Best Paper Honorable Mention\" at CHI 2023." },
    ] as NewsItem[]
  },
  main: {
    bio: [
      "Hi there! I am a Postdoctoral Researcher at Stanford University, working with Prof. Jane Smith. I recently completed my PhD at MIT. My research interests lie at the intersection of Computer Vision and Human-Computer Interaction, focusing on building intelligent creative tools that empower designers.",
    ],
    interests: "My current research focuses on generative AI for 3D modeling, multimodal interaction design, and interpretive machine learning systems for creative professionals.",
    publications: [
      {
        title: "Interactive 3D Sketching with Diffusion Models",
        authors: <><b>Alex J. Rivera</b>, Sarah Chen, Michael Davis. </>,
        venue: "Proceedings of CVPR 2024",
        abstract: "We present a novel system designed to interpret rough 2D sketches and convert them into high-fidelity 3D models using latent diffusion, enabling rapid iteration for industrial designers.",
        links: [{ label: "PDF", url: "#" }, { label: "Video", url: "#" }, { label: "Code", url: "#" }, { label: "Project Page", url: "#" }]
      },
      {
        title: "Multimodal Feedback for Robotic Arm Control in VR",
        authors: <>Emily Zhang, <b>Alex J. Rivera</b>, David Kim.</>,
        venue: "Proceedings of CHI 2023 (Best Paper Honorable Mention)",
        abstract: "Investigating how haptic and visual feedback integration improves user performance and presence when controlling teleoperated robotic arms within virtual reality environments.",
        links: [{ label: "PDF", url: "#" }, { label: "Video", url: "#" }, { label: "Talk", url: "#" }]
      },
      {
        title: "Generative Text-to-Video Synthesis for Educational Content",
        authors: <><b>Alex J. Rivera</b>, Robert Johnson.</>,
        venue: "Proceedings of ICCV 2023",
        abstract: "A framework for automatically generating instructional video content from textual descriptions, focusing on maintaining temporal consistency and visual clarity for educational purposes.",
        links: [{ label: "PDF", url: "#" }, { label: "Code", url: "#" }, { label: "Dataset", url: "#" }]
      },
      {
        title: "Understanding Designer-AI Collaboration Dynamics",
        authors: <>Lisa Wong, <b>Alex J. Rivera</b>, Sarah Chen.</>,
        venue: "CSCW 2022",
        abstract: "An ethnographic study examining how professional graphic designers integrate AI-powered tools into their workflows, identifying key friction points and opportunities for better tool design.",
        links: [{ label: "PDF", url: "#" }, { label: "Video", url: "#" }]
      }
    ] as Publication[]
  }
};
