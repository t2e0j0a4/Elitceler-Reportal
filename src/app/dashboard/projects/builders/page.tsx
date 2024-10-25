"use client";
import styles from "./page.module.css";
import React, { useEffect, useState } from 'react';

// Types
import { ApartmentDetails, PlotDetails, VillaDetails } from '@/types'

// UI
import { ApartmentCard, PlotCard, VillaCard } from "../ui/ProjectCard/ProjectCard";

// Actions
import { fetchAllBuilderProjects } from "@/actions/projects";


type BuilderProjectType = {
    message: string,
    apartments: {
        count: number,
        apartments: {
          PENDING: ApartmentDetails[],
          APPROVED: ApartmentDetails[],
          REJECTED: ApartmentDetails[]
        }
    },
    villas: {
        count: number,
        villas: {
            PENDING: VillaDetails[],
            APPROVED: VillaDetails[],
            REJECTED: VillaDetails[]
        }
    },
    plots: {
        count: number,
        plots: {
            PENDING: PlotDetails[],
            APPROVED: PlotDetails[],
            REJECTED: PlotDetails[]
        }
    }
  }

const BuilderProjects = () => {

    const [showProjectForBuilder, setShowProjectForBuilder] = useState<{
        projectType: 'apartments' | 'villas' | 'plots',
        projectStatus: 'APPROVED' | 'REJECTED' | 'PENDING'
      }>({
        projectType: 'apartments',
        projectStatus: 'APPROVED'
      })

    return (
        <>
            <div className={styles.dashboard__head}>
                <h1>Projects</h1>
            </div>

            {/* Filter  - Approved, Pending & Rejected for Apartment, Villa, Plot */}

            <section className={styles.builder__projects}>

                <h2>Projects by Builders</h2>

                <div className={styles.builder__toggler}>

                <div className={styles.toggler}>
                    <button type='button' className={`${showProjectForBuilder.projectType === 'apartments' && styles.active}`} title='Apartment' aria-label='Apartment' name='apartment' onClick={(e) => {setShowProjectForBuilder({...showProjectForBuilder, projectType: 'apartments'})}}>Apartments</button>
                    <button type='button' className={`${showProjectForBuilder.projectType === 'villas' && styles.active}`} title='Villas' aria-label='Villas' name='villa' onClick={(e) => {setShowProjectForBuilder({...showProjectForBuilder, projectType: 'villas'})}}>Villas</button>
                    <button type='button' className={`${showProjectForBuilder.projectType === 'plots' && styles.active}`} title='Plots' aria-label='Plots' name='plots' onClick={(e) => {setShowProjectForBuilder({...showProjectForBuilder, projectType: 'plots'})}}>Plots</button>
                </div>

                <div className={styles.toggler}>
                    <button type='button' title='Approved' aria-label='Approved' onClick={(e) => {setShowProjectForBuilder({...showProjectForBuilder, projectStatus: 'APPROVED'})}} className={`${showProjectForBuilder.projectStatus === 'APPROVED' && styles.active}`} >Approved</button>
                    <button type='button' title='Pending' aria-label='Pending' onClick={(e) => {setShowProjectForBuilder({...showProjectForBuilder, projectStatus: 'PENDING'})}} className={`${showProjectForBuilder.projectStatus === 'PENDING' && styles.active}`} >Pending</button>
                    <button type='button' title='Rejected' aria-label='Rejected' onClick={(e) => {setShowProjectForBuilder({...showProjectForBuilder, projectStatus: 'REJECTED'})}} className={`${showProjectForBuilder.projectStatus === 'REJECTED' && styles.active}`} >Rejected</button>
                </div>

                </div>

                <div className={styles.projects}>
                    <ShowProjectsForBuilders projectType={showProjectForBuilder.projectType} projectStatus={showProjectForBuilder.projectStatus} />
                </div>

            </section>

                {/* Filter  - Approved, Pending & Rejected for Apartment, Villa, Plot */}
        </>
    )
}

export default BuilderProjects;

