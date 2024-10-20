"use client";
import FormInput from "@/components/FormInput/FormInput";
import styles from "./AddBuilder.module.css";
import React, {useEffect, useRef, useState} from 'react'

// React Icons
import { IoIosAdd } from 'react-icons/io'
import { IoClose } from "react-icons/io5";

const AddBuilder = () => {

    const [showAddPopup, setShowAddPopup] = useState<boolean>(false);

    return (
        <>
            <button type='button' title='Add Builder' aria-label='Add Builder' onClick={() => {
                setShowAddPopup(true);
            }}><IoIosAdd fontSize={19}/><span>Add Builder</span></button>

            {showAddPopup && <AddBuilderPopup setShowAddPopup={setShowAddPopup}/>}
        </>
    )
}

export default AddBuilder;


const AddBuilderPopup = ({setShowAddPopup}: {setShowAddPopup: React.Dispatch<React.SetStateAction<boolean>>}) => {

    const selectRef = useRef<HTMLDivElement | null>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
            setShowAddPopup(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

        // eslint-disable-next-line
    }, []);

    const [builderDetails, setBuilderDetails] = useState({
        name: '',
        email: '',
        phoneNo: '',
        companyName: ''
    })

    const changeBuilderDetails = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBuilderDetails(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }

    return  (
        <aside className={styles.popup}>

            <div className={styles.popup__details} ref={selectRef}>

                {/* Head */}

                <div className={styles.details__head}>
                    <h3>Add Builder</h3>
                    <button type='button' title='Close' onClick={() => {setShowAddPopup(false)}}><IoClose fontSize={22}/></button>
                </div>

                {/* Head */}

                {/* Form */}

                <form className={styles.add__form} onSubmit={(e) => {
                    e.preventDefault()
                }}>
                    <FormInput labelFor="name" labelTitle="Name" inputName="name" inputType="text" value={builderDetails.name} setValue={changeBuilderDetails} placeholder="Enter name" />
                    <FormInput labelFor="email" labelTitle="Email" inputName="email" inputType="email" value={builderDetails.email} setValue={changeBuilderDetails} placeholder="Enter email" />
                    <FormInput labelFor="phoneNo" labelTitle="Phone Number" inputName="phoneNo" inputType="text" value={builderDetails.phoneNo} setValue={changeBuilderDetails} placeholder="Enter phone number" />
                    <FormInput labelFor="companyName" labelTitle="Company Name" inputName="companyName" inputType="text" value={builderDetails.companyName} setValue={changeBuilderDetails} placeholder="Enter Company name" />

                    <button type="submit" title="Add builder">Add</button>
                </form>

                {/* Form */}


            </div>
        
        </aside>
    )
}