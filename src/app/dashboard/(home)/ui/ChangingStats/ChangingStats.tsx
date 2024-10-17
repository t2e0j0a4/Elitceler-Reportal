'use client';
import React, {useState} from 'react';
import styles from "./ChangingStats.module.css";

// React Icons
import { MdOutlineDone } from 'react-icons/md';

const ChangingStats = () => {

  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split("T")[0]);

  return (
    <div className={styles.home__changingStats}>
      
      <div className={styles.stats__head}>
        <h2>Recent <span>Stats</span></h2>
        <div className={styles.date__picker}>
          <input type="date" name='statsDatePicker' value={startDate} onChange={(e) => {
            setStartDate(e.target.value);
          }} />
          <button type='button' title='Update Date' aria-label='Update Date'><MdOutlineDone/></button>
        </div>
      </div>

      <div className={styles.changing__stats}>

        <div className={styles.stat}>
          <p>Users</p>
          <h3>200</h3>
        </div>

        <div className={styles.stat}>
          <p>Builders</p>
          <h3>200</h3>
        </div>

        <div className={styles.stat}>
          <p>Projects</p>
          <h3>200</h3>
        </div>

      </div>

    </div>
  )
}

export default ChangingStats;