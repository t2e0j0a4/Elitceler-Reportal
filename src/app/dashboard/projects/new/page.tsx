"use client";
import React, { useEffect, useState } from 'react';
import styles from "./page.module.css";

// UI & Components
import NewPlot from '../ui/NewPlot/NewPlot';
import NewVilla from '../ui/NewVilla/NewVilla';
import FormSelect from '@/components/FormSelect/FormSelect';
import NewAppartment from '../ui/NewAppartment/NewAppartment';

// Data
import { fetchedBuilders } from '@/data';

const NewProject = () => {

    const { approvedBuilders } = fetchedBuilders;

    const [selectedBuilder, setSelectedBuilder] = useState<{
        id: string,
        name: string
    }>({
        id: '',
        name: ''
    })

    useEffect(() => {
        if (!selectedBuilder.id) {
            setProjectType('none');
        }
    }, [selectedBuilder])

    const [projectType, setProjectType] = useState<'appartment' | 'villa' | 'plot' | 'none'>('none')

    return (
        <>
        
        {/* Head */}

        <div className={styles.dashboard__head}>
            <h1>New Project</h1>
        </div>

        {/* Head */}

        {/* Buttons to add a project */}

        <div className={styles.new__project}>

            <div className={styles.select__builder}>
                <FormSelect options={approvedBuilders} optionPlaceholder='Select a builder' setSelectedOption={setSelectedBuilder} selectedOption={selectedBuilder}  />
            </div>

            <div className={styles.new__btns}>
                <button type='button' disabled={selectedBuilder.id ? false : true} onClick={(e) => {
                    setProjectType('appartment');
                    
                }} aria-disabled={selectedBuilder.id ? false : true} aria-label='Add Appartment' title='Add Appartment'>Add Appartment</button>
                <button type='button' disabled={selectedBuilder.id ? false : true} onClick={(e) => {
                    setProjectType('villa');
                    
                }} aria-disabled={selectedBuilder.id ? false : true} aria-label='Add Villa' title='Add Villa'>Add Villa</button>
                <button type='button' disabled={selectedBuilder.id ? false : true} onClick={(e) => {
                    setProjectType('plot');
                    
                }} aria-disabled={selectedBuilder.id ? false : true} aria-label='Add Plot' title='Add Plot'>Add Plot</button>
            </div>

        </div>   

        {/* Buttons to add a project */}

        {/* Add project form */}

        <section className={styles.project__main}>
            {
                projectType === 'appartment' && selectedBuilder.id ? 
                <NewAppartment builderId={selectedBuilder.id} /> : 
                projectType === 'plot' && selectedBuilder.id ? 
                <NewPlot builderId={selectedBuilder.id}/> : 
                projectType === 'villa' && selectedBuilder.id ? 
                <NewVilla builderId={selectedBuilder.id} /> : 
                <></>
            }
        </section>

        {/* Add project form */}

        </>
    )
}

export default NewProject;