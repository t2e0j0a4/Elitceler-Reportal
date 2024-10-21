"use client";
import styles from "./AddBuilder.module.css";
import React, {useEffect, useRef, useState} from 'react'

// React Icons
import { IoIosAdd } from 'react-icons/io'
import { IoClose } from "react-icons/io5";

// Utils
import createToast from "@/utils/createToast";

// UI
import FormInput from "@/components/FormInput/FormInput";
import { newBuilder } from "@/actions/builder";

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
        password: ''
    })

    const changeBuilderDetails = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBuilderDetails(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }

    const [responseLoading, setResponseLoading] = useState(false);

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

                <form className={styles.add__form} onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    setResponseLoading(true);
                    const toastId = createToast('loading', 'Submitting details...');
                    const response = await newBuilder(formData);
                    (response === undefined) ? (
                        createToast('success', 'Builder created successfully!', toastId),
                        setShowAddPopup(false)
                    ) : (
                        createToast('error', response.message, toastId),
                        setResponseLoading(false)
                    );
                }}>
                    <FormInput labelFor="name" labelTitle="Name" inputName="name" inputType="text" value={builderDetails.name} setValue={changeBuilderDetails} placeholder="Enter name" />
                    <FormInput labelFor="email" labelTitle="Email" inputName="email" inputType="email" value={builderDetails.email} setValue={changeBuilderDetails} placeholder="Enter email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />
                    <FormInput labelFor="phoneNo" labelTitle="Phone Number" inputName="phoneNo" inputType="text" value={builderDetails.phoneNo} setValue={changeBuilderDetails} placeholder="Enter phone number" />
                    <FormInput labelFor="password" labelTitle="Password" inputName="password" inputType="password" value={builderDetails.password} setValue={changeBuilderDetails} placeholder="Enter Password" />

                    <button type="submit" disabled={responseLoading} title="Add builder">{responseLoading ? (
                        <div className={styles.basic}></div>
                        ) : 'Add builder'}
                    </button>
                </form>

                {/* Form */}


            </div>
        
        </aside>
    )
}