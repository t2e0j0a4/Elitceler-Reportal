"use client";
import React, {useEffect, useState} from 'react';
import styles from "./NewAppartment.module.css";

// Components
import KeyHighlights from './KeyHighlights';
import FormInput from '@/components/FormInput/FormInput';
import FormSelect from '@/components/FormSelect/FormSelect';
import FileUpload from '@/components/FileUpload/FileUpload';

// Types
import { ApartmentDetails } from '@/types';

// React Icons
import { IoClose } from 'react-icons/io5';
import BHKType from './BHKType';

const NewAppartment = ({builderId} : {builderId: string}) => {

  const [pages, setPages] = useState<{
    currentPage: number;
    totalPage: number
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

    amenitiesBasic: [],
    clubHouseAmenities: [],
    outdoorAmenities: [],
    keyHighlights: [],
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

    bhkType: [],
    priceSheet : [],

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
    <form className={styles.form} onSubmit={(e) => {
      e.preventDefault();
    }}>

      <div className={styles.form__head}>
        <h2>Add <span>Appartment</span></h2>
        <span>Page {pages.currentPage}/{pages.totalPage}</span>
      </div>
      
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
            <Page5 apartmentDetails={apartmentDetails} setApartmentDetails={setApartmentDetails}  />
          ) : pages.currentPage === 6 ? (
            <Page6 apartmentDetails={apartmentDetails} setApartmentDetails={setApartmentDetails} changeApartmentDetails={changeApartmentDetails} />
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
        <button className={styles.next__changer} type={pages.currentPage === pages.totalPage ? 'submit' : 'button'} title={pages.currentPage === pages.totalPage ? 'Submit' : 'Next'} aria-label={pages.currentPage === pages.totalPage ? 'Submit' : 'Next'} onClick={() => {
          pages.currentPage < pages.totalPage && (setPages({
            ...pages,
            currentPage: pages.currentPage + 1
          }))
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
      name: apartmentDetails.projectType
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
      name: apartmentDetails.constructionType
  })

  useEffect(() => {

    if (selctedConstructionType.id && selctedConstructionType.name) {
      setApartmentDetails({...apartmentDetails, constructionType: selctedConstructionType.name})
    }

    // eslint-disable-next-line
  }, [selctedConstructionType]);

  const [repoAmenitiesBasic, setRepoAmenitiesBasic] = useState(apartmentDetails.amenitiesBasic ? apartmentDetails.amenitiesBasic.join(',') : '');
  const [repoOutdoorAmenities, setRepoOutdoorAmenities] = useState(apartmentDetails.outdoorAmenities ? apartmentDetails.outdoorAmenities.join(',') : '');
  const [repoClubHouseAmenities, setRepoClubHouseAmenities] = useState(apartmentDetails.clubHouseAmenities ? apartmentDetails.clubHouseAmenities.join(',') : '');

  const changeAmenitiesValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepoAmenitiesBasic(e.target.value);
  }

  const changeClubHouseAmenities = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepoClubHouseAmenities(e.target.value);
  }

  const changeOutdoorAmenities = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepoOutdoorAmenities(e.target.value);
  }

  const handleOptionSelect = (option: string, defaultArr: string[], changeArr: string, setChange: React.Dispatch<React.SetStateAction<string>>) => {
    const newArr = defaultArr.filter((opt) => opt !== option);
    setApartmentDetails({...apartmentDetails, [changeArr]: newArr});
    setChange(newArr ? newArr.join(',') : '');
    console.log(apartmentDetails.amenitiesBasic)
  }

  useEffect(() => {
    
    const amenitiesBasic = repoAmenitiesBasic ? repoAmenitiesBasic.split(',').map((value: string) => value.trim()): []; 
    const outdoorAmenities = repoOutdoorAmenities ? repoOutdoorAmenities.split(',').map((value: string) => value.trim()) : []; 
    const clubHouseAmenities = repoClubHouseAmenities ? repoClubHouseAmenities.split(',').map((value: string) => value.trim()) : []; 

    setApartmentDetails({
      ...apartmentDetails, amenitiesBasic, outdoorAmenities, clubHouseAmenities
    });

    // eslint-disable-next-line
  }, [repoAmenitiesBasic, repoOutdoorAmenities, repoClubHouseAmenities]);

  return (
    <>
      <>
        <FormInput labelFor='amenitiesBasic' labelTitle='Amenities (comma seperated)' inputType='text' inputName='amenitiesBasic' placeholder='Ex: Gym, School, Garden' value={repoAmenitiesBasic} setValue={changeAmenitiesValue} />
        <div className={styles.all__options}>
          {apartmentDetails.amenitiesBasic.map((option, index) => (
            option ? (<span key={index}>
              {option} 
              <button type="button" title="Remove" onClick={() => {
                handleOptionSelect(option, apartmentDetails.amenitiesBasic, 'amenitiesBasic', setRepoAmenitiesBasic);
              }}><IoClose /></button>
            </span>) : <></>
          ))}
        </div>
      </>
      
      <>
        <FormInput labelFor='clubHouseAmenities' labelTitle='Club House Amenities (comma seperated)' 
        inputType='text' inputName='clubHouseAmenities' placeholder='Ex: Gym, Swimming pool' value={repoClubHouseAmenities} setValue={changeClubHouseAmenities} />
        <div className={styles.all__options}>
          {apartmentDetails.clubHouseAmenities.map((option, index) => (
            option ? (<span key={index}>
              {option} 
              <button type="button" title="Remove" onClick={() => {
                handleOptionSelect(option, apartmentDetails.clubHouseAmenities, 'clubHouseAmenities', setRepoClubHouseAmenities);
              }}><IoClose /></button>
            </span>) : <></>
          ))}
        </div>
      </>
      
      <>
        <FormInput labelFor='outdoorAmenities' labelTitle='Outdoor Amenities (comma seperated)' inputType='text' inputName='outdoorAmenities' placeholder='Ex: Park, Tennis court' value={repoOutdoorAmenities} setValue={changeOutdoorAmenities} />
        <div className={styles.all__options}>
          {apartmentDetails.outdoorAmenities.map((option, index) => (
            option ? (<span key={index}>
              {option} 
              <button type="button" title="Remove" onClick={() => {
                handleOptionSelect(option, apartmentDetails.outdoorAmenities, 'outdoorAmenities', setRepoOutdoorAmenities);
              }}><IoClose /></button>
            </span>) : <></>
          ))}
        </div>
      </>

      <KeyHighlights apartmentDetails={apartmentDetails} setApartmentDetails={setApartmentDetails} />

      <FormSelect options={constructionTypes} optionPlaceholder='Select construction type' selectedOption={selctedConstructionType} setSelectedOption={setSelctedConstructionType} />
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

const Page5 = ({apartmentDetails, setApartmentDetails}: {apartmentDetails: ApartmentDetails, setApartmentDetails: React.Dispatch<React.SetStateAction<ApartmentDetails>> }) => {

  const [repoFloorPlan, setRepoFloorPlan] = useState<File[]>(apartmentDetails.floorPlan);
  const [repoBrochure, setRepoBrochure] = useState<File[]>(apartmentDetails.brochure);
  const [repoPriceSheet, setRepoPriceSheet] = useState<File[]>(apartmentDetails.priceSheet);

  useEffect(() => {

    setApartmentDetails({...apartmentDetails, floorPlan: repoFloorPlan, brochure: repoBrochure, priceSheet: repoPriceSheet });

    // eslint-disable-next-line
  }, [repoBrochure, repoFloorPlan, repoPriceSheet]);

  return (
    <>
      <FileUpload labelFor='floorPlan' labelTitle='Floor Plan' files={repoFloorPlan} setFiles={setRepoFloorPlan} />
      <FileUpload labelFor='brochure' labelTitle='Brochures' files={repoBrochure} setFiles={setRepoBrochure} />
      <FileUpload labelFor='priceSheet' labelTitle='Price Sheet' files={repoPriceSheet} setFiles={setRepoPriceSheet} />
    </>
  )
}

const Page6 = ({apartmentDetails, setApartmentDetails, changeApartmentDetails}: {apartmentDetails: ApartmentDetails, setApartmentDetails: React.Dispatch<React.SetStateAction<ApartmentDetails>>, changeApartmentDetails: (e: React.ChangeEvent<HTMLInputElement>) => void}) => {

  return (
    <>
      <BHKType apartmentDetails={apartmentDetails} setApartmentDetails={setApartmentDetails} />
      <FormInput labelFor='videoLink' labelTitle='Video Link' inputType='text' inputName='videoLink' placeholder='Video Link (https only)' value={apartmentDetails.videoLink} setValue={changeApartmentDetails} />
    </>
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
      <FormInput labelFor='reraId' labelTitle='RERA ID' inputType='text' inputName='reraId' placeholder='12121232' value={apartmentDetails.reraId} setValue={changeApartmentDetails} />
      <FormInput labelFor='projectHighlightPoints' labelTitle='Project Highlight Points' inputType='text' inputName='projectHighlightPoints' placeholder='Project Highlight Points' value={apartmentDetails.projectHighlightPoints} setValue={changeApartmentDetails} />
      <FileUpload labelFor='certificates' labelTitle='Upload Certificates' files={repoCertificates} setFiles={setRepoCertificates} />
    </>
  )
}