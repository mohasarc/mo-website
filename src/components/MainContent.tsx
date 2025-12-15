import React from 'react';
import { PublicationEntry } from './PublicationEntry';
import { ProjectEntry } from './ProjectEntry';
import { ResearchDiagram } from './ResearchDiagram';
import { portfolioData } from "../data/portfolio";

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-')   // Replace multiple - with single -
    .replace(/^-+/, '')       // Trim - from start of text
    .replace(/-+$/, '');      // Trim - from end of text
};

export const MainContent = () => {
  const { bio, interests, workExperience, researchExperience, projects, publications } = portfolioData.main;

  return (
    <main className="flex-1 p-6 md:pl-4 md:pr-2 md:py-12 md:max-w-5xl mx-auto font-sans text-black">
      
      {/* Biography & Interests */}
      <section className="mb-12">
        <div className="text-base leading-relaxed mb-10 text-black">
          {bio.map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>

       {/* Interests Section */}
       {/* <section className="mb-12"> */}
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Interests</h2>
        <p className="text-base leading-relaxed mb-12">
          {portfolioData.main.interests}
        </p>
      {/* </section>   Research Visualization Diagram */}
        <ResearchDiagram />
      </section>

      {/* Work Experience */}
      <section className="mb-12 pt-8 border-t border-gray-200">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Work Experience</h2>
        <div className="flex flex-col gap-8">
           {workExperience?.map((work, idx) => (
             <div key={idx} className="flex flex-col md:flex-row gap-4 md:items-start">
               {/* Placeholder Image */}
               <div className="w-full md:w-32 h-24 bg-gray-200 shrink-0 rounded-sm flex items-center justify-center text-xs text-gray-500">
                  Image
               </div>
               <div>
                  <h3 className="text-lg font-bold font-sans">{work.company}</h3>
                  <p className="text-sm font-bold text-gray-600 mb-1">{work.role} <span className="font-normal text-gray-500">| {work.duration}</span></p>
                  <p className="text-sm leading-relaxed">{work.description}</p>
               </div>
             </div>
           ))}
        </div>
      </section>

      {/* Research Experience */}
      <section className="mb-12 pt-8 border-t border-gray-200">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Research Experience</h2>
         <div className="flex flex-col gap-6">
           {researchExperience?.map((research, idx) => (
             <div key={idx}>
               <h3 className="text-lg font-bold font-sans">{research.institution}</h3>
               <p className="text-sm font-bold text-gray-600 mb-1">{research.role} <span className="font-normal text-gray-500">| {research.duration}</span></p>
               <p className="text-sm leading-relaxed">{research.description}</p>
             </div>
           ))}
        </div>
      </section>

      {/* Publications */}
      <section className="mb-12 pt-8 border-t border-gray-200">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Publications</h2>
        
        {publications.map((pub, index) => (
          <PublicationEntry 
            key={index}
            id={`doc-${slugify(pub.title)}`}
            title={pub.title}
            authors={pub.authors}
            venue={pub.venue}
            abstract={pub.abstract}
            links={pub.links}
          />
        ))}
      </section>

      {/* Projects */}
      <section className="pt-8 border-t border-gray-200">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Projects</h2>
         <div className="flex flex-col">
           {projects?.map((project, idx) => (
             <ProjectEntry 
                key={idx}
                id={`pr-${slugify(project.name)}`}
                title={project.name}
                authors={project.authors}
                date={project.date}
                description={project.description}
                links={project.links}
                image={project.image}
             />
           ))}
        </div>
      </section>
    </main>
  );
};
