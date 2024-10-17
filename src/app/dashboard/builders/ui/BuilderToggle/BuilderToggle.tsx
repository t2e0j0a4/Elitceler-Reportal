'use client';
import React, { useEffect } from 'react'
import styles from "./BuilderToggle.module.css";

// Nextjs
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const BuilderToggle = ({approved, rejected, pending}: {approved: number, pending: number, rejected: number}) => {

    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

    useEffect(() => {
        const currentBuilderType = searchParams.get('builder');
        params.set('builder', currentBuilderType ? currentBuilderType : 'approved');
        router.replace(`${pathName}?${params.toString()}`);
        // eslint-disable-next-line
    }, []);
    
    const handleBuilderType = (builderType: 'approved' | 'pending' | 'rejected') => {
        params.set('builder', builderType);
        router.replace(`${pathName}?${params.toString()}`);
    }

    return (
        <div className={styles.builder__toggle}>
            <button type='button' className={`${searchParams.get('builder') === 'approved' && styles.builder__active}`} onClick={() => {handleBuilderType('approved')}}>Approved <span>{approved ? approved : 0}</span></button>
            <button type='button' className={`${searchParams.get('builder') === 'pending' && styles.builder__active}`} onClick={() => {handleBuilderType('pending')}}>Pending <span>{pending ? pending : 0}</span></button>
            <button type='button' className={`${searchParams.get('builder') === 'rejected' && styles.builder__active}`} onClick={() => {handleBuilderType('rejected')}}>Rejected <span>{rejected ? rejected : 0}</span></button>
        </div>
    )
}

export default BuilderToggle