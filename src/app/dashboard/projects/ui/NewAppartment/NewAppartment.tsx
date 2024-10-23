"use client";
import { useRouter } from 'next/navigation';
import styles from "./NewAppartment.module.css";
import React, {useEffect, useState} from 'react';

// Components
import BHKType from './BHKType';
import KeyHighlights from './KeyHighlights';
import FormInput from '@/components/FormInput/FormInput';
import FormSelect from '@/components/FormSelect/FormSelect';
import FileUpload from '@/components/FileUpload/FileUpload';

// Types
import { ApartmentDetails } from '@/types';

// React Icons
import { IoClose } from 'react-icons/io5';

// Utils
import createToast from '@/utils/createToast';

// Actions
import { addNewApartment } from '@/actions/projects';

const NewAppartment = ({builderId} : {builderId: string}) => {

  const [pages, setPages] = useState<{
    currentPage: number;
    totalPage: number
  }>({
    totalPage: 7,
    currentPage: 1
  })

  const [apartmentDetails, setApartmentDetails] = useState<ApartmentDetails>({
    name: '',
    description: '',
    projectType: '',
    projectLaunchedDate: new Date().toISOString().split("T")[0],
    projectPossessionDate: new Date().toISOString().split("T")[0],
    pricePerSquareFeetRate: '',
    totalArea: '',
    latitude: '',
    longitude: '',
    landmark: '-',
    projectSize: '',
    noOfFloors: '',
    noOfFlats: '',
    noOfFlatsPerFloor: '',
    noOfTowers: '',
    projectLocation: '',
    constructionType: '',
    ClubHouseSize: '',
    totalOpenSpace: '',
    videoLink: '',
    reraID: '',
    projectHighlightsPoints: '',

    amenities: [],
    clubHouseAmenities: [],
    OutdoorAmenities: [],
    nearByHighlights: [],
    
    bhkType: [],

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

  const [responseLoading, setResponseLoading] = useState(false);

  const router = useRouter();

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


      // May change in future
      
      formData.append('bhkType', apartmentDetails.bhkType ? apartmentDetails.bhkType.join(', ').trim() : '-');
      formData.append('sizeInSqft', '--');
      formData.append('facing', '--');
      formData.append('basePrice', '--');

      if (apartmentDetails.siteMap) {
        apartmentDetails.siteMap.forEach((file) => {
          formData.append('siteMap', file);
        })
      } else {
        formData.append('siteMap', '');
      }

      if (apartmentDetails.masterPlan) {
        apartmentDetails.masterPlan.forEach((file) => {
          formData.append('masterPlan', file);
        })
      } else {
        formData.append('masterPlan', '');
      }

      if (apartmentDetails.projectHighlights) {
        apartmentDetails.projectHighlights.forEach((file) => {
          formData.append('projectHighlights', file);
        })
      } else {
        formData.append('projectHighlights', '');
      }

      if (apartmentDetails.elevationImages) {
        apartmentDetails.elevationImages.forEach((file) => {
          formData.append('elevationImages', file);
        })
      } else {
        formData.append('elevationImages', '');
      }

      if (apartmentDetails.amenitiesImages) {
        apartmentDetails.amenitiesImages.forEach((file) => {
          formData.append('amenitiesImages', file);
        })
      } else {
        formData.append('amenitiesImages', '');
      }

      if (apartmentDetails.floorPlanPdf) {
        apartmentDetails.floorPlanPdf.forEach((file) => {
          formData.append('floorPlanPdf', file);
        })
      } else {
        formData.append('floorPlanPdf', '');
      }

      if (apartmentDetails.brochurePdf) {
        apartmentDetails.brochurePdf.forEach((file) => {
          formData.append('brochurePdf', file);
        })
      } else {
        formData.append('brochurePdf', '');
      }

      if (apartmentDetails.priceSheet) {
        apartmentDetails.priceSheet.forEach((file) => {
          formData.append('priceSheet', file);
        })
      } else {
        formData.append('priceSheet', '');
      }

      if (apartmentDetails.reraCertificate) {
        apartmentDetails.reraCertificate.forEach((file) => {
          formData.append('reraCertificate', file);
        })
      } else {
        formData.append('reraCertificate', '');
      }

      setResponseLoading(true);

      const toastId = createToast('loading', 'Adding apartment project...');
      const apartmentAddResponse = await addNewApartment(formData, builderId);

      console.log(apartmentAddResponse);

      (apartmentAddResponse.status === 'success') ? (
        createToast('success', apartmentAddResponse.message, toastId),
        setResponseLoading(false),
        router.push('/dashboard/projects')
      ) : (
        createToast('error', apartmentAddResponse.message, toastId),
        setResponseLoading(false)
      )

      

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
      <FormInput labelFor='name' labelTitle='Project Name' inputType='text' inputName='name' placeholder='Ex: Balaji Heights' value={apartmentDetails.name} setValue={changeApartmentDetails} />
      <FormInput labelFor='description' labelTitle='Description' inputType='text' inputName='description' placeholder='Describe your property' value={apartmentDetails.description} setValue={changeApartmentDetails} />
      <FormSelect options={projectTypeOptions} optionPlaceholder='Select project type' selectedOption={selectedProjectType} setSelectedOption={setSelectedProjectType} />
      <div className={styles.multi__fields}>
        <FormInput labelFor='projectLaunchedDate' labelTitle='Launch Date' inputType='date' inputName='projectLaunchedDate' placeholder='Launch Date' value={apartmentDetails.projectLaunchedDate} setValue={changeApartmentDetails} />
        <FormInput labelFor='projectPossessionDate' labelTitle='Possession Date' inputType='date' inputName='projectPossessionDate' placeholder='Possession Date' value={apartmentDetails.projectPossessionDate} setValue={changeApartmentDetails} />
      </div>
      <div className={styles.multi__fields}>
        <FormInput labelFor='pricePerSquareFeetRate' labelTitle='Base Price (INR)' inputType='text' inputName='pricePerSquareFeetRate' placeholder='Ex: 25000' value={apartmentDetails.pricePerSquareFeetRate} setValue={changeApartmentDetails} />
        <FormInput labelFor='totalArea' labelTitle='Total Area (Sq.ft)' inputType='text' inputName='totalArea' placeholder='Ex: 10000' value={apartmentDetails.totalArea} setValue={changeApartmentDetails} />
      </div>
      <div className={styles.multi__fields}>
        <FormInput labelFor='projectSize' labelTitle='Project Size (in acres)' inputType='text' inputName='projectSize' placeholder='Ex: 25' value={apartmentDetails.projectSize} setValue={changeApartmentDetails} />
        <FormInput labelFor='noOfFloors' labelTitle='No of Floors' inputType='text' inputName='noOfFloors' placeholder='Ex: 5' value={apartmentDetails.noOfFloors} setValue={changeApartmentDetails} />
      </div>
      <div className={styles.multi__fields}>
        <FormInput labelFor='noOfFlats' labelTitle='No of Flats' inputType='text' inputName='noOfFlats' placeholder='Ex: 25' value={apartmentDetails.noOfFlats} setValue={changeApartmentDetails} />
        <FormInput labelFor='noOfFlatsPerFloor' labelTitle='No of Flats per Floor' inputType='text' inputName='noOfFlatsPerFloor' placeholder='Ex: 5' value={apartmentDetails.noOfFlatsPerFloor} setValue={changeApartmentDetails} />
      </div>
      <div className={styles.multi__fields}>
        <FormInput labelFor='noOfTowers' labelTitle='No of Towers' inputType='text' inputName='noOfTowers' placeholder='Ex: 5' value={apartmentDetails.noOfTowers} setValue={changeApartmentDetails} />
        <FormInput labelFor='projectLocation' labelTitle='Project projectLocation' inputType='text' inputName='projectLocation' placeholder='Enter project location' value={apartmentDetails.projectLocation} setValue={changeApartmentDetails} />
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

  const [repoamenities, setRepoamenities] = useState(apartmentDetails.amenities ? apartmentDetails.amenities.join(',') : '');
  const [repoOutdoorAmenities, setRepoOutdoorAmenities] = useState(apartmentDetails.OutdoorAmenities ? apartmentDetails.OutdoorAmenities.join(',') : '');
  const [repoClubHouseAmenities, setRepoClubHouseAmenities] = useState(apartmentDetails.clubHouseAmenities ? apartmentDetails.clubHouseAmenities.join(',') : '');

  const changeAmenitiesValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepoamenities(e.target.value);
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
    console.log(apartmentDetails.amenities)
  }

  useEffect(() => {
    
    const amenities = repoamenities ? repoamenities.split(',').map((value: string) => value.trim()): []; 
    const OutdoorAmenities = repoOutdoorAmenities ? repoOutdoorAmenities.split(',').map((value: string) => value.trim()) : []; 
    const clubHouseAmenities = repoClubHouseAmenities ? repoClubHouseAmenities.split(',').map((value: string) => value.trim()) : []; 

    setApartmentDetails({
      ...apartmentDetails, amenities, OutdoorAmenities, clubHouseAmenities
    });

    // eslint-disable-next-line
  }, [repoamenities, repoOutdoorAmenities, repoClubHouseAmenities]);

  return (
    <>
      <>
        <FormInput labelFor='amenities' labelTitle='Amenities (comma seperated)' inputType='text' inputName='amenities' placeholder='Ex: Gym, School, Garden' value={repoamenities} setValue={changeAmenitiesValue} />
        <div className={styles.all__options}>
          {apartmentDetails.amenities.map((option, index) => (
            option ? (<span key={index}>
              {option} 
              <button type="button" title="Remove" onClick={() => {
                handleOptionSelect(option, apartmentDetails.amenities, 'amenities', setRepoamenities);
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
        <FormInput labelFor='OutdoorAmenities' labelTitle='Outdoor Amenities (comma seperated)' inputType='text' inputName='outdoorAmenities' placeholder='Ex: Park, Tennis court' value={repoOutdoorAmenities} setValue={changeOutdoorAmenities} />
        <div className={styles.all__options}>
          {apartmentDetails.OutdoorAmenities.map((option, index) => (
            option ? (<span key={index}>
              {option} 
              <button type="button" title="Remove" onClick={() => {
                handleOptionSelect(option, apartmentDetails.OutdoorAmenities, 'OutdoorAmenities', setRepoOutdoorAmenities);
              }}><IoClose /></button>
            </span>) : <></>
          ))}
        </div>
      </>

      <KeyHighlights apartmentDetails={apartmentDetails} setApartmentDetails={setApartmentDetails} />

      <FormSelect options={constructionTypes} optionPlaceholder='Select construction type' selectedOption={selctedConstructionType} setSelectedOption={setSelctedConstructionType} />
      <FormInput labelFor='ClubHouseSize' labelTitle='Club House Size' inputType='text' inputName='ClubHouseSize' placeholder='Enter Club house size' value={apartmentDetails.ClubHouseSize} setValue={changeApartmentDetails} />
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
  const [repoAmenities, setrepoAmenities] = useState<File[]>(apartmentDetails.amenitiesImages);

  useEffect(() => {

    setApartmentDetails({...apartmentDetails, elevationImages: repoElevationImages, amenitiesImages: repoAmenities });

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

  const [repoFloorPlan, setRepoFloorPlan] = useState<File[]>(apartmentDetails.floorPlanPdf);
  const [repoBrochure, setRepoBrochure] = useState<File[]>(apartmentDetails.brochurePdf);
  const [repoPriceSheet, setRepoPriceSheet] = useState<File[]>(apartmentDetails.priceSheet);

  useEffect(() => {

    setApartmentDetails({...apartmentDetails, floorPlanPdf: repoFloorPlan, brochurePdf: repoBrochure, priceSheet: repoPriceSheet });

    // eslint-disable-next-line
  }, [repoBrochure, repoFloorPlan, repoPriceSheet]);

  return (
    <>
      <FileUpload labelFor='floorPlanPdf' labelTitle='Floor Plan' files={repoFloorPlan} setFiles={setRepoFloorPlan} />
      <FileUpload labelFor='brochurePdf' labelTitle='Brochures' files={repoBrochure} setFiles={setRepoBrochure} />
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

  const [repoCertificates, setRepoCertificates] = useState<File[]>(apartmentDetails.reraCertificate);

  useEffect(() => {

    setApartmentDetails({...apartmentDetails, reraCertificate: repoCertificates });

    // eslint-disable-next-line
  }, [repoCertificates]);

  return (
    <>
      <FormInput labelFor='reraID' labelTitle='RERA ID' inputType='text' inputName='reraID' placeholder='12121232' value={apartmentDetails.reraID} setValue={changeApartmentDetails} />
      <FormInput labelFor='projectHighlightsPoints' labelTitle='Project Highlight Points' inputType='text' inputName='projectHighlightsPoints' placeholder='Project Highlight Points' value={apartmentDetails.projectHighlightsPoints} setValue={changeApartmentDetails} />
      <FileUpload labelFor='reraCertificate' labelTitle='Upload Certificates' files={repoCertificates} setFiles={setRepoCertificates} />
    </>
  )
}