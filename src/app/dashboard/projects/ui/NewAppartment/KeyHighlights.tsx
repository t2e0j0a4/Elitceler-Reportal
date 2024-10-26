import React, { useState } from 'react';
import styles from "./NewAppartment.module.css";

// Types
import { ApartmentDetails } from '@/types';

// Components
import FormSelect from '@/components/FormSelect/FormSelect';

// Utils
import createToast from '@/utils/createToast';

// React Icons
import { IoClose } from 'react-icons/io5';

const KeyHighlights = ({apartmentDetails, setApartmentDetails}: {apartmentDetails: ApartmentDetails, setApartmentDetails: React.Dispatch<React.SetStateAction<ApartmentDetails>>}) => {
  
    const highlightScope = [
        {id: "1", name: "Schools"},
        {id: "2", name: "Offices"},
        {id: "3", name: "Restaurent"},
        {id: "4", name: "Hospital"},
        {id: "5", name: "Collage"},
        {id: "6", name: "Pharmacy"},
    ]
    
    const [selectedHighlightScope, setselectedHighlightScope] = useState<{
        id: string,
        name: string
    }>({
        id: '',
        name: ''
    })

    const [highlightOtherInfo, setHighlightOtherInfo] = useState({
        destination: '',
        timeTaken: ''
    })

    const changeHighlight = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHighlightOtherInfo({
          ...highlightOtherInfo, [e.target.name]: e.target.value
        })
    }

    const addNewHighlight = () => {
        if (selectedHighlightScope.id && selectedHighlightScope.name && highlightOtherInfo.destination && highlightOtherInfo.timeTaken) {

            const newHighlight = `${selectedHighlightScope.name} ${highlightOtherInfo.destination}-${highlightOtherInfo.timeTaken}`;

            setApartmentDetails({
                ...apartmentDetails, nearByHighlights: [...apartmentDetails.nearByHighlights, newHighlight]
            })

            setselectedHighlightScope({
                id: '',
                name: ''
            });

            setHighlightOtherInfo({
                destination: '',
                timeTaken: ''
            })
            
        } else {
            createToast('error', 'Fill fields to add highlight.');
        }
    }

    const removeHighlight = (option: string) => {
        const newOptions = apartmentDetails.nearByHighlights.filter((opt) => opt !== option);

        setApartmentDetails({
            ...apartmentDetails, nearByHighlights: newOptions
        })
    }
  
    return (
        <>
            <div className={styles.key__highlights}>
                <FormSelect options={highlightScope} optionPlaceholder='Key Highlights' selectedOption={selectedHighlightScope} setSelectedOption={setselectedHighlightScope} />
                <input type="text" name='destination' placeholder='Destination - Distance(km)' title='Destination - Distance' value={highlightOtherInfo.destination} onChange={changeHighlight} />
                <input type="text" name='timeTaken' placeholder='Time Taken' title='Time Taken' value={highlightOtherInfo.timeTaken} onChange={changeHighlight} />
                <button type='button' title='Add' aria-label='Add' onClick={addNewHighlight}>Add</button>
            </div>

            <div className={`${styles.all__options} ${styles.highlight__options}`}>
                {apartmentDetails.nearByHighlights.map((option, index) => (
                    option ? (<span key={index}>{option} <button type="button" title="Remove" onClick={() => removeHighlight(option)}><IoClose /></button></span>) : <></>
                ))}
            </div>
        </>
  )
}

export default KeyHighlights