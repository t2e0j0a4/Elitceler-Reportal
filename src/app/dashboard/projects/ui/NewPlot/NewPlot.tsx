"use client";
import styles from "./NewPlot.module.css";
import React, { useState, useEffect } from 'react';

// Types
import { PlotDetails } from '@/types';

// Components
import FormInput from '@/components/FormInput/FormInput';
import FormSelect from '@/components/FormSelect/FormSelect';
import FileUpload from '@/components/FileUpload/FileUpload';

const NewPlot = () => {

  const [pages, setPages] = useState<{
    currentPage: number;
    totalPage: number
  }>({
    totalPage: 3,
    currentPage: 1
  });

  const [plotDetails, setPlotDetails] = useState<PlotDetails>({
    plotName: '',
    plotLocation: '',
    plotLayoutSize: '',
    plotType: '',
    approvals: '',
    totalPlots: '',
    plotSizes: '',
    plotFacing: '',
    reraId: '',
    pricePerSqYard: '',
    priceStartFrom: '',
    amenities: '',

    siteMap: [],
    masterPlan: [],

    amenitiesImages: [],
    plotImages: [],
    projectHighlightPoints: ''
  });

  const changePlotDetails = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlotDetails({
      ...plotDetails, [e.target.name]: e.target.value
    })
  }

  return (
    <form className={styles.form} onSubmit={(e) => {
      e.preventDefault();
    }}>

      <div className={styles.form__head}>
        <h2>Add <span>Plot</span></h2>
        <span>Page {pages.currentPage}/{pages.totalPage}</span>
      </div>
      
      <div className={styles.form__main}>
        {
          pages.currentPage === 1 ? (
            <Page1 plotDetails={plotDetails} setPlotDetails={setPlotDetails} changePlotDetails={changePlotDetails} />
          ) : pages.currentPage === 2 ? (
            <Page2 plotDetails={plotDetails} setPlotDetails={setPlotDetails} />
          ) : pages.currentPage === 3 ? (
            <Page3 plotDetails={plotDetails} setPlotDetails={setPlotDetails} changePlotDetails={changePlotDetails} />
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

export default NewPlot;

const Page1 = ({plotDetails, setPlotDetails, changePlotDetails}: {plotDetails: PlotDetails, setPlotDetails: React.Dispatch<React.SetStateAction<PlotDetails>>, changePlotDetails: (e: React.ChangeEvent<HTMLInputElement>) => void}) => {

  const plotTypeOptions = [
    {id: '1', name: 'Farm Land Ventures'},
    {id: '2', name: 'Plotting Ventures'},
    {id: '3', name: 'Villa Plots Ventures'},
    {id: '4', name: 'Residential Open Plot'}
  ];

  const plotFacingOptions = [
    {id: '1', name: 'East'},
    {id: '2', name: 'West'},
    {id: '3', name: 'North'},
    {id: '4', name: 'South'}
  ];

  const [selectedPlotFacing, setSelectedPlotFacing] = useState<{
    id: string,
    name: string
  }>({
      id: '',
      name: plotDetails.plotFacing
  })

  const [selectedPlotType, setSelectedPlotType] = useState<{
    id: string,
    name: string
  }>({
      id: '',
      name: plotDetails.plotType
  })

  useEffect(() => {

    if (selectedPlotFacing.id && selectedPlotFacing.name) {
      setPlotDetails({...plotDetails, plotFacing: selectedPlotFacing.name})
    }

    if (selectedPlotType.id && selectedPlotType.name) {
      setPlotDetails({...plotDetails, plotType: selectedPlotType.name})
    }

    // eslint-disable-next-line
  }, [selectedPlotType, selectedPlotFacing]);

  return (
    <>
      <FormInput labelFor='plotName' labelTitle='Plot Name' inputType='text' inputName='plotName' placeholder='Ex: Balaji Plot' value={plotDetails.plotName} setValue={changePlotDetails} />
      <FormInput labelFor='plotLocation' labelTitle='Plot Location' inputType='text' inputName='plotLocation' placeholder='Ex: Uppal' value={plotDetails.plotLocation} setValue={changePlotDetails} />
      <FormInput labelFor='plotLayoutSize' labelTitle='Plot Layout Size' inputType='text' inputName='plotLayoutSize' placeholder='Ex: 100 Acres' value={plotDetails.plotLayoutSize} setValue={changePlotDetails} />
      <FormSelect options={plotTypeOptions} optionPlaceholder='Plot Types' selectedOption={selectedPlotType} setSelectedOption={setSelectedPlotType} />
      <div className={styles.multi__fields}>
        <FormInput labelFor='approvals' labelTitle='Approvals' inputType='text' inputName='approvals' placeholder='Ex: DTCP' value= {plotDetails.approvals} setValue={changePlotDetails} />
        <FormInput labelFor='totalPlots' labelTitle='Total Plots' inputType='text' inputName='totalPlots' placeholder='Ex: 50' value= {plotDetails.totalPlots} setValue={changePlotDetails} />
      </div>
      <div className={styles.multi__fields}>
        <FormInput labelFor='plotSizes' labelTitle='Plot Sizes' inputType='text' inputName='plotSizes' placeholder='Ex: 1250' value= {plotDetails.plotSizes} setValue={changePlotDetails} />
        <FormSelect options={plotFacingOptions} optionPlaceholder='Plot Facing' selectedOption={selectedPlotFacing} setSelectedOption={setSelectedPlotFacing} />
      </div>
      <FormInput labelFor='reraId' labelTitle='RERA ID' inputType='text' inputName='reraId' placeholder='Ex: AB12121442' value={plotDetails.reraId} setValue={changePlotDetails} />
      <FormInput labelFor='pricePerSqYard' labelTitle='Price/Sq.Yard' inputType='text' inputName='pricePerSqYard' placeholder='Ex: 10000' value={plotDetails.pricePerSqYard} setValue={changePlotDetails} />
      <FormInput labelFor='priceStartFrom' labelTitle='Price starts from' inputType='text' inputName='priceStartFrom' placeholder='Ex: 5000' value={plotDetails.priceStartFrom} setValue={changePlotDetails} />
      <FormInput labelFor='amenities' labelTitle='Amenities' inputType='text' inputName='amenities' placeholder='Amenities' value={plotDetails.amenities} setValue={changePlotDetails} />
    </>
  )
}

const Page2 = ({plotDetails, setPlotDetails}: {plotDetails: PlotDetails, setPlotDetails: React.Dispatch<React.SetStateAction<PlotDetails>>}) => {

  const [repoSiteMap, setRepoSiteMap] = useState<File[]>(plotDetails.siteMap);
  const [repoMasterPlan, setRepoMasterPlan] = useState<File[]>(plotDetails.masterPlan);

  useEffect(() => {

    setPlotDetails({...plotDetails, siteMap: repoSiteMap, masterPlan: repoMasterPlan});

    // eslint-disable-next-line
  }, [repoSiteMap, repoMasterPlan]);

  return (
    <>
      <FileUpload labelFor='siteMap' labelTitle='Site Maps' files={repoSiteMap} setFiles={setRepoSiteMap} />
      <FileUpload labelFor='masterPlan' labelTitle='Master Plan' files={repoMasterPlan} setFiles={setRepoMasterPlan} />
    </>
  )
}

const Page3 = ({plotDetails, setPlotDetails, changePlotDetails}: {plotDetails: PlotDetails, setPlotDetails: React.Dispatch<React.SetStateAction<PlotDetails>>, changePlotDetails: (e: React.ChangeEvent<HTMLInputElement>) => void}) => {

  const [repoAmenitiesImages, setRepoAmenitiesImages] = useState<File[]>(plotDetails.amenitiesImages);
  const [repoPlotImages, setRepoPlotImages] = useState<File[]>(plotDetails.plotImages);

  useEffect(() => {

    setPlotDetails({...plotDetails, plotImages: repoPlotImages, amenitiesImages: repoAmenitiesImages});

    // eslint-disable-next-line
  }, [repoPlotImages, repoAmenitiesImages]);

  return (
    <>
      <FileUpload labelFor='amenitiesImages' labelTitle='Amenities Images' files={repoAmenitiesImages} setFiles={setRepoAmenitiesImages} />
      <FileUpload labelFor='plotImages' labelTitle='Plot Images' files={repoPlotImages} setFiles={setRepoPlotImages} />
      <FormInput labelFor='projectHighlightPoints' labelTitle='Project Highlight Points' inputType='text' inputName='projectHighlightPoints' placeholder='Project Highlight Points' value={plotDetails.projectHighlightPoints} setValue={changePlotDetails} />
    </>
  )
}