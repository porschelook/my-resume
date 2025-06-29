// components/Resume.tsx
'use client';

import React, { useEffect, useState, useRef, useMemo } from 'react';
import Image from 'next/image';
import styles from './Resume.module.css';
import EducationItem from './components/EducationItem';
import ExperienceItem from './components/ExperienceItem';

// --- Type Definitions ---
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

// --- Main Component ---
export default function Resume() {
  // State
  const [cv, setCV] = useState<CV | null>(null);

  // Section refs
  const educationRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const experienceRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const skillsRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const summaryRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const gitRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;

  // Fetch CV data
  useEffect(() => {
    fetch("https://my-resume-wcuu.onrender.com/cv")
      .then((res) => res.json())
      .then(setCV)
      .catch((err) => console.error("Failed to fetch CV", err));
  }, []);

  // Memoized skills list
  const skillsList = useMemo(() => {
    if (!cv) return [];
    return Object.entries(cv.skills);
  }, [cv]);

  // Scroll to section
  const scrollToSection = (sectionName: string) => {
    const refs: Record<string, React.RefObject<HTMLDivElement>> = {
      Education: educationRef,
      Experience: experienceRef,
      Skills: skillsRef,
      Professional_Summary: summaryRef,
      Git: gitRef,
    };
    const ref = refs[sectionName];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Loading state
  if (!cv) return <p className={styles.main}>Loading CV...</p>;

  // --- Render ---
  return (
    <main className={styles.main}>
      {/* Tab Bar */}
      <nav className={styles.tabBar}>
        <button className={styles.tab} onClick={() => scrollToSection("Education")}>Education</button>
        <button className={styles.tab} onClick={() => scrollToSection("Experience")}>Experience</button>
        <button className={styles.tab} onClick={() => scrollToSection("Skills")}>Skills</button>
        <button className={styles.tab} onClick={() => scrollToSection("Professional_Summary")}>Professional Summary</button>
        <a
          className={styles.tab}
          href="https://github.com/porschelook"
          target="_blank"
          rel="noopener noreferrer"
        >
          Git
        </a>
        <a
          className={styles.tab}
          href="https://www.linkedin.com/in/suphalerk-lortaraprasert/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </nav>

      {/* Header */}
      <header className={styles.headerContainer}>
        <div className={styles.header}>
          <h1 className={styles.title}>{cv.name}</h1>
          <p className={styles.location}>{cv.contact.location}</p>
          <p className={styles.contact}>{cv.contact.email} | {cv.contact.phone}</p>
          <a href={cv.contact.linkedin} className={styles.linkedin} target="_blank">LinkedIn</a>
        </div>
        <Image
          src="/profile_pic.jpg"
          alt="Profile Picture"
          width={150}
          height={150}
          className={styles.profileImage}
        />
      </header>

      {/* Professional Summary */}
      <section className={styles.section} ref={summaryRef}>
        <h2 className={styles.sectionTitle}>Professional Summary</h2>
        <p>{cv.summary}</p>
      </section>

      {/* Education */}
      <section className={styles.section} ref={educationRef}>
        <h2 className={styles.sectionTitle}>Education</h2>
        {cv.education.map((edu, idx) => (
          <EducationItem key={idx} edu={edu} />
        ))}
      </section>

      {/* Experience */}
      <section className={styles.section} ref={experienceRef}>
        <h2 className={styles.sectionTitle}>Experience</h2>
        {cv.experience.map((exp, idx) => (
          <ExperienceItem key={idx} exp={exp} />
        ))}
      </section>

      {/* Skills */}
      <section className={styles.section} ref={skillsRef}>
        <h2 className={styles.sectionTitle}>Skills</h2>
        {skillsList.map(([section, items]) => (
          <div key={section} className={styles.skillSection}>
            <strong className={styles.skillLabel}>{section}:</strong>{" "}
            {(items as string[]).join(", ")}
          </div>
        ))}
      </section>
    </main>
  );
}
