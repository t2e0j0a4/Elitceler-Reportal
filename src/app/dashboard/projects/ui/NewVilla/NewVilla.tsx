"use client";
import styles from "./NewVilla.module.css";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'

// Types
import { VillaDetails } from '@/types';

// Components
import FormInput from '@/components/FormInput/FormInput';
import FormSelect from '@/components/FormSelect/FormSelect';
import FileUpload from '@/components/FileUpload/FileUpload';

// Utils
import createToast from '@/utils/createToast';

// Actions
import { addNewVilla } from '@/actions/projects';

const NewVilla = ({builderId}: {builderId: string}) => {

  const [pages, setPages] = useState<{
    currentPage: number;
    totalPage: number
  }>({
    totalPage: 3,
    currentPage: 1
  })

  const [villaDetails, setVillaDetails] = useState<VillaDetails>({
    villaName: '',
    villaLocation: '',
    villaSize: '',
    villaFacing: '',
    basePricePerSqft: '',
    launchDate: '',
    possessionDate: '',
    villasConfiguration: '',
    villasType: '',
    villaSizeStarting: '',
    villaSizeEnding: '',
    plotSizeStarting: '',
    plotSizeEnding: '',
    priceRangeStarting: '',
    priceRangeEnding: '',
    clubHouseSize: '',
    additionalProvision: '',
    reraID: '',

    siteMap: [],
    masterPlan: [],

    amenitiesImages: [],
    projectHighlightsPoints: ''
  });

  const changeVillaDetails = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVillaDetails({
      ...villaDetails, [e.target.name]: e.target.value
    })
  }

  const [responseLoading, setResponseLoading] = useState(false);

  const router = useRouter();

  return (
    <form className={styles.form} onSubmit={async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append('villaName', villaDetails.villaName ? villaDetails.villaName : '-');
      formData.append('villaLocation', villaDetails.villaLocation ? villaDetails.villaLocation : '-');
      formData.append('villaSize', villaDetails.villaSize ? villaDetails.villaSize : '-');
      formData.append('villaFacing', villaDetails.villaFacing ? villaDetails.villaFacing : '-');
      formData.append('basePricePerSqft', villaDetails.basePricePerSqft ? villaDetails.basePricePerSqft : '-');
      formData.append('launchDate', villaDetails.launchDate ? new Date(villaDetails.launchDate).toISOString() : new Date().toISOString());
      formData.append('possessionDate', villaDetails.possessionDate ? new Date(villaDetails.possessionDate).toISOString() : new Date().toISOString());
      formData.append('villasConfiguration', villaDetails.villasConfiguration ? villaDetails.villasConfiguration : '-');
      formData.append('villaSizeStarting', villaDetails.villaSizeStarting ? villaDetails.villaSizeStarting : '-');
      formData.append('villaSizeEnding', villaDetails.villaSizeEnding ? villaDetails.villaSizeEnding : '-');
      formData.append('plotSizeStarting', villaDetails.plotSizeStarting ? villaDetails.plotSizeStarting : '-');
      formData.append('plotSizeEnding', villaDetails.plotSizeEnding ? villaDetails.plotSizeEnding : '-');
      formData.append('priceRangeStarting', villaDetails.priceRangeStarting ? villaDetails.priceRangeStarting : '-');
      formData.append('priceRangeEnding', villaDetails.priceRangeEnding ? villaDetails.priceRangeEnding : '-');
      formData.append('clubHouseSize', villaDetails.clubHouseSize ? villaDetails.clubHouseSize : '-');
      formData.append('additionalProvision', villaDetails.additionalProvision ? villaDetails.additionalProvision : '-');
      formData.append('reraID', villaDetails.reraID ? villaDetails.reraID : '-');
      formData.append('projectHighlightsPoints', villaDetails.projectHighlightsPoints ? villaDetails.projectHighlightsPoints : '-');
      
      formData.append('noOfVilla', '-');
      
      formData.append('elevationImages', villaDetails.siteMap[0]);

      if (villaDetails.siteMap) {
        villaDetails.siteMap.forEach((file) => {
          formData.append('siteMap', file);
        })
      } else {
        formData.append('siteMap', '');
      }

      if (villaDetails.masterPlan) {
        villaDetails.masterPlan.forEach((file) => {
          formData.append('masterPlan', file);
        })
      } else {
        formData.append('masterPlan', '');
      }

      if (villaDetails.amenitiesImages) {
        villaDetails.amenitiesImages.forEach((file) => {
          formData.append('amenitiesImages', file);
        })
      } else {
        formData.append('amenitiesImages', '');
      }

      setResponseLoading(true);
      const toastId = createToast('loading', 'Adding villa project...');
      const villaAddResponse = await addNewVilla(formData, builderId);

      console.log(villaAddResponse);

      (villaAddResponse.status === 'success') ? (
        createToast('success', villaAddResponse.message, toastId),
        router.push('/dashboard/projects')
      ) : (
        createToast('error', villaAddResponse.message, toastId),
        setResponseLoading(false)
      )


    }}>

      <div className={styles.form__head}>
        <h2>Add <span>Villa</span></h2>
        <span>Page {pages.currentPage}/{pages.totalPage}</span>
      </div>
      
      <div className={styles.form__main}>
        {
          pages.currentPage === 1 ? (
            <Page1 villaDetails={villaDetails} setVillaDetails={setVillaDetails} changeVillaDetails={changeVillaDetails} />
          ) : pages.currentPage === 2 ? (
            <Page2 villaDetails={villaDetails} setVillaDetails={setVillaDetails} />
          ) : pages.currentPage === 3 ? (
            <Page3 villaDetails={villaDetails} setVillaDetails={setVillaDetails} />
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

export default NewVilla;

// *************************************************************************** //

const Page1 = ({villaDetails, setVillaDetails, changeVillaDetails}: {villaDetails: VillaDetails, setVillaDetails: React.Dispatch<React.SetStateAction<VillaDetails>>, changeVillaDetails: (e: React.ChangeEvent<HTMLInputElement>) => void}) => {

  const villaFacingOptions = [
    {id: '1', name: 'East'},
    {id: '2', name: 'West'},
    {id: '3', name: 'North'},
    {id: '4', name: 'South'}
  ];

  const villaTypeOptions = [
    {id: '1', name: 'Simplex'},
    {id: '2', name: 'Duplex'},
    {id: '3', name: 'Triplex'},
  ];
  
  const bhkTypeOptions = [
    {id: '1', name: '2 BHK'},
    {id: '2', name: '2.5 BHK'},
    {id: '3', name: '3 BHK'},
    {id: '4', name: '3.5 BHK'},
    {id: '5', name: '4 BHK'},
  ]

  const [selectedVillaFacing, setSlectedVillaFacing] = useState<{
    id: string,
    name: string
  }>({
      id: '',
      name: villaDetails.villaFacing
  })

  const [selectedVillaType, setSelectedVillaType] = useState<{
    id: string,
    name: string
  }>({
      id: '',
      name: villaDetails.villasType
  })

  const [selectedBHKType, setSelectedBHKType] = useState<{
    id: string,
    name: string
  }>({
      id: '',
      name: villaDetails.villasConfiguration
  })

  useEffect(() => {

    if (selectedVillaFacing.id && selectedVillaFacing.name) {
      setVillaDetails({...villaDetails, villaFacing: selectedVillaFacing.name})
    }

    if (selectedBHKType.id && selectedBHKType.name) {
      setVillaDetails({...villaDetails, villasConfiguration: selectedBHKType.name})
    }

    if (selectedVillaType.id && selectedVillaType.name) {
      setVillaDetails({...villaDetails, villasType: selectedVillaType.name})
    }

    // eslint-disable-next-line
  }, [selectedVillaFacing, selectedBHKType, selectedVillaType]);

  return (
    <>
      <FormInput labelFor='villaName' labelTitle='Villa Name' inputType='text' inputName='villaName' placeholder='Ex: Balaji Villas' value={villaDetails.villaName} setValue={changeVillaDetails} />
      <FormInput labelFor='villaLocation' labelTitle='Villa Location' inputType='text' inputName='villaLocation' placeholder='Ex: Shankarpally' value={villaDetails.villaLocation} setValue={changeVillaDetails} />
      <FormInput labelFor='villaSize' labelTitle='Villa Size' inputType='text' inputName='villaSize' placeholder='Ex: 100 Acres' value={villaDetails.villaSize} setValue={changeVillaDetails} />
      <div className={styles.multi__fields}>
        <FormSelect options={villaFacingOptions} optionPlaceholder='Villa Facing' selectedOption={selectedVillaFacing} setSelectedOption={setSlectedVillaFacing} />
        <FormInput labelFor='basePricePerSqft' labelTitle='Base Price (per sq.ft)' inputType='text' inputName='basePricePerSqft' placeholder='1000' value={villaDetails.basePricePerSqft} setValue={changeVillaDetails} />
      </div>
      <div className={styles.multi__fields}>
        <FormSelect options={villaTypeOptions} optionPlaceholder='Villa Type' selectedOption={selectedVillaType} setSelectedOption={setSelectedVillaType} />
        <FormSelect options={bhkTypeOptions} optionPlaceholder='Villa BHKs' selectedOption={selectedBHKType} setSelectedOption={setSelectedBHKType} />
      </div>
      <div className={styles.multi__fields}>
        <FormInput labelFor='launchDate' labelTitle='Launch Date' inputType='date' inputName='launchDate' placeholder='Launch Date' value={villaDetails.launchDate} setValue={changeVillaDetails} />
        <FormInput labelFor='possessionDate' labelTitle='Possession Date' inputType='date' inputName='possessionDate' placeholder='Possession Date' value={villaDetails.possessionDate} setValue={changeVillaDetails} />
      </div>

      <div className={styles.multi__fields}>
        <FormInput labelFor='villaSizeStarting' labelTitle='Villa Size start from (sq.ft)' inputType='text' inputName='villaSizeStarting' placeholder='Ex: 2000' value={villaDetails.villaSizeStarting} setValue={changeVillaDetails} />
        <FormInput labelFor='villaSizeEnding' labelTitle='Villa Size ends at (sq.ft)' inputType='text' inputName='villaSizeEnding' placeholder='Ex: 5500' value={villaDetails.villaSizeEnding} setValue={changeVillaDetails} />
      </div>

      <div className={styles.multi__fields}>
        <FormInput labelFor='plotSizeStarting' labelTitle='Plot Size starts from (Sq Yards)' inputType='text' inputName='plotSizeStarting' placeholder='Ex: 300' value={villaDetails.plotSizeStarting} setValue={changeVillaDetails} />
        <FormInput labelFor='plotSizeEnding' labelTitle='Plot Size ends at (Sq Yards)' inputType='text' inputName='plotSizeEnding' placeholder='Ex: 600' value={villaDetails.plotSizeEnding} setValue={changeVillaDetails} />
      </div>

      <div className={styles.multi__fields}>
        <FormInput labelFor='priceRangeStarting' labelTitle='Price Range starts from (Cr)' inputType='text' inputName='priceRangeStarting' placeholder='Ex: 4.5' value={villaDetails.priceRangeStarting} setValue={changeVillaDetails} />
        <FormInput labelFor='priceRangeEnding' labelTitle='Price Range ends at (Cr)' inputType='text' inputName='priceRangeEnding' placeholder='Ex: 7.2' value={villaDetails.priceRangeEnding} setValue={changeVillaDetails} />
      </div>

      <FormInput labelFor='clubHouseSize' labelTitle='Club House Size (sq.ft)' inputType='text' inputName='clubHouseSize' placeholder='Ex: 14000' value={villaDetails.clubHouseSize} setValue={changeVillaDetails} />
      <FormInput labelFor='additionalProvision' labelTitle='Additional Provision' inputType='text' inputName='additionalProvision' placeholder='Any additional provisions' value={villaDetails.additionalProvision} setValue={changeVillaDetails} />
      <FormInput labelFor='reraID' labelTitle='RERA ID' inputType='text' inputName='reraID' placeholder='12121232' value={villaDetails.reraID} setValue={changeVillaDetails} />
      <FormInput labelFor='projectHighlightsPoints' labelTitle='Project Highlight Points' inputType='text' inputName='projectHighlightsPoints' placeholder='Project Highlight Points' value={villaDetails.projectHighlightsPoints} setValue={changeVillaDetails} />
    </>
  )
}

const Page2 = ({villaDetails, setVillaDetails}: {villaDetails: VillaDetails, setVillaDetails: React.Dispatch<React.SetStateAction<VillaDetails>>}) => {

  const [repoSiteMap, setRepoSiteMap] = useState<File[]>(villaDetails.siteMap);
  const [repoMasterPlan, setRepoMasterPlan] = useState<File[]>(villaDetails.masterPlan);

  useEffect(() => {

    setVillaDetails({...villaDetails, siteMap: repoSiteMap, masterPlan: repoMasterPlan});

    // eslint-disable-next-line
  }, [repoSiteMap, repoMasterPlan]);

  return (
    <>
      <FileUpload labelFor='siteMap' labelTitle='Site Maps' files={repoSiteMap} setFiles={setRepoSiteMap} />
      <FileUpload labelFor='masterPlan' labelTitle='Master Plan' files={repoMasterPlan} setFiles={setRepoMasterPlan} />
    </>
  )
}

const Page3 = ({villaDetails, setVillaDetails}: {villaDetails: VillaDetails, setVillaDetails: React.Dispatch<React.SetStateAction<VillaDetails>>}) => {

  const [repoAmenities, setRepoAmenities] = useState<File[]>(villaDetails.amenitiesImages);

  useEffect(() => {

    setVillaDetails({...villaDetails, amenitiesImages: repoAmenities });

    // eslint-disable-next-line
  }, [repoAmenities]);

  return (
    <>
      <FileUpload labelFor='amenitiesImages' labelTitle='Amenities' files={repoAmenities} setFiles={setRepoAmenities} />
    </>
  )
}