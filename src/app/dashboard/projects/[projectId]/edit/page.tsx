"use client";
import styles from "./page.module.css";
import React, { useEffect, useState } from 'react'
import { editAdminProjectById, fetchAdminSingleProjectDetails } from '@/actions/projects';
import { ApartmentDetails, FetchAdminApartmentDetails, FetchAdminPlotDetails, FetchAdminVillaDetails } from '@/types';
import { Page1, Page2, Page3, Page4, Page5, Page6, Page7 } from "../../ui/NewAppartment/NewAppartment";
import createToast from "@/utils/createToast";

const EditPage = ({params, searchParams}: {params: {[x: string]: string}, searchParams: {type: 'apartment' | 'plot' | 'villa'}}) => {

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


    /* ***************************************************************************************************************** */

    return (
        <>

            {
                projectLoading ? (
                    <p>Loading...</p>
                ) : (

                    <div className={styles.edit__page}>

                        {
                            searchParams.type === 'apartment' && projectDetails && 'apartmentID' in projectDetails ? (
                                <EditApartmentPage projectDetails={projectDetails} />
                            ) : searchParams.type === 'plot' && projectDetails && 'plotName' in projectDetails ? (
                                <p>Plot edit</p>
                            ) : searchParams.type === 'villa' && projectDetails && 'villaID' in projectDetails ? (
                                <p>Villa Edit</p>
                            ) : (
                                <p>Project details not found.</p>
                            )
                        }
                        
                    </div>

                )
            }

        </>
    )
}

export default EditPage;

/* ******************************************************************************************************* */

