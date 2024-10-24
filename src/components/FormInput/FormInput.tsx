import React from 'react'
import styles from "./FormInput.module.css";

const FormInput = ({labelFor, labelTitle, inputName, placeholder, inputType, value, setValue, pattern, inputTitle, required = false}: {labelFor: string, labelTitle: string, inputName: string, placeholder: string, inputType: 'text' | 'date' | 'number' | 'email' | 'password', value: string, setValue: (e: React.ChangeEvent<HTMLInputElement>) => void, pattern?: string, inputTitle?: string, required?: boolean}) => {
  return (
    <div className={styles.form__input}>
        <label htmlFor={labelFor}>{labelTitle}</label>
        <input type={inputType} id={labelFor} defaultValue={inputType === 'date' ? new Date().toISOString().split("T")[0] : undefined} name={inputName} aria-label={labelTitle} required={required} title={inputTitle ? inputTitle : labelTitle} placeholder={placeholder} value={value} onChange={setValue} pattern={pattern} />
    </div>
  )
}

export default FormInput