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
        <Link href="/dashboard/projects/new" ><IoIosAdd fontSize={19}/><span>Add Project</span></Link>
      </div>

      {/* Head */}

      {/* Toggle Projects Switch */}
      
      <ToggleProjectSwitch />

      {/* Toggle Projects Switch */}

      {/* Existing Projects */}

      <div className={styles.projects__exist}>
        <h2>{ searchParams.projectType ? (
          searchParams.projectType === 'apartment' ? 'Apartments' : searchParams.projectType === 'villa' ? 'Villas' : 'Plots'
        ) : 'Existing Projects' }</h2>

        <div className={styles.projects}>

          {
            searchParams.projectType ? (
              <></>
            ) : (
              <DisplayApartments/>
            )
          }
          {
            searchParams.projectType === 'apartment' ? (
              <DisplayApartments/>
            ) : searchParams.projectType === 'plot' ? (
              <DisplayPlots/>
            ) : searchParams.projectType === 'villa' ? (
              <DisplayVillas/>
            ) : <></>
          }
        </div>

      </div>

      {/* Existing Projects */}

    </>
  )
}

export default Projects;

// **********************************************************************

const DisplayApartments = async () => {

  const fetchApartments: ApartmentDetails[] = await fetchAllAdminApartments();

  return (
    <div className={styles.projects__single}>
      {
        fetchApartments.map((singleApp) => {
          return (
            <ApartmentCard key={singleApp.projectId} projectDetails={singleApp} />
          )
        })
      }
    </div>
  )
}

const DisplayPlots = async () => {

  const fetchPlots: PlotDetails[] = await fetchAllAdminPlots();

  return (
    <div className={styles.projects__single}>
      {
        fetchPlots.map((singlePlot) => {
          return (
            <PlotCard key={singlePlot.projectId} projectDetails={singlePlot} />
          )
        })
      }
    </div>
  )
}

const DisplayVillas = async () => {

  const fectchVillas: VillaDetails[] = await fetchAllAdminVillas();


  return (
    <div className={styles.projects__single}>
      {
        fectchVillas.map((singleVilla) => {
          return (
            <VillaCard key={singleVilla.projectId} projectDetails={singleVilla} />
          )
        })
      }
    </div>
  )
}