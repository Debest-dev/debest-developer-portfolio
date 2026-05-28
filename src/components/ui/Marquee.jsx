import React from 'react';
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiDocker,
  SiGit,
  SiVercel,
  SiTailwindcss,
  SiSolidity,
  SiMongodb,
  SiPostgresql,
  SiFigma,
  SiGraphql,
} from 'react-icons/si';

export const Marquee = () => {
  const items = [
    { icon: SiReact,       name: "React" },
    { icon: SiTypescript,  name: "TypeScript" },
    { icon: SiJavascript,  name: "JavaScript" },
    { icon: SiNextdotjs,   name: "Next.js" },
    { icon: SiNodedotjs,   name: "Node.js" },
    { icon: SiPython,      name: "Python" },
    { icon: SiTailwindcss, name: "Tailwind CSS" },
    { icon: SiSolidity,    name: "Solidity" },
    { icon: SiMongodb,     name: "MongoDB" },
    { icon: SiPostgresql,  name: "PostgreSQL" },
    { icon: SiDocker,      name: "Docker" },
    { icon: SiGit,         name: "Git" },
    { icon: SiVercel,      name: "Vercel" },
    { icon: SiFigma,       name: "Figma" },
    { icon: SiGraphql,     name: "GraphQL" },
  ];

  // Double items for seamless scrolling
  const scrollItems = [...items, ...items];

  return (
    <div className="w-full relative overflow-hidden bg-[#FAFAFA] border-y border-black/5 py-6">
      {/* Gradient masks */}
      <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-[#FAFAFA] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-[#FAFAFA] to-transparent z-10 pointer-events-none" />

      {/* Marquee list */}
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {scrollItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="inline-flex items-center mx-6">
              <div className="flex items-center gap-2">
                <Icon
                  style={{
                    width: '16px',
                    height: '16px',
                    opacity: 0.5,
                    flexShrink: 0,
                  }}
                />
                <span className="text-xs uppercase tracking-[0.2em] font-normal text-text/50 font-sans">
                  {item.name}
                </span>
              </div>
              <span className="text-brand-500/30 text-sm ml-12">✦</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
