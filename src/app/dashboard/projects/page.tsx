import React from 'react'
import Link from 'next/link';
import styles from "./page.module.css";

// React Icons
import { IoIosAdd } from 'react-icons/io';

// UI
import ProjectCard from './ui/ProjectCard/ProjectCard';

const Projects = () => {

  return (
    <>
    
      {/* Head */}

      <div className={styles.dashboard__head}>
        <h1>Projects</h1>
        <Link href="/dashboard/projects/new" ><IoIosAdd fontSize={19}/><span>Add Project</span></Link>
      </div>

      {/* Head */}

      {/* Existing Projects */}

      <div className={styles.projects__exist}>
        <h2>Existing <span>Projects</span></h2>
        <div className={styles.projects}>
          <ProjectCard  />
          <ProjectCard  />
          <ProjectCard  />
          <ProjectCard  />
          <ProjectCard  />
          <ProjectCard  />
        </div>
      </div>

      {/* Existing Projects */}

    </>
  )
}

export default Projects;