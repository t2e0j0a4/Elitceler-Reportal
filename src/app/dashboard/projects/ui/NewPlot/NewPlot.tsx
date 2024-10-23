"use client";
import styles from "./NewPlot.module.css";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from 'react';

// Types
import { PlotDetails } from '@/types';

// Components
import FormInput from '@/components/FormInput/FormInput';
import FormSelect from '@/components/FormSelect/FormSelect';
import FileUpload from '@/components/FileUpload/FileUpload';

// Utils
import createToast from "@/utils/createToast";

// Actions
import { addNewPlot } from "@/actions/projects";

const NewPlot = ({builderId}: {builderId: string}) => {

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
    reraID: '',
    pricePerSqYard: '',
    priceStartsFrom: '',
    amenities: '',

    siteMap: [],
    masterPlan: [],

    amenitiesImages: [],
    plotImages: [],
    projectHighlightsPoints: ''
  });

  const changePlotDetails = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlotDetails({
      ...plotDetails, [e.target.name]: e.target.value
    })
  }

  const [responseLoading, setResponseLoading] = useState(false);

  const router = useRouter();
  
  return (
    <form className={styles.form} onSubmit={async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append('plotName', plotDetails.plotName ? plotDetails.plotName : '-');
      formData.append('plotLocation', plotDetails.plotLocation ? plotDetails.plotLocation : '-');
      formData.append('plotLayoutSize', plotDetails.plotLayoutSize ? plotDetails.plotLayoutSize : '-');
      formData.append('plotType', plotDetails.plotType ? plotDetails.plotType : '-');
      formData.append('approvals', plotDetails.approvals ? plotDetails.approvals : '-');
      formData.append('totalPlots', plotDetails.totalPlots ? plotDetails.totalPlots : '-');
      formData.append('plotSizes', plotDetails.plotSizes ? plotDetails.plotSizes : '-');
      formData.append('plotFacing', plotDetails.plotFacing ? plotDetails.plotFacing : '-');
      formData.append('reraID', plotDetails.reraID ? plotDetails.reraID : '-');
      formData.append('pricePerSqYard', plotDetails.pricePerSqYard ? plotDetails.pricePerSqYard : '-');
      formData.append('priceStartsFrom', plotDetails.priceStartsFrom ? plotDetails.priceStartsFrom : '-');
      formData.append('amenities', plotDetails.amenities ? plotDetails.amenities : '-');
      formData.append('projectHighlightsPoints', plotDetails.projectHighlightsPoints ? plotDetails.projectHighlightsPoints : '-');

      if (plotDetails.siteMap) {
        plotDetails.siteMap.forEach((file) => {
          formData.append('siteMap', file);
        })
      } else {
        formData.append('siteMap', '');
      }

      if (plotDetails.masterPlan) {
        plotDetails.masterPlan.forEach((file) => {
          formData.append('masterPlan', file);
        })
      } else {
        formData.append('masterPlan', '');
      }

      if (plotDetails.amenitiesImages) {
        plotDetails.amenitiesImages.forEach((file) => {
          formData.append('amenitiesImages', file);
        })
      } else {
        formData.append('amenitiesImages', '');
      }

      if (plotDetails.plotImages) {
        plotDetails.plotImages.forEach((file) => {
          formData.append('plotImages', file);
        })
      } else {
        formData.append('plotImages', '');
      }

      setResponseLoading(true);
      const toastId = createToast('loading', 'Adding plot project...');
      const plotAddResponse = await addNewPlot(formData, builderId);

      (plotAddResponse.status === 'success') ? (
        createToast('success', plotAddResponse.message, toastId),
        router.push('/dashboard/projects')
      ) : (
        createToast('error', plotAddResponse.message, toastId),
        setResponseLoading(false)
      )

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
            <Page3 plotDetails={plotDetails} setPlotDetails={setPlotDetails} />
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
      <FormInput labelFor='reraID' labelTitle='RERA ID' inputType='text' inputName='reraID' placeholder='Ex: AB12121442' value={plotDetails.reraID} setValue={changePlotDetails} />
      <FormInput labelFor='pricePerSqYard' labelTitle='Price/Sq.Yard' inputType='text' inputName='pricePerSqYard' placeholder='Ex: 10000' value={plotDetails.pricePerSqYard} setValue={changePlotDetails} />
      <FormInput labelFor='priceStartsFrom' labelTitle='Price starts from' inputType='text' inputName='priceStartsFrom' placeholder='Ex: 5000' value={plotDetails.priceStartsFrom} setValue={changePlotDetails} />
      <FormInput labelFor='amenities' labelTitle='Amenities' inputType='text' inputName='amenities' placeholder='Ex: Gym, Sports' value={plotDetails.amenities} setValue={changePlotDetails} />
      <FormInput labelFor='projectHighlightsPoints' labelTitle='Project Highlight Points' inputType='text' inputName='projectHighlightsPoints' placeholder='Project Highlight Points' value={plotDetails.projectHighlightsPoints} setValue={changePlotDetails} />
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

const Page3 = ({plotDetails, setPlotDetails}: {plotDetails: PlotDetails, setPlotDetails: React.Dispatch<React.SetStateAction<PlotDetails>> }) => {

  const [repoAmenitiesImages, setRepoAmenitiesImages] = useState<File[]>(plotDetails.amenitiesImages);
  const [repoPlotImages, setRepoPlotImages] = useState<File[]>(plotDetails.plotImages);

  useEffect(() => {

    setPlotDetails({...plotDetails, plotImages: repoPlotImages, amenitiesImages: repoAmenitiesImages });

    // eslint-disable-next-line
  }, [repoPlotImages, repoAmenitiesImages]);

  return (
    <>
      <FileUpload labelFor='amenitiesImages' labelTitle='Amenities Images' files={repoAmenitiesImages} setFiles={setRepoAmenitiesImages} />
      <FileUpload labelFor='plotImages' labelTitle='Plot Images' files={repoPlotImages} setFiles={setRepoPlotImages} />
    </>
  )
}