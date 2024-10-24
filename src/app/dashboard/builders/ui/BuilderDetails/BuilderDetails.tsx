import React, {useState, useEffect,useRef} from 'react'
import styles from "./BuilderDetails.module.css";

// React Icons
import { IoClose } from "react-icons/io5";

// Types
import { BuilderType } from '@/types';

const BuilderDetails = ({selectedBuilderId, setSelectedBuilderId, builders}: {selectedBuilderId: string, setSelectedBuilderId: React.Dispatch<React.SetStateAction<string>>, builders: BuilderType[]}) => {

    const selectRef = useRef<HTMLDivElement | null>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
            setSelectedBuilderId('');
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

        // eslint-disable-next-line
    }, []);

    const [builderDetails, setBuilderDetails] = useState<BuilderType>(builders.filter((b) => b.id === selectedBuilderId)[0]);


    if (!selectedBuilderId) {
        return <></>
    }
    
    return (
        <aside className={styles.popup}>

            <div className={styles.popup__details} ref={selectRef}>
                
                {/* Head */}

                <div className={styles.details__head}>
                    <h3>Builder Details</h3>
                    <button type='button' title='Close' onClick={() => {setSelectedBuilderId('')}}><IoClose fontSize={22}/></button>
                </div>

                {/* Head */}

                {/* Details */}

                <div className={styles.details__main}>
                    <div className={styles.detail}>
                        <p>Builder Name</p>
                        <p>{builderDetails.name ? builderDetails.name : '-'}</p>
                    </div>
                    <div className={styles.detail}>
                        <p>Company Name</p>
                        <p>{builderDetails.CompanyName ? builderDetails.CompanyName : '-'}</p>
                    </div>
                    <div className={styles.detail}>
                        <p>Email</p>
                        <p>{builderDetails.email ? builderDetails.email : '-'}</p>
                    </div>
                    <div className={styles.detail}>
                        <p>Contact Number</p>
                        <p>{builderDetails.phoneNumber ? builderDetails.phoneNumber : '-'}</p>
                    </div>
                    <div className={styles.detail}>
                        <p>Total Projects</p>
                        <p>{builderDetails.projects && builderDetails.projects.length ? builderDetails.projects.length : '0'}</p>
                    </div>
                </div>

                {/* Details */}
                

            </div>

        </aside>
    )
}

export default BuilderDetails;