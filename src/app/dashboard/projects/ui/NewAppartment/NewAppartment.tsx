import React from 'react'
import styles from "./NewAppartment.module.css";

// Components
import FormInput from '@/components/FormInput/FormInput';

const NewAppartment = () => {
  return (
    <form className={styles.form}>
      <h2>Add <span>Appartment</span></h2>
      
      <div className={styles.form__main}>

      </div>
    </form>
  )
}

export default NewAppartment