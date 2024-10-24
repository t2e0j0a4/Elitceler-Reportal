"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import styles from "./page.module.css";

// React Icons
import { IoIosAdd } from 'react-icons/io';

// UI
import ToggleProjectSwitch from './ui/ToggleProjectSwitch/ToggleProjectSwitch';
import {ApartmentCard, PlotCard, VillaCard} from './ui/ProjectCard/ProjectCard';

// Types
import { ApartmentDetails, PlotDetails, VillaDetails } from '@/types';

// Actions
import { fetchAllAdminApartments, fetchAllAdminPlots, fetchAllAdminVillas, fetchAllBuilderProjects } from '@/actions/projects';
import { ProjectType } from '../../../types/index';

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

const Projects = () => {

  const [showProjectForAdmin, setShowProjectForAdmin] =  useState<'apartment' | 'villa' | 'plot'>('apartment');

  const [showProjectForBuilder, setShowProjectForBuilder] = useState<{
    projectType: 'apartments' | 'villas' | 'plots',
    projectStatus: 'APPROVED' | 'REJECTED' | 'PENDING'
  }>({
    projectType: 'apartments',
    projectStatus: 'APPROVED'
  })

  return (
    <>
    
      {/* Head */}

      <div className={styles.dashboard__head}>
        <h1>Projects</h1>
        <Link href="/dashboard/projects/new" ><IoIosAdd fontSize={19}/><span>Add Project</span></Link>
      </div>

      {/* Head */}

      {/* Admin Added Projects */}

      <section className={styles.admin__projects}>

        <h2>Projects by Admin</h2>

        <div className={styles.toggler}>
          <button type='button' className={`${showProjectForAdmin === 'apartment' && styles.active}`} title='Apartment' aria-label='Apartment' name='apartment' onClick={(e) => {setShowProjectForAdmin('apartment')}}>Apartments</button>
          <button type='button' className={`${showProjectForAdmin === 'villa' && styles.active}`} title='Villas' aria-label='Villas' name='villa' onClick={(e) => {setShowProjectForAdmin('villa')}}>Villas</button>
          <button type='button' className={`${showProjectForAdmin === 'plot' && styles.active}`} title='Plots' aria-label='Plots' name='plot' onClick={(e) => {setShowProjectForAdmin('plot')}}>Plots</button>
        </div>

        {/* Show Projects by Admin */}

        <div className={styles.projects}>
          {
            showProjectForAdmin === 'apartment' ? (
              <DisplayAdminApartments  />
            ) : showProjectForAdmin === 'plot' ? (
              <DisplayAdminPlots />
            ) : showProjectForAdmin === 'villa' ? (
              <DisplayAdminVillas />
            ) : <></>
          }
        </div>

        {/* Show Projects by Admin */}

      </section>

      {/* Admin Added Projects */}

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

export default Projects;

// **********************************************************************

const ShowProjectsForBuilders = ({projectType, projectStatus}: {
  projectType: 'apartments' | 'villas' | 'plots',
  projectStatus: 'APPROVED' | 'REJECTED' | 'PENDING'
}) => {

  const [load, setLoad] = useState(false);
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
                    <ApartmentCard key={singleApp.projectId} projectDetails={singleApp} />
                  )
                })
              ) : (
                <p>Empty...</p>
              )
            ) : (projectType === 'apartments' && projectStatus === 'PENDING') ? (
              (fetchedProjectsOfBuilders && fetchedProjectsOfBuilders.apartments.apartments.PENDING) ? (
                fetchedProjectsOfBuilders.apartments.apartments.PENDING.map((singleApp) => {
                  return (
                    <ApartmentCard key={singleApp.projectId} projectDetails={singleApp} />
                  )
                })
              ) : (
                <p>Empty...</p>
              )
            ) : (projectType === 'apartments' && projectStatus === 'REJECTED') ? (
              (fetchedProjectsOfBuilders && fetchedProjectsOfBuilders.apartments.apartments.REJECTED) ? (
                fetchedProjectsOfBuilders.apartments.apartments.REJECTED.map((singleApp) => {
                  return (
                    <ApartmentCard key={singleApp.projectId} projectDetails={singleApp} />
                  )
                })
              ) : (
                <p>Empty...</p>
              )
            ) : (projectType === 'villas' && projectStatus === 'APPROVED') ? (
              (fetchedProjectsOfBuilders && fetchedProjectsOfBuilders.villas.villas.APPROVED) ? (
                fetchedProjectsOfBuilders.villas.villas.APPROVED.map((singleApp) => {
                  return (
                    <VillaCard key={singleApp.projectId} projectDetails={singleApp} />
                  )
                })
              ) : (
                <p>Empty...</p>
              )
            ) : (projectType === 'villas' && projectStatus === 'PENDING') ? (
              (fetchedProjectsOfBuilders && fetchedProjectsOfBuilders.villas.villas.PENDING) ? (
                fetchedProjectsOfBuilders.villas.villas.PENDING.map((singleApp) => {
                  return (
                    <VillaCard key={singleApp.projectId} projectDetails={singleApp} />
                  )
                })
              ) : (
                <p>Empty...</p>
              )
            ) : (projectType === 'villas' && projectStatus === 'REJECTED') ? (
              (fetchedProjectsOfBuilders && fetchedProjectsOfBuilders.villas.villas.REJECTED) ? (
                fetchedProjectsOfBuilders.villas.villas.REJECTED.map((singleApp) => {
                  return (
                    <VillaCard key={singleApp.projectId} projectDetails={singleApp} />
                  )
                })
              ) : (
                <p>Empty...</p>
              )
            ) : (projectType === 'plots' && projectStatus === 'APPROVED') ? (
              (fetchedProjectsOfBuilders && fetchedProjectsOfBuilders.plots.plots.APPROVED.length) ? (
                fetchedProjectsOfBuilders.plots.plots.APPROVED.map((singleApp) => {
                  return (
                    <PlotCard key={singleApp.projectId} projectDetails={singleApp} />
                  )
                })
              ) : (
                <p>Empty...</p>
              )
            ) : (projectType === 'plots' && projectStatus === 'PENDING') ? (
              (fetchedProjectsOfBuilders && fetchedProjectsOfBuilders.plots.plots.PENDING.length) ? (
                fetchedProjectsOfBuilders.plots.plots.PENDING.map((singleApp) => {
                  return (
                    <PlotCard key={singleApp.projectId} projectDetails={singleApp} />
                  )
                })
              ) : (
                <p>Empty...</p>
              )
            ) : (projectType === 'plots' && projectStatus === 'REJECTED') ? (
              (fetchedProjectsOfBuilders && fetchedProjectsOfBuilders.plots.plots.REJECTED.length) ? (
                fetchedProjectsOfBuilders.plots.plots.REJECTED.map((singleApp) => {
                  return (
                    <PlotCard key={singleApp.projectId} projectDetails={singleApp} />
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

/*

{
    message: '',
    apartment: {
        count: 1,
        categorizedApat: {
            PENDING: [],
            APPROVED: [],
            REJECTED: []
        }
    },
    villa: {
        count: 2,
        categorizedVilla: {
            PENDING: [],
            APPROVED: [],
            REJECTED: []
        }
    },
    plots: {
        count: 3,
        categorizedPlots: {
            PENDING: [],
            APPROVED: [],
            REJECTED: []
        }
    }
}

*/

const DisplayAdminApartments = () => {

  const [load, setLoad] = useState(true);
  const [adminApartments, setAdminApartments] = useState<ApartmentDetails[]>([]);

  const fetchAdminApp = async () => {
    setLoad(true);
    const fetchedApartments: ApartmentDetails[] = await fetchAllAdminApartments();
    setAdminApartments(fetchedApartments);
    setLoad(false);
  }

  useEffect(() => {
    fetchAdminApp();
  }, [])

  return (
    <div className={styles.projects__single}>
      {
        load ? (
          <p>Loading...</p>
        ) : (
          adminApartments && adminApartments.length !== 0 ? (
            adminApartments.map((singleApp) => {
              return (
                <ApartmentCard key={singleApp.projectId} projectDetails={singleApp} />
              )
            })
          ) : (
            <p>Empty Apartments...</p>
          )
        )
      }
    </div>
  )
}

const DisplayAdminPlots = () => {

  const [load, setLoad] = useState(true);
  const [adminPlots, setAdminPlots] = useState<PlotDetails[]>([]);

  const fetchAdminPlots = async () => {
    setLoad(true);
    const fetchedPlots: PlotDetails[] = await fetchAllAdminPlots();
    setAdminPlots(fetchedPlots);
    setLoad(false);
  }

  useEffect(() => {
    fetchAdminPlots();
  }, [])

  return (
    <div className={styles.projects__single}>
      {
        load ? (
          <p>Loading...</p>
        ) : (
          adminPlots && adminPlots.length !== 0 ? (
            adminPlots.map((singleApp) => {
              return (
                <PlotCard key={singleApp.projectId} projectDetails={singleApp} />
              )
            })
          ) : (
            <p>Empty Plots...</p>
          )
        )
      }
    </div>
  )
}

const DisplayAdminVillas = () => {

  const [load, setLoad] = useState(true);
  const [adminVillas, setAdminVillas] = useState<VillaDetails[]>([]);

  const fetchAdminVillas = async () => {
    setLoad(true);
    const fetchedVillas: VillaDetails[] = await fetchAllAdminVillas();
    setAdminVillas(fetchedVillas);
    setLoad(false);
  }

  useEffect(() => {
    fetchAdminVillas();
  }, [])

  return (
    <div className={styles.projects__single}>
      {
        load ? (
          <p>Loading...</p>
        ) : (
          adminVillas && adminVillas.length !== 0 ? (
            adminVillas.map((singleApp) => {
              return (
                <VillaCard key={singleApp.projectId} projectDetails={singleApp} />
              )
            })
          ) : (
            <p>Empty Villas...</p>
          )
        )
      }
    </div>
  )
}