// components/Resume.tsx
'use client';

import React, { useEffect, useState } from 'react';
 

type Education = {
  school: string;
  degree: string;
  location: string;
  period: string;
  details: string[];
};

type Experience = {
  company: string;
  role: string;
  location: string;
  period: string;
  highlights: string[];
};

type Skills = {
  languages: string[];
  frameworks: string[];
  tools: string[];
  other: string[];
};

type CV = {
  name: string;
  contact: {
    email: string;
    phone: string;
    linkedin: string;
    location: string;
  };
  summary: string;
  education: Education[];
  experience: Experience[];
  skills: Skills;
};


export default function Resume() {
  const [cv, setCV] = useState<CV | null>(null);

  useEffect(() => {
    fetch("http://localhost:8000/cv") // Replace with Vercel/Render URL if deployed
      .then((res) => res.json())
      .then(setCV)
      .catch((err) => console.error("Failed to fetch CV", err));
  }, []);

  if (!cv) return <p className="text-center mt-10">Loading CV...</p>;

  return (
    <main className="max-w-4xl mx-auto p-6 text-gray-900 dark:text-white dark:bg-gray-900 min-h-screen">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">{cv.name}</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">{cv.contact.location}</p>
        <p className="text-sm">{cv.contact.email} | {cv.contact.phone}</p>
        <a href={cv.contact.linkedin} className="text-blue-600 underline" target="_blank">LinkedIn</a>
      </header>

      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b border-gray-300 dark:border-gray-700 mb-2">Professional Summary</h2>
        <p>{cv.summary}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b mb-2">Education</h2>
        {cv.education.map((edu: Education, idx) => (
          <div key={idx} className="mb-4">
            <h3 className="font-medium">{edu.degree}, {edu.school}</h3>
            <p className="text-sm text-gray-700 dark:text-gray-400">{edu.location} ({edu.period})</p>
            <ul className="list-disc list-inside text-sm">
              {edu.details.map((line: string, i: number) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b mb-2">Experience</h2>
        {cv.experience.map((exp:Experience, idx) => (
          <div key={idx} className="mb-4">
            <h3 className="font-medium">{exp.role}, {exp.company}</h3>
            <p className="text-sm text-gray-700 dark:text-gray-400">{exp.location} ({exp.period})</p>
            <ul className="list-disc list-inside text-sm">
              {exp.highlights.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b mb-2">Skills</h2>
        {Object.entries(cv.skills).map(([section, items]) => (
          <div key={section} className="mb-2">
            <strong className="capitalize">{section}:</strong>{" "}
            {(items as string[]).join(", ")}
          </div>
        ))}
      </section>
    </main>
  );
}
