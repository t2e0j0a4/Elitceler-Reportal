import React from 'react'
import styles from "./TotalStats.module.css";

const TotalStats = () => {
  return (
    <div className={styles.home__totalStats}>
      <h2><span>Total</span> Stats</h2>

      <div className={styles.total__stats}>

        <div className={styles.stat}>
          <p>Total Users</p>
          <h3>2000</h3>
        </div>

        <div className={styles.stat}>
          <p>Total Builders</p>
          <h3>2000</h3>
        </div>

        <div className={styles.stat}>
          <p>Total Projects</p>
          <h3>2000</h3>
        </div>

      </div>

    </div>
  )
}

export default TotalStats;