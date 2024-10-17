import React from 'react'
import styles from "./FormInput.module.css";

const FormInput = ({labelFor, labelTitle, inputName, placeholder, inputType}: {labelFor: string, labelTitle: string, inputName: string, placeholder: string, inputType: 'text' | 'date' | 'number'}) => {
  return (
    <div className={styles.form__input}>
        <label htmlFor={labelFor}>{labelTitle}</label>
        <input type={inputType} id={labelFor} defaultValue={inputType === 'date' ? new Date().toISOString().split("T")[0] : undefined} name={inputName} aria-label={labelTitle} title={labelTitle} placeholder={placeholder} />
    </div>
  )
}

export default FormInput