"use client";
import React, {useEffect, useState} from 'react';
import styles from "./NewAppartment.module.css";

// Components
import FormInput from '@/components/FormInput/FormInput';
import FormSelect from '@/components/FormSelect/FormSelect';
import FileUpload from '@/components/FileUpload/FileUpload';

type ApartmentDetails = {
  projectName: string,
  description: string,
  projectType: string,
  launchDate: string,
  possessionDate: string,
  basePrice: string,
  totalArea: string,
  projectSize: string,
  floors: string,
  flats: string,
  flatsPerFloor: string,
  towers: string,
  projectLocation: string,
  latitude: string,
  longitude: string,

  constructionType: string,
  clubHouseSize: string,
  totalOpenSpace: string,

  siteMap: File[],
  masterPlan: File[],
  projectHighlights: File[],

  elevationImages: File[],
  amenities: File[],

  floorPlan: File[],
  videoLink: string,
  brochure: File[],

  reraId: string,
  certificates: File[],
  projectHighlightPoints: string
}

const NewAppartment = () => {


  const [pages, setPages] = useState<{
    currentPage: number;
    totalPage: 7
  }>({
    totalPage: 7,
    currentPage: 1
  })

  const [apartmentDetails, setApartmentDetails] = useState<ApartmentDetails>({
    projectName: '',
    description: '',
    projectType: '',
    launchDate: new Date().toISOString().split("T")[0],
    possessionDate: new Date().toISOString().split("T")[0],
    basePrice: '',
    totalArea: '',
    projectSize: '',
    floors: '',
    flats: '',
    flatsPerFloor: '',
    towers: '',
    projectLocation: '',
    latitude: '',
    longitude: '',

    constructionType: '',
    clubHouseSize: '',
    totalOpenSpace: '',

    siteMap: [],
    masterPlan: [],
    projectHighlights: [],

    elevationImages: [],
    amenities: [],

    floorPlan: [],
    videoLink: '',
    brochure: [],

    reraId: '',
    certificates: [],
    projectHighlightPoints: ''
  });

  const changeApartmentDetails = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApartmentDetails({
      ...apartmentDetails, [e.target.name]: e.target.value
    })
  }

  return (
    <form className={styles.form}>
      <h2>Add <span>Appartment</span></h2>
      
      <div className={styles.form__main}>
        {
          pages.currentPage === 1 ? (
            <Page1 apartmentDetails={apartmentDetails} setApartmentDetails={setApartmentDetails} changeApartmentDetails={changeApartmentDetails} />
          ) : pages.currentPage === 2 ? (
            <Page2 apartmentDetails={apartmentDetails} setApartmentDetails={setApartmentDetails} changeApartmentDetails={changeApartmentDetails} />
          ) : pages.currentPage === 3 ? (
            <Page3 apartmentDetails={apartmentDetails} setApartmentDetails={setApartmentDetails} />
          ) : pages.currentPage === 4 ? (
            <Page4 apartmentDetails={apartmentDetails} setApartmentDetails={setApartmentDetails} />
          ) : pages.currentPage === 5 ? (
            <Page5 apartmentDetails={apartmentDetails} setApartmentDetails={setApartmentDetails} changeApartmentDetails={changeApartmentDetails} />
          ) : pages.currentPage === 6 ? (
            <Page6/>
          ) : pages.currentPage === 7 ? (
            <Page7 apartmentDetails={apartmentDetails} setApartmentDetails={setApartmentDetails} changeApartmentDetails={changeApartmentDetails} />
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
        <button className={styles.next__changer} type='button' title='Next' aria-label='Next' onClick={() => {
          setPages({
            ...pages,
            currentPage: pages.currentPage + 1
          })
        }}>{pages.currentPage === pages.totalPage ? 'Submit' : 'Next'}</button>
      </div>
    </form>
  )
}

export default NewAppartment;

const Page1 = ({apartmentDetails, setApartmentDetails, changeApartmentDetails}: {apartmentDetails: ApartmentDetails, setApartmentDetails: React.Dispatch<React.SetStateAction<ApartmentDetails>>, changeApartmentDetails: (e: React.ChangeEvent<HTMLInputElement>) => void}) => {

  const projectTypeOptions = [
    {id: '1', name: 'Standalone'},
    {id: '2', name: 'Semi-Gated'},
    {id: '3', name: 'Fully-Gated'}
  ]

  const [selectedProjectType, setSelectedProjectType] = useState<{
    id: string,
    name: string
  }>({
      id: '',
      name: ''
  })

  useEffect(() => {

    if (selectedProjectType.id && selectedProjectType.name) {
      setApartmentDetails({...apartmentDetails, projectType: selectedProjectType.name})
    }

    // eslint-disable-next-line
  }, [selectedProjectType]);

  return (
    <>
      <FormInput labelFor='projectName' labelTitle='Project Name' inputType='text' inputName='projectName' placeholder='Ex: Balaji Heights' value={apartmentDetails.projectName} setValue={changeApartmentDetails} />
      <FormInput labelFor='description' labelTitle='Description' inputType='text' inputName='description' placeholder='Describe your property' value={apartmentDetails.description} setValue={changeApartmentDetails} />
      <FormSelect options={projectTypeOptions} optionPlaceholder='Select project type' selectedOption={selectedProjectType} setSelectedOption={setSelectedProjectType} />
      <div className={styles.multi__fields}>
        <FormInput labelFor='launchDate' labelTitle='Launch Date' inputType='date' inputName='launchDate' placeholder='Launch Date' value={apartmentDetails.launchDate} setValue={changeApartmentDetails} />
        <FormInput labelFor='possessionDate' labelTitle='Possession Date' inputType='date' inputName='possessionDate' placeholder='Possession Date' value={apartmentDetails.possessionDate} setValue={changeApartmentDetails} />
      </div>
      <div className={styles.multi__fields}>
        <FormInput labelFor='basePrice' labelTitle='Base Price (INR)' inputType='text' inputName='basePrice' placeholder='Ex: 25000' value={apartmentDetails.basePrice} setValue={changeApartmentDetails} />
        <FormInput labelFor='totalArea' labelTitle='Total Area (Sq.ft)' inputType='text' inputName='totalArea' placeholder='Ex: 10000' value={apartmentDetails.totalArea} setValue={changeApartmentDetails} />
      </div>
      <div className={styles.multi__fields}>
        <FormInput labelFor='projectSize' labelTitle='Project Size (in acres)' inputType='text' inputName='projectSize' placeholder='Ex: 25' value={apartmentDetails.projectSize} setValue={changeApartmentDetails} />
        <FormInput labelFor='floors' labelTitle='No of Floors' inputType='text' inputName='floors' placeholder='Ex: 5' value={apartmentDetails.floors} setValue={changeApartmentDetails} />
      </div>
      <div className={styles.multi__fields}>
        <FormInput labelFor='flats' labelTitle='No of Flats' inputType='text' inputName='flats' placeholder='Ex: 25' value={apartmentDetails.flats} setValue={changeApartmentDetails} />
        <FormInput labelFor='flatsPerFloor' labelTitle='No of Flats per Floor' inputType='text' inputName='flatsPerFloor' placeholder='Ex: 5' value={apartmentDetails.flatsPerFloor} setValue={changeApartmentDetails} />
      </div>
      <div className={styles.multi__fields}>
        <FormInput labelFor='towers' labelTitle='No of Towers' inputType='text' inputName='towers' placeholder='Ex: 5' value={apartmentDetails.towers} setValue={changeApartmentDetails} />
        <FormInput labelFor='projectLocation' labelTitle='Project Location' inputType='text' inputName='projectLocation' placeholder='Enter project location' value={apartmentDetails.projectLocation} setValue={changeApartmentDetails} />
      </div>
      <div className={styles.multi__fields}>
        <FormInput labelFor='latitude' labelTitle='Latitude' inputType='text' inputName='latitude' placeholder='Ex: 17.89278' value={apartmentDetails.latitude} setValue={changeApartmentDetails} />
        <FormInput labelFor='longitude' labelTitle='Longitude' inputType='text' inputName='longitude' placeholder='Ex: -1.0292' value={apartmentDetails.longitude} setValue={changeApartmentDetails} />
      </div>
    </>
  )
}

const Page2 = ({apartmentDetails, setApartmentDetails, changeApartmentDetails}: {apartmentDetails: ApartmentDetails, setApartmentDetails: React.Dispatch<React.SetStateAction<ApartmentDetails>>, changeApartmentDetails: (e: React.ChangeEvent<HTMLInputElement>) => void}) => {

  const constructionTypes = [
    {id: "1", name: "Red Brick"},
    {id: "2", name: "Cement Brick"},
    {id: "3", name: "Sheer Wall"},
    {id: "4", name: "Mivan"},
  ]

  const [selctedConstructionType, setSelctedConstructionType] = useState<{
    id: string,
    name: string
  }>({
      id: '',
      name: ''
  })

  useEffect(() => {

    if (selctedConstructionType.id && selctedConstructionType.name) {
      setApartmentDetails({...apartmentDetails, constructionType: selctedConstructionType.name})
    }

    // eslint-disable-next-line
  }, [selctedConstructionType]);

  return (
    <>
      <FormSelect options={constructionTypes} optionPlaceholder='Select project type' selectedOption={selctedConstructionType} setSelectedOption={setSelctedConstructionType} />
      <FormInput labelFor='clubHouseSize' labelTitle='Club House Size' inputType='text' inputName='clubHouseSize' placeholder='Enter Club house size' value={apartmentDetails.clubHouseSize} setValue={changeApartmentDetails} />
      <FormInput labelFor='totalOpenSpace' labelTitle='Total Open Space' inputType='text' inputName='totalOpenSpace' placeholder='Enter total open space' value={apartmentDetails.totalOpenSpace} setValue={changeApartmentDetails} />
    </>
  )
}

const Page3 = ({apartmentDetails, setApartmentDetails}: {apartmentDetails: ApartmentDetails, setApartmentDetails: React.Dispatch<React.SetStateAction<ApartmentDetails>>}) => {

  const [repoSiteMap, setRepoSiteMap] = useState<File[]>(apartmentDetails.siteMap);
  const [repoMasterPlan, setRepoMasterPlan] = useState<File[]>(apartmentDetails.masterPlan);
  const [repoProjectHighlights, setRepoProjectHighlights] = useState<File[]>(apartmentDetails.projectHighlights);

  useEffect(() => {

    setApartmentDetails({...apartmentDetails, siteMap: repoSiteMap, masterPlan: repoMasterPlan, projectHighlights: repoProjectHighlights});

    // eslint-disable-next-line
  }, [repoSiteMap, repoMasterPlan, repoProjectHighlights]);

  return (
    <>
      <FileUpload labelFor='siteMap' labelTitle='Site Maps' files={repoSiteMap} setFiles={setRepoSiteMap} />
      <FileUpload labelFor='masterPlan' labelTitle='Master Plan' files={repoMasterPlan} setFiles={setRepoMasterPlan} />
      <FileUpload labelFor='projectHighlights' labelTitle='Project Highlights' files={repoProjectHighlights} setFiles={setRepoProjectHighlights} />
    </>
  )
}

const Page4 = ({apartmentDetails, setApartmentDetails}: {apartmentDetails: ApartmentDetails, setApartmentDetails: React.Dispatch<React.SetStateAction<ApartmentDetails>>}) => {

  const [repoElevationImages, setRepoElevationImages] = useState<File[]>(apartmentDetails.elevationImages);
  const [repoAmenities, setrepoAmenities] = useState<File[]>(apartmentDetails.amenities);

  useEffect(() => {

    setApartmentDetails({...apartmentDetails, elevationImages: repoElevationImages, amenities: repoAmenities });

    // eslint-disable-next-line
  }, [repoAmenities, repoElevationImages]);

  return (
    <>
      <FileUpload labelFor='elevationImages' labelTitle='Elevation Images' files={repoElevationImages} setFiles={setRepoElevationImages} />
      <FileUpload labelFor='amenities' labelTitle='Amenities' files={repoAmenities} setFiles={setrepoAmenities} />
    </>
  )
}

const Page5 = ({apartmentDetails, setApartmentDetails, changeApartmentDetails}: {apartmentDetails: ApartmentDetails, setApartmentDetails: React.Dispatch<React.SetStateAction<ApartmentDetails>>, changeApartmentDetails: (e: React.ChangeEvent<HTMLInputElement>) => void}) => {

  const [repoFloorPlan, setRepoFloorPlan] = useState<File[]>(apartmentDetails.floorPlan);
  const [repoBrochure, setRepoBrochure] = useState<File[]>(apartmentDetails.brochure);

  useEffect(() => {

    setApartmentDetails({...apartmentDetails, floorPlan: repoFloorPlan, brochure: repoBrochure });

    // eslint-disable-next-line
  }, [repoBrochure, repoFloorPlan]);

  return (
    <>
      <FileUpload labelFor='floorPlan' labelTitle='Floor Plan' files={repoFloorPlan} setFiles={setRepoFloorPlan} />
      <FormInput labelFor='videoLink' labelTitle='Video Link' inputType='text' inputName='videoLink' placeholder='Video Link (https only)' value={apartmentDetails.videoLink} setValue={changeApartmentDetails} />
      <FileUpload labelFor='brochure' labelTitle='Brochures' files={repoBrochure} setFiles={setRepoBrochure} />
    </>
  )
}

const Page6 = () => {
  return (
    <p>Page 6</p>
  )
}

const Page7 = ({apartmentDetails, setApartmentDetails, changeApartmentDetails}: {apartmentDetails: ApartmentDetails, setApartmentDetails: React.Dispatch<React.SetStateAction<ApartmentDetails>>, changeApartmentDetails: (e: React.ChangeEvent<HTMLInputElement>) => void}) => {

  const [repoCertificates, setRepoCertificates] = useState<File[]>(apartmentDetails.certificates);

  useEffect(() => {

    setApartmentDetails({...apartmentDetails, certificates: repoCertificates });

    // eslint-disable-next-line
  }, [repoCertificates]);

  return (
    <>
      <FileUpload labelFor='certificates' labelTitle='Upload Certificates' files={repoCertificates} setFiles={setRepoCertificates} />
      <FormInput labelFor='reraId' labelTitle='RERA ID' inputType='text' inputName='reraId' placeholder='12121232' value={apartmentDetails.reraId} setValue={changeApartmentDetails} />
      <FormInput labelFor='projectHighlightPoints' labelTitle='Project Highlight Points' inputType='text' inputName='projectHighlightPoints' placeholder='Project Highlight Points' value={apartmentDetails.projectHighlightPoints} setValue={changeApartmentDetails} />
    </>
  )
}