"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import styles from "./RegisterForm.module.css";

// Utils
import createToast from '@/utils/createToast';

// Actions
import { adminRegistration } from '@/actions/auth';

const RegisterForm = () => {

    const [responseLoading, setResponseLoading] = useState(false);

    return (
        <form className={styles.register__form} onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            setResponseLoading(true);
            const toastId = createToast('loading', 'Details submitting...');

            const registerResponse = await adminRegistration(formData)

            registerResponse === undefined ? createToast('success', 'New Admin Registered! Login Now.', toastId) : (
                createToast('error', registerResponse.message, toastId),
                setResponseLoading(false)
            );
            setResponseLoading(false);
        }}>
            <div className={styles.form__center}>
                <h1><span>Re</span>Portal</h1>
                <div className={styles.form__head}>
                    <h2>Register</h2>
                    <p>Have an Account? <Link href="/">Login</Link></p>
                </div>
                <div className={styles.form__input}>
                    <label htmlFor="name">Name*</label>
                    <input required type="text" name='name' id='name' placeholder='Enter Name' />
                </div>
                <div className={styles.form__input}>
                    <label htmlFor="email">Email*</label>
                    <input required pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$' type="email" name='email' id='email' placeholder='Enter Email' />
                </div>
                <div className={styles.form__input}>
                    <label htmlFor="phoneNumber">Phone Number*</label>
                    <input required type="text" name='phoneNumber' id='phoneNumber' placeholder='Enter Phone Number' />
                </div>
                <div className={styles.form__input}>
                    <label htmlFor="password">Password*</label>
                    <input required type="password" name='password' id='password' placeholder='Enter Password'/>
                </div>
                <button disabled={responseLoading} type='submit'>{responseLoading ? (
                    <div className={styles.basic}></div>
                ) : 'Register Now'}</button>
            </div>
        </form>
    )
}

export default RegisterForm