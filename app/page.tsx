// components/Resume.tsx
'use client';

import React, { useEffect, useState, useRef, useMemo } from 'react';
import Image from 'next/image';
import styles from './Resume.module.css';
import EducationItem from './components/EducationItem';
import ExperienceItem from './components/ExperienceItem';
import { FaUser, FaGraduationCap, FaBriefcase, FaTools, FaGithub, FaLinkedin, FaFolderOpen } from "react-icons/fa";

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
  side_projects: {
    title: string;
    description: string;
    link: string;
  }[];
};

// --- Main Component ---
export default function Resume() {
  const [cv, setCV] = useState<CV | null>(null);
  const [activeTab, setActiveTab] = useState<string>("Professional_Summary");

  // Section refs
  const educationRef = useRef<HTMLDivElement>(null!);
  const experienceRef = useRef<HTMLDivElement>(null!);
  const skillsRef = useRef<HTMLDivElement>(null!);
  const summaryRef = useRef<HTMLDivElement>(null!);
  const gitRef = useRef<HTMLDivElement>(null!);
  const sideProjectsRef = useRef<HTMLDivElement>(null!);
  // Fetch CV data
  useEffect(() => {
    fetch("http://127.0.0.1:8000/cv")
      .then((res) => {
        if (!res.ok) throw new Error("Local API failed");
        return res.json();
      })
      .then(setCV)
      .catch(() => {
        // Fallback to remote API if local fails
        fetch("https://my-resume-wcuu.onrender.com/cv")
          .then((res) => res.json())
          .then(setCV)
          .catch((err) => console.error("Failed to fetch CV from both sources", err));
      });

  }, []);


  // Memoized skills list
  const skillsList = useMemo(() => {
    if (!cv) return [];
    return Object.entries(cv.skills);
  }, [cv]);

  // Scroll to section and set active tab
  const scrollToSection = (sectionName: string) => {
    setActiveTab(sectionName);
    const refs: Record<string, React.RefObject<HTMLDivElement>> = {
      Education: educationRef,
      Experience: experienceRef,
      Skills: skillsRef,
      Professional_Summary: summaryRef,
      Git: gitRef,
      Side_Projects: sideProjectsRef,
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
      <nav className={styles.tabBar} aria-label="Resume Navigation">
        <button
          className={`${styles.tab} ${activeTab === "Professional_Summary" ? styles.activeTab : ""}`}
          onClick={() => scrollToSection("Professional_Summary")}
          aria-label="Professional Summary"
        >
          <FaUser style={{ marginRight: 8 }} /> Summary
        </button>
        <button
          className={`${styles.tab} ${activeTab === "Education" ? styles.activeTab : ""}`}
          onClick={() => scrollToSection("Education")}
          aria-label="Education"
        >
          <FaGraduationCap style={{ marginRight: 8 }} /> Education
        </button>
        <button
          className={`${styles.tab} ${activeTab === "Experience" ? styles.activeTab : ""}`}
          onClick={() => scrollToSection("Experience")}
          aria-label="Experience"
        >
          <FaBriefcase style={{ marginRight: 8 }} /> Experience
        </button>
        <button
          className={`${styles.tab} ${activeTab === "Skills" ? styles.activeTab : ""}`}
          onClick={() => scrollToSection("Skills")}
          aria-label="Skills"
        >
          <FaTools style={{ marginRight: 8 }} /> Skills
        </button>


        <a
          className={styles.tab}
          href="#"
          onClick={() => scrollToSection("Side_Projects")}
          aria-label="Side Projects"
          title="Side Projects"
        >
          <FaFolderOpen style={{ marginRight: 8 }} /> Side Projects
        </a>
      </nav>

      {/* Header */}
      <header className={styles.headerContainer}>
        <div className={styles.header}>
          <h1 className={styles.title}>{cv.name}</h1>
          <p className={styles.location}>{cv.contact.location}</p>
          <p className={styles.contact}>
            <a href={`mailto:${cv.contact.email}`} className={styles.email}>{cv.contact.email}</a> | {cv.contact.phone}
          </p>
          {/* <a
            href={cv.contact.linkedin}
            className={styles.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a> */}
          <a
            className={styles.tab}
            href="https://github.com/porschelook"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            title="GitHub"
          >
            <FaGithub  style={{ marginRight: 8 }} /> Git
          </a>
          <a
            className={styles.tab}
            href="https://www.linkedin.com/in/suphalerk-lortaraprasert/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <FaLinkedin style={{ marginRight: 8 }} /> LinkedIn
          </a>
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
        <h2 className={styles.sectionTitle}><FaUser style={{ marginRight: 8 }} /> Professional Summary</h2>
        <p>{cv.summary}</p>
      </section>

      {/* Education */}
      <section className={styles.section} ref={educationRef}>
        <h2 className={styles.sectionTitle}><FaGraduationCap style={{ marginRight: 8 }} /> Education</h2>
        {cv.education.map((edu, idx) => (
          <EducationItem key={idx} edu={edu} />
        ))}
      </section>

      {/* Experience */}
      <section className={styles.section} ref={experienceRef}>
        <h2 className={styles.sectionTitle}><FaBriefcase style={{ marginRight: 8 }} /> Experience</h2>
        {cv.experience.map((exp, idx) => (
          <ExperienceItem key={idx} exp={exp} />
        ))}
      </section>

      {/* Skills */}
      <section className={styles.section} ref={skillsRef}>
        <h2 className={styles.sectionTitle}><FaTools style={{ marginRight: 8 }} /> Skills</h2>
        {skillsList.map(([section, items]) => (
          <div key={section} className={styles.skillSection}>
            <strong className={styles.skillLabel}>{section.replace(/_/g, " ")}:</strong>{" "}
            {(items as string[]).join(", ")}
          </div>
        ))}
      </section>


 
      {/* Side Project */}
      <section className={styles.section} ref={sideProjectsRef}>
        <h2 className={styles.sectionTitle}>
          <FaFolderOpen style={{ marginRight: 8 }} /> Side Project
        </h2>
        {cv.side_projects.map((sp, idx) => (
          <div key={sp.title + idx} className={styles.sideProjectItem}>
            <span className={styles.sideProjectTitle}>{sp.title}</span>
            <span className={styles.sideProjectDesc}>{sp.description}</span>
            {sp.link && (
              <a
                href={sp.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.projectLink}
              >
                [Link]
              </a>
            )}
          </div>
        ))}
      </section>
    </main>
  );
}
