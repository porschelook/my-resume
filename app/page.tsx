// components/Resume.tsx
'use client';

import React, { useEffect, useState, useRef, useMemo } from 'react';
import Image from 'next/image';
import styles from './Resume.module.css';

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

  // Create refs for each section
  const educationRef = useRef<HTMLDivElement>(null as unknown as HTMLDivElement);
  const experienceRef = useRef<HTMLDivElement>(null as unknown as HTMLDivElement);
  const skillsRef = useRef<HTMLDivElement>(null as unknown as HTMLDivElement);
  const summaryRef = useRef<HTMLDivElement>(null as unknown as HTMLDivElement);

  useEffect(() => {
    fetch("https://my-resume-wcuu.onrender.com/cv") // Replace with Vercel/Render URL if deployed
      .then((res) => res.json())
      .then(setCV)
      .catch((err) => console.error("Failed to fetch CV", err));
  }, []);

  // Memoize the skills list for performance
  const skillsList = useMemo(() => {
    if (!cv) return [];
    return Object.entries(cv.skills);
  }, [cv]);

  if (!cv) return <p className={styles.main}>Loading CV...</p>;

  // Scroll to section using refs
  const scrollToSection = (sectionName: string) => {
    const refs: Record<string, React.RefObject<HTMLDivElement>> = {
      Education: educationRef,
      Experience: experienceRef,
      Skills: skillsRef,
      Professional_Summary: summaryRef,
    };
    const ref = refs[sectionName];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className={styles.main}>
      <nav className={styles.tabBar}>
        <button className={styles.tab} onClick={() => scrollToSection("Education")}>Education</button>
        <button className={styles.tab} onClick={() => scrollToSection("Experience")}>Experience</button>
        <button className={styles.tab} onClick={() => scrollToSection("Skills")}>Skills</button>
        <button className={styles.tab} onClick={() => scrollToSection("Professional_Summary")}>Professional Summary</button>
      </nav>
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

      <section className={styles.section} ref={summaryRef}>
        <h2 className={styles.sectionTitle}>Professional Summary</h2>
        <p>{cv.summary}</p>
      </section>

      <section className={styles.section} ref={educationRef}>
        <h2 className={styles.sectionTitle}>Education</h2>
        {cv.education.map((edu: Education, idx) => (
          <div key={idx} className={styles.eduItem}>
            <h3 className={styles.eduTitle}>{edu.degree}, {edu.school}</h3>
            <p className={styles.eduLocation}>{edu.location} ({edu.period})</p>
            <ul className={styles.list}>
              {edu.details.map((line: string, i: number) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className={styles.section} ref={experienceRef}>
        <h2 className={styles.sectionTitle}>Experience</h2>
        {cv.experience.map((exp: Experience, idx) => (
          <div key={idx} className={styles.expItem}>
            <h3 className={styles.expTitle}>{exp.role}, {exp.company}</h3>
            <p className={styles.expLocation}>{exp.location} ({exp.period})</p>
            <ul className={styles.list}>
              {exp.highlights.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

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
