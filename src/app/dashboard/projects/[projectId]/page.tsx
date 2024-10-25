"use client";
import Link from 'next/link';
import Image from 'next/image';
import styles from "./page.module.css";
import React, { useEffect, useState } from 'react'

// React Icons
import { IoMdArrowDown } from "react-icons/io";
import { IoArrowBackOutline } from "react-icons/io5";

// Types 
import { FetchAdminApartmentDetails, FetchAdminPlotDetails, FetchAdminVillaDetails } from '@/types';

// Actions
import { fetchAdminSingleProjectDetails } from '@/actions/projects';

const ProjectDetails = ({params, searchParams}: {params: {projectId: string}, searchParams: {type: 'apartment' | 'plot' | 'villa'}}) => {

    const [projectLoading, setProjectsLoading] = useState(true);
    const [projectDetails, setProjectDetails] = useState<FetchAdminApartmentDetails | FetchAdminPlotDetails | FetchAdminVillaDetails | null>(null)

    const fetchProjectDetails = async () => {
        setProjectsLoading(true);
        const projectDetailsFetch = await fetchAdminSingleProjectDetails(params.projectId, searchParams.type)
        setProjectDetails(projectDetailsFetch)
        setProjectsLoading(false);
    }

    useEffect(() => {
        fetchProjectDetails();

        // eslint-disable-next-line
    }, []);

    if (!params.projectId) {
        return (<p>Invalid project selected.</p>)
    }

    return (
        <>
            {/* Head */}

            <div className={styles.dashboard__head}>
                <Link href="/dashboard/projects/"><IoArrowBackOutline fontSize={19}/></Link>
                <h1>Project Details</h1>
            </div>

            {/* Head */}

            {/* Details */}

            <div className={styles.details__main}>
                {
                    projectLoading ? (
                        <p>Loading...</p>
                    ) : (
                        searchParams.type === 'apartment' && projectDetails && 'apartmentID' in projectDetails ? (
                            <ApartmentDetails projectDetails={projectDetails} />
                        ) : searchParams.type === 'plot' && projectDetails && 'plotName' in projectDetails ? (
                            <PlotDetails projectDetails={projectDetails} />
                        ) : searchParams.type === 'villa' && projectDetails && 'villaID' in projectDetails ? (
                            <VillaDetails projectDetails={projectDetails} />
                        ) : (
                            <p>Project details not found.</p>
                        )
                    )
                }
            </div>

            {/* Details */}
        </>
    )
}

export default ProjectDetails;


