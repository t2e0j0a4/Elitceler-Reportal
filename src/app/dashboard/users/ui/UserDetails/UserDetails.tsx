import React, {useState, useEffect, useRef} from 'react'
import styles from "./UserDetails.module.css";

// React Icons
import { IoClose } from "react-icons/io5";

const UserDetails = ({selectedUserId, setSelectedUserId}: {selectedUserId: string, setSelectedUserId: React.Dispatch<React.SetStateAction<string>>}) => {

    const selectRef = useRef<HTMLDivElement | null>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
            setSelectedUserId('');
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

        // eslint-disable-next-line
    }, []);

    if (!selectedUserId) {
        return <></>
    }

    return (
        <aside className={styles.popup}>

            <div className={styles.popup__details} ref={selectRef}>
                
                {/* Head */}

                <div className={styles.details__head}>
                    <h3>User Details</h3>
                    <button type='button' title='Close' onClick={() => {setSelectedUserId('')}}><IoClose fontSize={22}/></button>
                </div>

                {/* Head */}

                {/* Details */}

                <div className={styles.details__main}></div>

                {/* Details */}
                

            </div>

        </aside>
    )
}

export default UserDetails