const ShowProjectsForBuilders = ({projectType, projectStatus}: {
    projectType: 'apartments' | 'villas' | 'plots',
    projectStatus: 'APPROVED' | 'REJECTED' | 'PENDING'
  }) => {
  
    const [load, setLoad] = useState(true);
    const [fetchedProjectsOfBuilders, setFetchedProjectsOfBuilders] = useState<null | BuilderProjectType>(null);
  
    const fetchBuildersProjects = async () => {
      setLoad(true);
      const builderProjects: BuilderProjectType = await fetchAllBuilderProjects();
      setFetchedProjectsOfBuilders(builderProjects);
      setLoad(false);
    }
  
    useEffect(() => {
      fetchBuildersProjects();
    }, []); 
  
    return (
      <>
        <p>{projectType}/{projectStatus}</p>
        <div className={styles.projects__single}>
  
          {
            load ? (
              <p>Loading Projects...</p>
            ) : (
              (projectType === 'apartments' && projectStatus === 'APPROVED') ? (
                (fetchedProjectsOfBuilders && fetchedProjectsOfBuilders.apartments.apartments.APPROVED) ? (
                  fetchedProjectsOfBuilders.apartments.apartments.APPROVED.map((singleApp) => {
                    return (
                      <ApartmentCard key={singleApp.projectId} projectDetails={singleApp} projectFrom="builder" />
                    )
                  })
                ) : (
                  <p>Empty...</p>
                )
              ) : (projectType === 'apartments' && projectStatus === 'PENDING') ? (
                (fetchedProjectsOfBuilders && fetchedProjectsOfBuilders.apartments.apartments.PENDING) ? (
                  fetchedProjectsOfBuilders.apartments.apartments.PENDING.map((singleApp) => {
                    return (
                      <ApartmentCard key={singleApp.projectId} projectDetails={singleApp} pending={true} projectFrom="builder" />
                    )
                  })
                ) : (
                  <p>Empty...</p>
                )
              ) : (projectType === 'apartments' && projectStatus === 'REJECTED') ? (
                (fetchedProjectsOfBuilders && fetchedProjectsOfBuilders.apartments.apartments.REJECTED) ? (
                  fetchedProjectsOfBuilders.apartments.apartments.REJECTED.map((singleApp) => {
                    return (
                      <ApartmentCard key={singleApp.projectId} projectDetails={singleApp} projectFrom="builder" />
                    )
                  })
                ) : (
                  <p>Empty...</p>
                )
              ) : (projectType === 'villas' && projectStatus === 'APPROVED') ? (
                (fetchedProjectsOfBuilders && fetchedProjectsOfBuilders.villas.villas.APPROVED) ? (
                  fetchedProjectsOfBuilders.villas.villas.APPROVED.map((singleApp) => {
                    return (
                      <VillaCard key={singleApp.projectId} projectDetails={singleApp} projectFrom="builder" />
                    )
                  })
                ) : (
                  <p>Empty...</p>
                )
              ) : (projectType === 'villas' && projectStatus === 'PENDING') ? (
                (fetchedProjectsOfBuilders && fetchedProjectsOfBuilders.villas.villas.PENDING) ? (
                  fetchedProjectsOfBuilders.villas.villas.PENDING.map((singleApp) => {
                    return (
                      <VillaCard key={singleApp.projectId} projectDetails={singleApp} pending={true} projectFrom="builder" />
                    )
                  })
                ) : (
                  <p>Empty...</p>
                )
              ) : (projectType === 'villas' && projectStatus === 'REJECTED') ? (
                (fetchedProjectsOfBuilders && fetchedProjectsOfBuilders.villas.villas.REJECTED) ? (
                  fetchedProjectsOfBuilders.villas.villas.REJECTED.map((singleApp) => {
                    return (
                      <VillaCard key={singleApp.projectId} projectDetails={singleApp} projectFrom="builder" />
                    )
                  })
                ) : (
                  <p>Empty...</p>
                )
              ) : (projectType === 'plots' && projectStatus === 'APPROVED') ? (
                (fetchedProjectsOfBuilders && fetchedProjectsOfBuilders.plots.plots.APPROVED) ? (
                  fetchedProjectsOfBuilders.plots.plots.APPROVED.map((singleApp) => {
                    return (
                      <PlotCard key={singleApp.projectId} projectDetails={singleApp} projectFrom="builder" />
                    )
                  })
                ) : (
                  <p>Empty...</p>
                )
              ) : (projectType === 'plots' && projectStatus === 'PENDING') ? (
                (fetchedProjectsOfBuilders && fetchedProjectsOfBuilders.plots.plots.PENDING) ? (
                  fetchedProjectsOfBuilders.plots.plots.PENDING.map((singleApp) => {
                    return (
                      <PlotCard key={singleApp.projectId} projectDetails={singleApp} pending={true} projectFrom="builder" />
                    )
                  })
                ) : (
                  <p>Empty...</p>
                )
              ) : (projectType === 'plots' && projectStatus === 'REJECTED') ? (
                (fetchedProjectsOfBuilders && fetchedProjectsOfBuilders.plots.plots.REJECTED) ? (
                  fetchedProjectsOfBuilders.plots.plots.REJECTED.map((singleApp) => {
                    return (
                      <PlotCard key={singleApp.projectId} projectDetails={singleApp} projectFrom="builder" />
                    )
                  })
                ) : (
                  <p>Empty...</p>
                )
              ) : <></>
            )
          }
  
        </div>
      </>
    )
  }