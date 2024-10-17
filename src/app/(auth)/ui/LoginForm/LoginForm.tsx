'use client';
import React, {useState} from 'react';
import styles from "./LoginForm.module.css";
import Link from 'next/link';

const LoginForm = () => {

  const [submitLoad, setSubmitLoad] = useState(false);

  return (
    <form className={styles.login__form}>
      <div className={styles.form__center}>
        <h1><span>Re</span>Portal</h1>
        <div className={styles.form__head}>
          <h2>Login</h2>
          <p>New here? <Link href="/register">Register</Link></p>
        </div>
        <div className={styles.form__input}>
          <label htmlFor="email">Email</label>
          <input type="email" name='email' id='email' placeholder='Enter Email' />
        </div>
        <div className={styles.form__input}>
          <label htmlFor="password">Password</label>
          <input type="password" name='password' id='password' placeholder='Enter Password'/>
        </div>
        <button disabled={submitLoad} type='submit'>{submitLoad ? (
          <div className={styles.basic}></div>
        ) : 'Login'}</button>
      </div>
    </form>
  )
}

export default LoginForm