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
import FormInput from '@/components/FormInput/FormInput';

const BHKType = ({apartmentDetails, setApartmentDetails}: {apartmentDetails: ApartmentDetails, setApartmentDetails: React.Dispatch<React.SetStateAction<ApartmentDetails>>}) => {

    const bhkType = [
        {id: '1', name: "2 BHK"},
        {id: '2', name: "2.5 BHK"},
        {id: '3', name: "3 BHK"},
        {id: '4', name: "3.5 BHK"},
        {id: '5', name: "4 BHK"},
        {id: '6', name: "4+ BHK"},
    ]

    const [selectedBHK, setselectedBHK] = useState<{
        id: string,
        name: string
    }>({
        id: '',
        name: ''
    })

    const facing = [
        {id: '1', name: 'East'},
        {id: '2', name: 'West'},
        {id: '3', name: 'North'},
        {id: '4', name: 'South'}
    ]

    const [selectedFacing, setSelectedFacing] = useState<{
        id: string,
        name: string
    }>({
        id: '',
        name: ''
    })

    const [otherInfo, setOtherInfo] = useState({
        size: '',
        basePrice: ''
    })

    const changeInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOtherInfo({
          ...otherInfo, [e.target.name]: e.target.value
        })
    }

    const addBHKType = () => {

        if (otherInfo.size && otherInfo.basePrice && selectedBHK.name && selectedFacing.name) {

            const newBHK = `${selectedBHK.name} - ${otherInfo.size} sq.ft - ${selectedFacing.name} - Rs. ${otherInfo.basePrice}`;

            setApartmentDetails({
                ...apartmentDetails, bhkType: [...apartmentDetails.bhkType, newBHK]
            })

            setOtherInfo({
                basePrice: '',
                size: ''
            });

            setselectedBHK({
                id: '',
                name: ''
            });

            setSelectedFacing({
                id: '',
                name: ''
            })

        } else {
            createToast('error', 'Fill fields to add highlight.');
        }
    }

    const removeBHK = (option: string) => {
        const newOptions = apartmentDetails.bhkType.filter((opt) => opt !== option);

        setApartmentDetails({
            ...apartmentDetails, bhkType: newOptions
        })
    }

    return (
        <>
            <div className={`${styles.key__highlights} ${styles.bhks__type}`}>
                <FormSelect options={bhkType} optionPlaceholder='BHK Type' selectedOption={selectedBHK} setSelectedOption={setselectedBHK} />
                <FormInput labelFor='size' labelTitle='Size (sq.ft)' inputName='size' inputType='text' value={otherInfo.size} setValue={changeInfo} placeholder='Ex: 1450' />
                <FormSelect options={facing} optionPlaceholder='Facing' selectedOption={selectedFacing} setSelectedOption={setSelectedFacing} />
                <FormInput labelFor='basePrice' labelTitle='Base Price' inputName='basePrice' inputType='text' value={otherInfo.basePrice} setValue={changeInfo} placeholder='Ex: 2400000' />
                <button type='button' title='Add' onClick={addBHKType}>Add</button>
            </div>

            <div className={`${styles.all__options} ${styles.highlight__options}`}>
                {apartmentDetails.bhkType.map((option, index) => (
                    option ? (<span key={index}>{option} <button type="button" title="Remove" onClick={() => removeBHK(option)}><IoClose /></button></span>) : <></>
                ))}
            </div>
        </>
    )
}

export default BHKType;