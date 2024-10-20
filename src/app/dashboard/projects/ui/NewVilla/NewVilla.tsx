"use client";
import React, { useState, useEffect } from 'react'
import styles from "./NewVilla.module.css";

// Types
import { VillaDetails } from '@/types';

// Components
import FormInput from '@/components/FormInput/FormInput';
import FormSelect from '@/components/FormSelect/FormSelect';
import FileUpload from '@/components/FileUpload/FileUpload';

const NewVilla = () => {

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
    basePrice: '',
    launchDate: '',
    possessionDate: '',
    bhkType: '',
    villaType: '',
    villaSizeStart: '',
    villaSizeEnd: '',
    plotSizeStart: '',
    plotSizeEnd: '',
    priceRangeStart: '',
    priceRangeEnd: '',
    clubHouseSize: '',
    additionalProvision: '',
    reraId: '',

    siteMap: [],
    masterPlan: [],

    amenities: [],
    projectHighlightPoints: ''
  });

  const changeVillaDetails = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVillaDetails({
      ...villaDetails, [e.target.name]: e.target.value
    })
  }

  return (
    <form className={styles.form} onSubmit={(e) => {
      e.preventDefault();
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
            <Page3 villaDetails={villaDetails} setVillaDetails={setVillaDetails} changeVillaDetails={changeVillaDetails} />
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
      name: ''
  })

  const [selectedVillaType, setSelectedVillaType] = useState<{
    id: string,
    name: string
  }>({
      id: '',
      name: ''
  })

  const [selectedBHKType, setSelectedBHKType] = useState<{
    id: string,
    name: string
  }>({
      id: '',
      name: ''
  })

  useEffect(() => {

    if (selectedVillaFacing.id && selectedVillaFacing.name) {
      setVillaDetails({...villaDetails, villaFacing: selectedVillaFacing.name})
    }

    if (selectedBHKType.id && selectedBHKType.name) {
      setVillaDetails({...villaDetails, bhkType: selectedBHKType.name})
    }

    if (selectedVillaType.id && selectedVillaType.name) {
      setVillaDetails({...villaDetails, villaType: selectedVillaType.name})
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
        <FormInput labelFor='basePrice' labelTitle='Base Price (per sq.ft)' inputType='text' inputName='basePrice' placeholder='1000' value={villaDetails.basePrice} setValue={changeVillaDetails} />
      </div>
      <div className={styles.multi__fields}>
        <FormSelect options={villaTypeOptions} optionPlaceholder='Villa Type' selectedOption={selectedVillaType} setSelectedOption={setSelectedVillaType} />
        <FormSelect options={bhkTypeOptions} optionPlaceholder='BHK Type' selectedOption={selectedBHKType} setSelectedOption={setSelectedBHKType} />
      </div>
      <div className={styles.multi__fields}>
        <FormInput labelFor='launchDate' labelTitle='Launch Date' inputType='date' inputName='launchDate' placeholder='Launch Date' value={villaDetails.launchDate} setValue={changeVillaDetails} />
        <FormInput labelFor='possessionDate' labelTitle='Possession Date' inputType='date' inputName='possessionDate' placeholder='Possession Date' value={villaDetails.possessionDate} setValue={changeVillaDetails} />
      </div>

      <div className={styles.multi__fields}>
        <FormInput labelFor='villaSizeStart' labelTitle='Villa Size start from (sq.ft)' inputType='text' inputName='villaSizeStart' placeholder='Ex: 2000' value={villaDetails.villaSizeStart} setValue={changeVillaDetails} />
        <FormInput labelFor='villaSizeEnd' labelTitle='Villa Size ends at (sq.ft)' inputType='text' inputName='villaSizeEnd' placeholder='Ex: 5500' value={villaDetails.villaSizeEnd} setValue={changeVillaDetails} />
      </div>

      <div className={styles.multi__fields}>
        <FormInput labelFor='plotSizeStart' labelTitle='Plot Size starts from (Sq Yards)' inputType='text' inputName='plotSizeStart' placeholder='Ex: 300' value={villaDetails.plotSizeStart} setValue={changeVillaDetails} />
        <FormInput labelFor='plotSizeEnd' labelTitle='Plot Size ends at (Sq Yards)' inputType='text' inputName='plotSizeEnd' placeholder='Ex: 600' value={villaDetails.plotSizeEnd} setValue={changeVillaDetails} />
      </div>

      <div className={styles.multi__fields}>
        <FormInput labelFor='priceRangeStart' labelTitle='Price Range starts from (Cr)' inputType='text' inputName='priceRangeStart' placeholder='Ex: 4.5' value={villaDetails.priceRangeStart} setValue={changeVillaDetails} />
        <FormInput labelFor='priceRangeEnd' labelTitle='Price Range ends at (Cr)' inputType='text' inputName='priceRangeEnd' placeholder='Ex: 7.2' value={villaDetails.priceRangeEnd} setValue={changeVillaDetails} />
      </div>

      <FormInput labelFor='clubHouseSize' labelTitle='Club House Size (sq.ft)' inputType='text' inputName='clubHouseSize' placeholder='Ex: 14000' value={villaDetails.clubHouseSize} setValue={changeVillaDetails} />
      <FormInput labelFor='additionalProvision' labelTitle='Additional Provision' inputType='text' inputName='additionalProvision' placeholder='Any additional provisions' value={villaDetails.additionalProvision} setValue={changeVillaDetails} />
      <FormInput labelFor='reraId' labelTitle='RERA ID' inputType='text' inputName='reraId' placeholder='12121232' value={villaDetails.reraId} setValue={changeVillaDetails} />
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

const Page3 = ({villaDetails, setVillaDetails, changeVillaDetails}: {villaDetails: VillaDetails, setVillaDetails: React.Dispatch<React.SetStateAction<VillaDetails>>, changeVillaDetails: (e: React.ChangeEvent<HTMLInputElement>) => void}) => {

  const [repoAmenities, setRepoAmenities] = useState<File[]>(villaDetails.amenities);

  useEffect(() => {

    setVillaDetails({...villaDetails, amenities: repoAmenities });

    // eslint-disable-next-line
  }, [repoAmenities]);

  return (
    <>
      <FileUpload labelFor='amenities' labelTitle='Amenities' files={repoAmenities} setFiles={setRepoAmenities} />
      <FormInput labelFor='projectHighlightPoints' labelTitle='Project Highlight Points' inputType='text' inputName='projectHighlightPoints' placeholder='Project Highlight Points' value={villaDetails.projectHighlightPoints} setValue={changeVillaDetails} />
    </>
  )
}