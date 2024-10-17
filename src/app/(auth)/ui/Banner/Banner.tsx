import React from 'react'
import Image from 'next/image'

import styles from "./Banner.module.css";

const Banner = () => {
  return (
    <aside className={styles.login__banner}>
        <div className={styles.banner__crumble}>
            <Image src="/assets/SideBanner.png" priority alt='REPortal' width={480} height={720}/>
        </div>
    </aside>
  )
}

export default Banner