import React from 'react'
import Link from 'next/link';
import styles from "./page.module.css";

// React Icons
import { IoIosAdd } from 'react-icons/io';

// UI
import ToggleProjectSwitch from './ui/ToggleProjectSwitch/ToggleProjectSwitch';
import {ApartmentCard, PlotCard, VillaCard} from './ui/ProjectCard/ProjectCard';

// Types
import { ApartmentDetails, PlotDetails, VillaDetails } from '@/types';

// Actions
import { fetchAllAdminApartments, fetchAllAdminPlots, fetchAllAdminVillas } from '@/actions/projects';

const Projects = ({searchParams}: {searchParams: {projectType: 'apartment' | 'villa' | 'plot'}}) => {

  return (
    <>
    
      {/* Head */}

      <div className={styles.dashboard__head}>
        <h1>Projects</h1>
        <Link href="/dashboard/projects/new"><IoIosAdd fontSize={19}/><span>Add Project</span></Link>
      </div>

      {/* Head */}

      {/* Admin Added Projects */}

      <section className={styles.admin__projects}>

        <h2><span>{searchParams.projectType ? searchParams.projectType + 's' : 'Apartments'}</span> by Admin</h2>

        <ToggleProjectSwitch/>

        {/* Show Projects by Admin */}

        {
          searchParams.projectType ? (
            <></>
          ) : (
            <DisplayAdminApartments />
          )
        }

        <div className={styles.projects}>
          {
            searchParams.projectType === 'apartment' ? (
              <DisplayAdminApartments  />
            ) : searchParams.projectType === 'plot' ? (
              <DisplayAdminPlots />
            ) : searchParams.projectType === 'villa' ? (
              <DisplayAdminVillas />
            ) : <></>
          }
        </div>

        {/* Show Projects by Admin */}

      </section>

      {/* Admin Added Projects */}


    </>
  )
}

export default Projects;

// **********************************************************************

const DisplayAdminApartments = async () => {

  const adminApartments: ApartmentDetails[] = await fetchAllAdminApartments();

  return (
    <div className={styles.projects__single}>
      {
        (adminApartments && adminApartments.length) ? (adminApartments.map((singleApp) => {
          return (
            <ApartmentCard key={singleApp.projectId} projectDetails={singleApp} projectFrom='admin' />
          )
        })) : (
          <p>Empty...</p>
        )
      }

    </div>
  )
}

const DisplayAdminPlots = async () => {

  const adminPlots: PlotDetails[] = await fetchAllAdminPlots();

  return (
    <div className={styles.projects__single}>

      {
        (adminPlots && adminPlots.length) ? (adminPlots.map((singlePlot) => {
          return (
            <PlotCard key={singlePlot.projectId} projectDetails={singlePlot} projectFrom='admin' />
          )
        })) : (
          <p>Empty...</p>
        )
      }

    </div>
  )
}

const DisplayAdminVillas = async () => {

  const adminVillas: VillaDetails[] = await fetchAllAdminVillas();

  return (
    <div className={styles.projects__single}>

      {
        (adminVillas && adminVillas.length) ? (adminVillas.map((singleVilla) => {
          return (
            <VillaCard key={singleVilla.projectId} projectDetails={singleVilla} projectFrom='admin' />
          )
        })) : (
          <p>Empty...</p>
        )
      }
    </div>
  )
}