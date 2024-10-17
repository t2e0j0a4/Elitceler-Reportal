'use client';
import Link from 'next/link';
import React, { useState } from 'react'
import styles from "./Sidebar.module.css";

// Hooks
import { usePathname } from 'next/navigation';

// React Icons
import { LuLogOut } from 'react-icons/lu';
import { FaPeopleGroup } from 'react-icons/fa6';
import { BiSolidDashboard } from 'react-icons/bi';
import { MdEngineering, MdOnlinePrediction } from 'react-icons/md';
import { BsFillHousesFill } from 'react-icons/bs';

const Sidebar = () => {

  const pathName = usePathname();
  const [isLogginOut, setIsLoggingOut] = useState(false);

  return (
    <aside className={styles.app__sidebar}>
      <div className={styles.sidebar__center}>

        {/* Logo */}

        <div className={styles.sidebar__logo}>
          <h2><span>Re</span>Portal</h2>
          <button type='button' title={isLogginOut ? 'Logging Out...' : 'Logout'} onClick={async () => {
            setIsLoggingOut(true);
          }} disabled={isLogginOut} aria-disabled={isLogginOut}>{
            isLogginOut ? <span className={styles.basic}></span> : <LuLogOut fontSize={20} fontWeight={600} />
          }</button>
        </div>

        {/* Logo */}

        {/* Menu */}

        <div className={styles.sidebar__menu}>
          <Link className={`${pathName === '/dashboard' ? styles.active__link : ''}`} href="/dashboard" title='Dashboard'><BiSolidDashboard fontSize={21}/><span>Dashboard</span></Link>
          <Link className={`${pathName === '/dashboard/users' ? styles.active__link : ''}`} href="/dashboard/users" title='Manpower Supply'><FaPeopleGroup fontSize={21}/><span>Users</span></Link>
          <Link className={`${pathName === '/dashboard/banners' ? styles.active__link : ''}`} href="/dashboard/banners" title='Banners'><MdOnlinePrediction fontSize={21}/><span>Banners</span></Link>
          <Link className={`${pathName === '/dashboard/builders' ? styles.active__link : ''}`} href="/dashboard/builders" title='Builders'><MdEngineering fontSize={21}/><span>Builders</span></Link>
          <Link className={`${pathName === '/dashboard/projects' || pathName === '/dashboard/projects/new' ? styles.active__link : ''}`} href="/dashboard/projects" title='Projects'><BsFillHousesFill fontSize={21}/><span>Projects</span></Link>
        </div>

        {/* Menu */}

      </div>
    </aside>
  )
}

export default Sidebar