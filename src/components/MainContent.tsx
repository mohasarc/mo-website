import React from 'react';
import { PublicationEntry } from './PublicationEntry';
import { ProjectEntry } from './ProjectEntry';
import { ResearchDiagram } from './ResearchDiagram';
import { Section } from './ui/Section';
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
    <main className="flex-1 p-6 md:pl-8 md:pr-2 md:py-6 md:max-w-5xl mx-auto font-sans text-foreground">
      
      {/* Biography */}
      <section className="mb-4">
        <div className="text-sm leading-relaxed mb-4 text-foreground">
          {bio.map((paragraph, index) => (
            <p key={index} className="mb-3">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Interests & Diagram */}
      <Section title="Interests">
        <p className="text-sm leading-relaxed mb-4">
          {interests}
        </p>
        <ResearchDiagram />
      </Section>

      {/* Work Experience */}
      <Section title="Work Experience" withSeparator>
        <div className="flex flex-col gap-4">
           {workExperience.map((work, index) => (
             <div key={index} className="flex flex-col md:flex-row gap-2 md:gap-4">
               {/* Placeholder Image */}
               <div className="w-40 md:w-32 h-24 bg-muted shrink-0 rounded-sm flex items-center justify-center text-xs text-muted-foreground overflow-hidden">
                  {work.image ? (
                    <img src={work.image} alt={work.company} className="w-full h-full object-cover" /> 
                  ) : "Image"}
               </div>
               <div>
                  <h3 className="text-sm font-bold font-sans">{work.company}</h3>
                  <p className="text-xs font-bold text-muted-foreground mb-1">{work.role} <span className="font-normal text-muted-foreground">| {work.duration}</span></p>
                  <p className="text-sm leading-relaxed">{work.description}</p>
               </div>
             </div>
           ))}
        </div>
      </Section>

      {/* Research Experience */}
      <Section title="Research Experience" withSeparator>
         <div className="flex flex-col gap-4">
           {researchExperience.map((research, index) => (
             <div key={index}>
               <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                  <div className="w-40 md:w-32 h-24 bg-muted shrink-0 rounded-sm flex items-center justify-center text-xs text-muted-foreground overflow-hidden">
                      {research.image ? (
                        <img src={research.image} alt={research.institution} className="w-full h-full object-cover" />
                      ) : "Image"}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold font-sans">{research.institution}</h3>
                    <p className="text-xs font-bold text-muted-foreground mb-1">{research.role} <span className="font-normal text-muted-foreground">| {research.duration}</span></p>
                    <p className="text-sm leading-relaxed">{research.description}</p>
                  </div>
               </div>
             </div>
           ))}
        </div>
      </Section>

      {/* Publications */}
      <Section title="Publications" withSeparator>
        <div className="flex flex-col gap-1">
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
        </div>
      </Section>

      {/* Projects */}
      <Section title="Selected Projects" withSeparator>
         <div className="flex flex-col gap-1">
           {projects.map((project, idx) => (
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
      </Section>
    </main>
  );
};
