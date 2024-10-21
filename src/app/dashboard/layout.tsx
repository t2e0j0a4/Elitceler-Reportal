import React from 'react'
import styles from "./layout.module.css";

// Components
import Sidebar from '@/components/Sidebar/Sidebar';

// NEXT
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const AdminLayout = ({children}: {children: React.ReactNode}) => {

  if (!cookies().has('reportal__auth__token')) {
    redirect('/');
  }

  return (
    <main className={styles.app__layout}>
      <Sidebar/>
      <section className={styles.app__dashboard}>
        <div className={styles.dashboard__center}>{children}</div>
      </section>
    </main>
  )
}

export default AdminLayout;