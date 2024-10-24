"use client";
import React, { useEffect } from 'react'
import styles from "./ToggleProjectSwitch.module.css";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const ToggleProjectSwitch = () => {

    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

    useEffect(() => {
        const currentProjectType = searchParams.get('projectType');
        params.set('projectType', currentProjectType ? currentProjectType : 'apartment');
        router.replace(`${pathName}?${params.toString()}`);

        // eslint-disable-next-line
    }, []);

    const updateProjectType = (projectType: string) => {
        params.set('projectType', projectType);
        router.replace(`${pathName}?${params.toString()}`);
    }

    return (
        <div className={styles.toggler}>
            <button type='button' className={`${searchParams.get('projectType') === 'apartment' && styles.active}`} title='Apartment' aria-label='Apartment' name='apartment' onClick={(e) => {updateProjectType(e.currentTarget.name)}}>Apartments</button>
            <button type='button' className={`${searchParams.get('projectType') === 'villa' && styles.active}`} title='Villas' aria-label='Villas' name='villa' onClick={(e) => {updateProjectType(e.currentTarget.name)}}>Villas</button>
            <button type='button' className={`${searchParams.get('projectType') === 'plot' && styles.active}`} title='Plots' aria-label='Plots' name='plot' onClick={(e) => {updateProjectType(e.currentTarget.name)}}>Plots</button>
        </div>
    )
}

export default ToggleProjectSwitch