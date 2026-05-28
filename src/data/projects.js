// src/data/projects.js
export const projects = [
  {
    slug: 'lexhypo',
    title: 'LexHypo',
    category: 'Web Apps',
    featured: true,
    description:
      'An AI-powered platform that helps law students develop practical legal reasoning skills through realistic hypotheticals and guided IRAC feedback rooted in Nigerian legal authorities.',
    problem:
      "A lot of law students realize too late that just memorizing cases and reading statutes isn't enough to pass exams. The real hurdle is figuring out how to apply those principles to complex, messy scenarios. Without any real-time guidance, students spend hours digging through constitutions and law reports, completely unsure if their analysis is even on the right track. It makes exam prep incredibly stressful and inefficient.",
    solution:
      'LexHypo acts like a 24/7 digital tutor to bridge that gap, turning passive studying into active, practical learning. The platform creates tailored legal scenarios, evaluates IRAC analysis on the spot, and provides intelligent feedback anchored in Nigerian law — from the Constitution and CAMA to the Evidence Act and landmark judicial decisions.',
    image: '/images/Main cover.png',
    screenshots: ['/images/1.png', '/images/2.png', '/images/3.png', '/images/4.png'],
    tags: ['React', 'TypeScript', 'OpenAI', 'Node.js', 'Tailwind CSS', 'Nigerian Law'],
    liveUrl: 'https://law-exam-app.vercel.app/',
    githubUrl: 'https://github.com',
    client: 'Personal Project',
    timeline: '6 Weeks',
    role: 'Full-Stack Developer',
    metrics: [
      { value: '24/7', label: 'AI Tutor Availability' },
      { value: 'IRAC', label: 'Guided Framework' },
      { value: '100%', label: 'Nigerian Law Focus' },
    ],
  },
];