const ApartmentDetails = ({projectDetails}: {projectDetails: FetchAdminApartmentDetails}) => {
    return (
        <>
            <div className={styles.detail}>
                <p>Type</p>
                <p>Plots</p>
            </div>
            <div className={styles.detail}>
                <p>RERA ID</p>
                <p>{projectDetails.reraID ? projectDetails.reraID : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>RERA Approval</p>
                <p>{projectDetails.RERAApproval !== null ? (projectDetails.RERAApproval === true ? 'Completed' : 'Not Completed') : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Project Status</p>
                <p>{projectDetails.projectStatus ? projectDetails.projectStatus : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Name</p>
                <p>{projectDetails.name ? projectDetails.name : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Description</p>
                <p>{projectDetails.description ? projectDetails.description : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Project Location</p>
                <p>{projectDetails.projectLocation ? projectDetails.projectLocation : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Latitude</p>
                <p>{projectDetails.Latitude ? projectDetails.Latitude : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Longitude</p>
                <p>{projectDetails.Longitude ? projectDetails.Longitude : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Landmark</p>
                <p>{projectDetails.LandMark ? projectDetails.LandMark : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Project Size</p>
                <p>{projectDetails.projectSize ? projectDetails.projectSize : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Launch Date</p>
                <p>{projectDetails.projectLaunchedDate ? new Date(projectDetails.projectLaunchedDate).toLocaleDateString() : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Possession Date</p>
                <p>{projectDetails.projectPossession ? new Date(projectDetails.projectPossession).toLocaleDateString() : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>No Of Floors</p>
                <p>{projectDetails.noOfFloors ? projectDetails.noOfFloors : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>No Of Flats</p>
                <p>{projectDetails.noOfFlats ? projectDetails.noOfFlats : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Flats / Floor</p>
                <p>{projectDetails.noOfFlatsPerFloor ? projectDetails.noOfFlatsPerFloor : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>No Of Towers</p>
                <p>{projectDetails.noOfTowers ? projectDetails.noOfTowers : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Club house Size</p>
                <p>{projectDetails.Clubhousesize ? projectDetails.Clubhousesize : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Total open space</p>
                <p>{projectDetails.totalOpenSpace ? projectDetails.totalOpenSpace : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Construction Type</p>
                <p>{projectDetails.constructionType ? projectDetails.constructionType : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Project Type</p>
                <p>{projectDetails.projectType ? projectDetails.projectType : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Price/Sq.ft</p>
                <p>{projectDetails.pricePerSquareFeetRate ? projectDetails.pricePerSquareFeetRate : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Total Area</p>
                <p>{projectDetails.totalArea ? projectDetails.totalArea : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Flat Sizes</p>
                <p>{projectDetails.flatSizes ? projectDetails.flatSizes : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Highlights</p>
                <p>{projectDetails.NearByHighlights ? projectDetails.NearByHighlights : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Amenities</p>
                <p>{projectDetails.amenities ? projectDetails.amenities : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Clubhouse Amenities</p>
                <p>{projectDetails.clubHouseAmenities ? projectDetails.clubHouseAmenities : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Outdoor Amenities</p>
                <p>{projectDetails.OutdoorAmenities ? projectDetails.OutdoorAmenities : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Video Link</p>
                <p>{projectDetails.videoLink ? projectDetails.videoLink : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Project Highlights</p>
                <p>{projectDetails.projectHighlightsPoints.length !== 0 ? projectDetails.projectHighlightsPoints.join(', ') : '-'}</p>
            </div>

            {
                projectDetails.projectMedia ? (

                    projectDetails.projectMedia.map((media, index) => {
                        return (
                            <div key={index} className={styles.detail__images}>
                                <p>{media.title ? media.title : '-'}</p>
                                <div className={styles.display__images}>
                                    {
                                        media.images.length !== 0 ? (
                                            media.images.map((image, index) => {
                                                return (
                                                    <div className={styles.image} key={index}>
                                                        <Image src={image} alt={media.title} width={240} height={210} />
                                                        <a download={true} target='_blank' href={image} title='Download' aria-label='Download'><IoMdArrowDown/></a>
                                                    </div>
                                                )
                                            }) 
                                        ) : (
                                            <p>No media exists...</p>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    })

                ) : (
                    <p>No Media Exists...</p>
                )
            }
        </>
    )
}

const PlotDetails = ({projectDetails}: {projectDetails: FetchAdminPlotDetails}) => {
    return (
        <>
            <div className={styles.detail}>
                <p>Type</p>
                <p>Plots</p>
            </div>
            <div className={styles.detail}>
                <p>RERA ID</p>
                <p>{projectDetails.reraID ? projectDetails.reraID : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>RERA Approval</p>
                <p>{projectDetails.RERAApproval !== null ? (projectDetails.RERAApproval === true ? 'Completed' : 'Not Completed') : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Villa Status</p>
                <p>{projectDetails.villaStatus ? projectDetails.villaStatus : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Plot Name</p>
                <p>{projectDetails.plotName ? projectDetails.plotName : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Plot Location</p>
                <p>{projectDetails.plotLocation ? projectDetails.plotLocation : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Plot Layout Size</p>
                <p>{projectDetails.plotLayoutSize ? projectDetails.plotLayoutSize : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Plot Type</p>
                <p>{projectDetails.plotType ? projectDetails.plotType : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Total Plots</p>
                <p>{projectDetails.totalPlots ? projectDetails.totalPlots : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Plot Sizes</p>
                <p>{projectDetails.plotSizes ? projectDetails.plotSizes : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Plot Facing</p>
                <p>{projectDetails.plotFacing ? projectDetails.plotFacing : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Price / Sq.yard</p>
                <p>{projectDetails.pricePerSqYard ? projectDetails.pricePerSqYard : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Price starts from</p>
                <p>{projectDetails.priceStartsFrom ? projectDetails.priceStartsFrom : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Amenities</p>
                <p>{projectDetails.amenities ? projectDetails.amenities : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Builder Name</p>
                <p>{projectDetails.builder && projectDetails.builder.name ? projectDetails.builder.name : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Builder Contact</p>
                <p>{projectDetails.builder && projectDetails.builder.CompanyPhone ? projectDetails.builder.CompanyPhone : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Builder Company Name</p>
                <p>{projectDetails.builder && projectDetails.builder.CompanyName ? projectDetails.builder.CompanyName : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Project Highlights</p>
                <p>{projectDetails.projectHighlightsPoints.length !== 0 ? projectDetails.projectHighlightsPoints.join(', ') : '-'}</p>
            </div>

            {
                projectDetails.plotMedia ? (

                    projectDetails.plotMedia.map((media, index) => {
                        return (
                            <div key={index} className={styles.detail__images}>
                                <p>{media.title ? media.title : '-'}</p>
                                <div className={styles.display__images}>
                                    {
                                        media.images.length !== 0 ? (
                                            media.images.map((image, index) => {
                                                return (
                                                    <div className={styles.image} key={index}>
                                                        <Image src={image} alt={media.title} width={240} height={210} />
                                                        <a download={true} target='_blank' href={image} title='Download' aria-label='Download'><IoMdArrowDown/></a>
                                                    </div>
                                                )
                                            }) 
                                        ) : (
                                            <p>No media exists...</p>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    })

                ) : (
                    <p>No Media Exists...</p>
                )
            }

        </>
    )
}

const VillaDetails = ({projectDetails}: {projectDetails: FetchAdminVillaDetails}) => {
    return (
        <>
            <div className={styles.detail}>
                <p>Type</p>
                <p>Villas</p>
            </div>
            <div className={styles.detail}>
                <p>RERA ID</p>
                <p>{projectDetails.reraID ? projectDetails.reraID : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>RERA Approval</p>
                <p>{projectDetails.RERAApproval !== null ? (projectDetails.RERAApproval === true ? 'Completed' : 'Not Completed') : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Villa Name</p>
                <p>{projectDetails.villaName ? projectDetails.villaName : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Villa Location</p>
                <p>{projectDetails.villaLocation ? projectDetails.villaLocation : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Villa Size</p>
                <p>{projectDetails.villaSize ? projectDetails.villaSize : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>No Of Villas</p>
                <p>{projectDetails.noOfVillas ? projectDetails.noOfVillas : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Villa Facing</p>
                <p>{projectDetails.villaFacing ? projectDetails.villaFacing : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Launch Date</p>
                <p>{projectDetails.launchDate ? new Date(projectDetails.launchDate).toLocaleDateString() : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Possession Date</p>
                <p>{projectDetails.possessionDate ? new Date(projectDetails.possessionDate).toLocaleDateString() : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Base Price/Sq.ft</p>
                <p>{projectDetails.basePricePerSqft ? projectDetails.basePricePerSqft : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>BHK Type</p>
                <p>{projectDetails.villaConfigurations ? projectDetails.villaConfigurations : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Villas Type</p>
                <p>{projectDetails.villasType ? projectDetails.villasType : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Villa Size Starting</p>
                <p>{projectDetails.villaSizeStarting ? projectDetails.villaSizeStarting : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Villa Size Ending </p>
                <p>{projectDetails.villaSizeEnding ? projectDetails.villaSizeEnding : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Plot Size Starting</p>
                <p>{projectDetails.plotSizeStarting ? projectDetails.plotSizeStarting : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Plot Size Ending </p>
                <p>{projectDetails.plotSizeEnding ? projectDetails.plotSizeEnding : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Price Range Starting</p>
                <p>{projectDetails.priceRangeStarting ? projectDetails.priceRangeStarting : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Price Range Ending</p>
                <p>{projectDetails.priceRangeEnding ? projectDetails.priceRangeEnding : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Club House Size</p>
                <p>{projectDetails.clubhouseSize ? projectDetails.clubhouseSize : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Additional Provisions</p>
                <p>{projectDetails.additionalProvision ? projectDetails.additionalProvision : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Villa Status</p>
                <p>{projectDetails.villaStatus ? projectDetails.villaStatus : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Builder Name</p>
                <p>{projectDetails.builder && projectDetails.builder.name ? projectDetails.builder.name : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Builder Contact</p>
                <p>{projectDetails.builder && projectDetails.builder.CompanyPhone ? projectDetails.builder.CompanyPhone : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Builder Company Name</p>
                <p>{projectDetails.builder && projectDetails.builder.CompanyName ? projectDetails.builder.CompanyName : '-'}</p>
            </div>
            <div className={styles.detail}>
                <p>Project Highlights</p>
                <p>{projectDetails.projectHighlightsPoints.length !== 0 ? projectDetails.projectHighlightsPoints.join(', ') : '-'}</p>
            </div>

            {
                projectDetails.villaMedia ? (

                    projectDetails.villaMedia.map((media, index) => {
                        return (
                            <div key={index} className={styles.detail__images}>
                                <p>{media.title ? media.title : '-'}</p>
                                <div className={styles.display__images}>
                                    {
                                        media.images.length !== 0 ? (
                                            media.images.map((image, index) => {
                                                return (
                                                    <div className={styles.image} key={index}>
                                                        <Image src={image} alt={media.title} width={240} height={210} />
                                                        <a download={true} target='_blank' href={image} title='Download' aria-label='Download'><IoMdArrowDown/></a>
                                                    </div>
                                                )
                                            }) 
                                        ) : (
                                            <p>No media exists...</p>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    })

                ) : (
                    <p>No Media Exists...</p>
                )
            }

        </>
    )
}