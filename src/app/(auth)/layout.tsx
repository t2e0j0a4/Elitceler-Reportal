import React from 'react'
import styles from "./layout.module.css";

// UI
import Banner from './ui/Banner/Banner';

const AuthLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <main className={styles.app__auth}>
        <Banner/>
        {children}
    </main>
  )
}

export default AuthLayout