const EditApartmentPage = ({projectDetails}: {projectDetails: FetchAdminApartmentDetails}) => {

    const [pages, setPages] = useState<{
        currentPage: number;
        totalPage: number
    }>({
        totalPage: 4,
        currentPage: 1
    })

    const [responseLoading, setResponseLoading] = useState(false);

    const [apartmentDetails, setApartmentDetails] = useState<ApartmentDetails>({

        name: projectDetails.name,
        description: projectDetails.description,
        projectType: projectDetails.projectType,
        projectLaunchedDate: new Date(projectDetails.projectLaunchedDate).toISOString().split('T')[0],
        projectPossessionDate: new Date(projectDetails.projectPossession).toISOString().split('T')[0],
        pricePerSquareFeetRate: projectDetails.pricePerSquareFeetRate,
        totalArea: projectDetails.totalArea,
        latitude: projectDetails.latitude,
        longitude: projectDetails.longitude,
    
        landmark: projectDetails.LandMark,
    
        projectSize: projectDetails.projectSize,
        noOfFloors: projectDetails.noOfFloors,
        noOfFlats: projectDetails.noOfFlats,
        noOfFlatsPerFloor: projectDetails.noOfFlatsPerFloor,
        noOfTowers: projectDetails.noOfTowers,
        projectLocation: projectDetails.projectLocation,
        constructionType: projectDetails.constructionType,
        ClubHouseSize: projectDetails.Clubhousesize,
        totalOpenSpace: projectDetails.totalOpenSpace,
        videoLink: projectDetails.videoLink,
        reraID: projectDetails.reraID,
        projectHighlightsPoints: projectDetails.projectHighlightsPoints.join(', '),
    
        amenities: projectDetails.amenities.split(', '),
        clubHouseAmenities: projectDetails.clubHouseAmenities.split(', '),
        OutdoorAmenities: projectDetails.OutdoorAmenities.split(', '),

        nearByHighlights: projectDetails.NearByHighlights.split(', '),
        
        bhkType: '',
        sizeInSqft: '',
        facing: '',
        basePrice: '',
        unitPlanConfigFiles: [],
    
        siteMap: [],
        masterPlan: [],
        projectHighlights: [],
        elevationImages: [],
        amenitiesImages: [],
        floorPlanPdf: [],
        brochurePdf: [],
        priceSheet : [],
        reraCertificate: [],
    });
    
    const changeApartmentDetails = (e: React.ChangeEvent<HTMLInputElement>) => {
        setApartmentDetails({
            ...apartmentDetails, [e.target.name]: e.target.value
        })
    }

    return (
        <form className={styles.form} onSubmit={async (e) => {
            e.preventDefault();

            const formData = new FormData();
            formData.append('name', apartmentDetails.name ? apartmentDetails.name : '-');
            formData.append('description', apartmentDetails.description ? apartmentDetails.description : '-');
            formData.append('projectType', apartmentDetails.projectType ? apartmentDetails.projectType : '-');
            formData.append('projectLaunchedDate', apartmentDetails.projectLaunchedDate ? new Date(apartmentDetails.projectLaunchedDate).toISOString() : new Date().toISOString());
            formData.append('projectPossessionDate', apartmentDetails.projectPossessionDate ? new Date(apartmentDetails.projectPossessionDate).toISOString() : new Date().toISOString());
            formData.append('pricePerSquareFeetRate', apartmentDetails.pricePerSquareFeetRate ? apartmentDetails.pricePerSquareFeetRate : '-');
            formData.append('totalArea', apartmentDetails.totalArea ? apartmentDetails.totalArea : '-');
            formData.append('latitude', apartmentDetails.latitude ? apartmentDetails.latitude : '-');
            formData.append('longitude', apartmentDetails.longitude ? apartmentDetails.longitude : '-');
            formData.append('landmark', apartmentDetails.landmark ? apartmentDetails.landmark : '-');
            formData.append('projectSize', apartmentDetails.projectSize ? apartmentDetails.projectSize : '-');
            formData.append('noOfFloors', apartmentDetails.noOfFloors ? apartmentDetails.noOfFloors : '-');
            formData.append('noOfFlats', apartmentDetails.noOfFlats ? apartmentDetails.noOfFlats : '-');
            formData.append('noOfTowers', apartmentDetails.noOfTowers ? apartmentDetails.noOfTowers : '-');
            formData.append('noOfFlatsPerFloor', apartmentDetails.noOfFlatsPerFloor ? apartmentDetails.noOfFlatsPerFloor : '-');
            formData.append('projectLocation', apartmentDetails.projectLocation ? apartmentDetails.projectLocation : '-');
            formData.append('constructionType', apartmentDetails.constructionType ? apartmentDetails.constructionType : '-');
            formData.append('ClubHouseSize', apartmentDetails.ClubHouseSize ? apartmentDetails.ClubHouseSize : '-');
            formData.append('totalOpenSpace', apartmentDetails.totalOpenSpace ? apartmentDetails.totalOpenSpace : '-');
            formData.append('videoLink', apartmentDetails.videoLink ? apartmentDetails.videoLink : '-');
            formData.append('reraID', apartmentDetails.reraID ? apartmentDetails.reraID : '-');
            formData.append('projectHighlightsPoints', apartmentDetails.projectHighlightsPoints ? apartmentDetails.projectHighlightsPoints : '-');

            formData.append('amenities', apartmentDetails.amenities ? apartmentDetails.amenities.join(', ').trim() : '-');
            formData.append('clubHouseAmenities', apartmentDetails.clubHouseAmenities ? apartmentDetails.clubHouseAmenities.join(', ').trim() : '-');
            formData.append('OutdoorAmenities', apartmentDetails.OutdoorAmenities ? apartmentDetails.OutdoorAmenities.join(', ').trim() : '-');
            formData.append('nearByHighlights', apartmentDetails.nearByHighlights ? apartmentDetails.nearByHighlights.join(', ').trim() : '-');
            
            // formData.append('bhkType', apartmentDetails.bhkType ? apartmentDetails.bhkType : '-');
            // formData.append('sizeInSqft', apartmentDetails.sizeInSqft ? apartmentDetails.sizeInSqft : '-');
            // formData.append('facing', apartmentDetails.facing ? apartmentDetails.facing : '-');
            // formData.append('basePrice', apartmentDetails.basePrice ? apartmentDetails.basePrice : '-');

            // if (apartmentDetails.unitPlanConfigFiles) {
            //     apartmentDetails.unitPlanConfigFiles.forEach((file) => {
            //     formData.append('unitPlanConfigFiles', file);
            //     })
            // } else {
            //     formData.append('unitPlanConfigFiles', '');
            // }

            /* **************************************************************************************************************** */

            // if (apartmentDetails.siteMap) {
            //     apartmentDetails.siteMap.forEach((file) => {
            //     formData.append('siteMap', file);
            //     })
            // } else {
            //     formData.append('siteMap', '');
            // }

            // if (apartmentDetails.masterPlan) {
            //     apartmentDetails.masterPlan.forEach((file) => {
            //     formData.append('masterPlan', file);
            //     })
            // } else {
            //     formData.append('masterPlan', '');
            // }

            // if (apartmentDetails.projectHighlights) {
            //     apartmentDetails.projectHighlights.forEach((file) => {
            //     formData.append('projectHighlights', file);
            //     })
            // } else {
            //     formData.append('projectHighlights', '');
            // }

            // if (apartmentDetails.elevationImages) {
            //     apartmentDetails.elevationImages.forEach((file) => {
            //     formData.append('elevationImages', file);
            //     })
            // } else {
            //     formData.append('elevationImages', '');
            // }

            // if (apartmentDetails.amenitiesImages) {
            //     apartmentDetails.amenitiesImages.forEach((file) => {
            //     formData.append('amenitiesImages', file);
            //     })
            // } else {
            //     formData.append('amenitiesImages', '');
            // }

            // if (apartmentDetails.floorPlanPdf) {
            //     apartmentDetails.floorPlanPdf.forEach((file) => {
            //     formData.append('floorPlanPdf', file);
            //     })
            // } else {
            //     formData.append('floorPlanPdf', '');
            // }

            // if (apartmentDetails.brochurePdf) {
            //     apartmentDetails.brochurePdf.forEach((file) => {
            //     formData.append('brochurePdf', file);
            //     })
            // } else {
            //     formData.append('brochurePdf', '');
            // }

            // if (apartmentDetails.priceSheet) {
            //     apartmentDetails.priceSheet.forEach((file) => {
            //     formData.append('priceSheet', file);
            //     })
            // } else {
            //     formData.append('priceSheet', '');
            // }

            // if (apartmentDetails.reraCertificate) {
            //     apartmentDetails.reraCertificate.forEach((file) => {
            //     formData.append('reraCertificate', file);
            //     })
            // } else {
            //     formData.append('reraCertificate', '');
            // }

            setResponseLoading(true);

            const toastId = createToast('loading', 'Updating apartment details...');
            const apartmentEditResponse = await editAdminProjectById(formData, projectDetails.projectId, 'apartment');

            console.log(apartmentEditResponse);
            (apartmentEditResponse  === undefined) ? createToast('success', 'Details edited successfully!', toastId) : createToast('error', apartmentEditResponse.message, toastId)
            setResponseLoading(false)

        }}>

            <div className={styles.form__head}>
                <h2>Edit <span>Appartment</span></h2>
                <span>Page {pages.currentPage}/{pages.totalPage}</span>
            </div>

            <div className={styles.form__main}>
                {
                pages.currentPage === 1 ? (
                    <Page1 apartmentDetails={apartmentDetails} setApartmentDetails={setApartmentDetails} changeApartmentDetails={changeApartmentDetails} />
                ) : pages.currentPage === 2 ? (
                    <Page2 apartmentDetails={apartmentDetails} setApartmentDetails={setApartmentDetails} changeApartmentDetails={changeApartmentDetails} />
                ) : pages.currentPage === 3 ? (
                    <Page6 apartmentDetails={apartmentDetails} setApartmentDetails={setApartmentDetails} changeApartmentDetails={changeApartmentDetails} showBHK={false} />
                ) : pages.currentPage === 4 ? (
                    <Page7 apartmentDetails={apartmentDetails} setApartmentDetails={setApartmentDetails} changeApartmentDetails={changeApartmentDetails} showFile={false} />
                ) : <></>
                }
            </div>

            <div className={styles.page__changer}>
                {
                pages.currentPage > 1 && <button className={styles.back__changer} type='button' title='Back' aria-label='Back' onClick={() => {
                    setPages({
                    ...pages,
                    currentPage: pages.currentPage - 1
                    })
                }}>Back</button>
                }
                {pages.currentPage < pages.totalPage && <button className={styles.next__changer} type="button" title="Next" aria-label="Next" onClick={() => {
                (pages.currentPage < pages.totalPage && pages.currentPage !== pages.totalPage) && (setPages({
                    ...pages,
                    currentPage: pages.currentPage + 1
                }))}}>Next
                </button>}
                {pages.currentPage === pages.totalPage && <button type="submit" className={styles.next__changer} aria-label="Submit" title="Submit">{responseLoading ? (
                <div className={styles.basic}></div>
                ) : 'Submit'}</button>}
            </div>

        </form>
    )
}

