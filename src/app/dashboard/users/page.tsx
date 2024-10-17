import React, { Suspense } from 'react'
import styles from "./page.module.css";

// Data
import { users } from '@/data';

// UI
import UsersTable from './ui/UsersTable/UsersTable';

const Users = () => {
  return (
    <>
    
      {/* Head */}

      <div className={styles.dashboard__head}>
        <h1>Registered Users</h1>
      </div>

      {/* Head */}

      {/* Users Table */}

      <div className={styles.users__table}>
        {
          (!users || users.length === 0) ? (
            <p>Empty Users!</p>
          ) : (
            <Suspense fallback={<p>Loading...</p>}>
              <UsersTable users={users} totalUsers={users.length} />
            </Suspense>
          )
        }
      </div>

      {/* Users Table */}

    </>
  )
}

export default Users;