"use client";
import React, { useState } from 'react';
import styles from "./RegisterForm.module.css";
import Link from 'next/link';

const RegisterForm = () => {

    const [submitLoad, setSubmitLoad] = useState(false);

    return (
        <form className={styles.register__form}>
            <div className={styles.form__center}>
                <h1><span>Re</span>Portal</h1>
                <div className={styles.form__head}>
                    <h2>Register</h2>
                    <p>Have an Account? <Link href="/">Login</Link></p>
                </div>
                <div className={styles.form__input}>
                    <label htmlFor="name">Name</label>
                    <input type="text" name='name' id='name' placeholder='Enter Name' />
                </div>
                <div className={styles.form__input}>
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' id='email' placeholder='Enter Email' />
                </div>
                <div className={styles.form__input}>
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input type="text" name='phoneNumber' id='phoneNumber' placeholder='Enter Phone Number' />
                </div>
                <div className={styles.form__input}>
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' id='password' placeholder='Enter Password'/>
                </div>
                <button disabled={submitLoad} type='submit'>{submitLoad ? (
                    <div className={styles.basic}></div>
                ) : 'Register Now'}</button>
            </div>
        </form>
    )
}

export default RegisterForm