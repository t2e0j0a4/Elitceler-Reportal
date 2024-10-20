import React from 'react'
import styles from "./FormInput.module.css";

const FormInput = ({labelFor, labelTitle, inputName, placeholder, inputType, value, setValue}: {labelFor: string, labelTitle: string, inputName: string, placeholder: string, inputType: 'text' | 'date' | 'number' | 'email' | 'password', value: string, setValue: (e: React.ChangeEvent<HTMLInputElement>) => void}) => {
  return (
    <div className={styles.form__input}>
        <label htmlFor={labelFor}>{labelTitle}</label>
        <input type={inputType} id={labelFor} defaultValue={inputType === 'date' ? new Date().toISOString().split("T")[0] : undefined} name={inputName} aria-label={labelTitle} title={labelTitle} placeholder={placeholder} value={value} onChange={setValue} />
    </div>
  )
}

export default FormInput