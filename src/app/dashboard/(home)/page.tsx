import React from 'react'
import styles from "./page.module.css";

// UI
import Recents from './ui/Recents/Recents';
import TotalStats from './ui/TotalStats/TotalStats';
import ChangingStats from './ui/ChangingStats/ChangingStats';

const Home = () => {
  return (
    <>
    
      {/* Head */}

      <div className={styles.dashboard__head}>
        <h1>Dashboard</h1>
      </div>

      {/* Head */}

      {/* Main */}

      <div className={styles.home__main}>
        <TotalStats/>
        <ChangingStats/>
        <Recents/>
      </div>

      {/* Main */}

    </>
  )
}

export default Home;