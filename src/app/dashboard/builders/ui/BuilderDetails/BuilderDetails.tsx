import React, {useState, useEffect,useRef} from 'react'
import styles from "./BuilderDetails.module.css";

// React Icons
import { IoClose } from "react-icons/io5";

const BuilderDetails = ({selectedBuilderId, setSelectedBuilderId}: {selectedBuilderId: string, setSelectedBuilderId: React.Dispatch<React.SetStateAction<string>>}) => {
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

                <div className={styles.details__main}></div>

                {/* Details */}
                

            </div>

        </aside>
    )
}

export default BuilderDetails;