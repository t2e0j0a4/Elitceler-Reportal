'use client';
import Link from 'next/link';
import React, {useState} from 'react';
import styles from "./LoginForm.module.css";

// Utils
import createToast from '@/utils/createToast';

// Actions
import { adminLogin } from '@/actions/auth';

const LoginForm = () => {

  const [responseLoading, setResponseLoading] = useState(false);

  return (
    <form className={styles.login__form} onSubmit={async (e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      setResponseLoading(true);
      const toastId = createToast('loading', 'Verifying details...');
      const loginResponse = await adminLogin(formData);
      (loginResponse === undefined) ? (
        createToast('success', 'Admin Logged In!', toastId)
      ) : (
        createToast('error', loginResponse.message, toastId),
        setResponseLoading(false)
      );
    }}>
      <div className={styles.form__center}>
        <h1><span>Re</span>Portal</h1>
        <div className={styles.form__head}>
          <h2>Login</h2>
          <p>New here? <Link href="/register">Register</Link></p>
        </div>
        <div className={styles.form__input}>
          <label htmlFor="email">Email</label>
          <input required pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$' type="email" name='email' id='email' placeholder='Enter Email' />
        </div>
        <div className={styles.form__input}>
          <label htmlFor="password">Password</label>
          <input required type="password" name='password' id='password' placeholder='Enter Password'/>
        </div>
        <button disabled={responseLoading} type='submit'>{responseLoading ? (
          <div className={styles.basic}></div>
        ) : 'Login'}</button>
      </div>
    </form>
  )
}

export default LoginForm