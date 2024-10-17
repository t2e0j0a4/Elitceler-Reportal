import React, { Suspense } from 'react'
import styles from "./page.module.css";

// Data
import { fetchedBuilders } from '@/data';

// UI
import BuilderToggle from './ui/BuilderToggle/BuilderToggle';
import BuildersTable from './ui/BuildersTable/BuildersTable';

const Builders = ({searchParams}: { searchParams: { builder: 'approved' | 'pending' | 'rejected' }}) => {

  const { approvedBuildersLength, approvedBuilders, pendingBuildersLength, pendingBuilders, rejectedBuildersLength, rejectedBuilders } = fetchedBuilders;

  return (
    <>
    
      {/* Head */}

      <div className={styles.dashboard__head}>
        <h1>Builders</h1>
      </div>

      {/* Head */}

      {/* Builders Table */}

      <section className={styles.builders__table}>

        <div className={styles.builders__main}>
          
          <BuilderToggle approved={approvedBuildersLength} rejected={rejectedBuildersLength} pending={pendingBuildersLength}/>

          <>
            {
              searchParams.builder === 'approved' ? (
                approvedBuildersLength === 0 ? (
                  <p>Empty Data!</p>
                ) : (
                  <Suspense fallback={<p>Loading...</p>}>
                    <BuildersTable builders={approvedBuilders} builderType='approved' totalBuilders={approvedBuildersLength} />
                  </Suspense>
                )
              ) : searchParams.builder === 'pending' ? (
                pendingBuildersLength === 0 ? (
                  <p>Empty Data!</p>
                ) : (
                  <Suspense fallback={<p>Loading...</p>}>
                    <BuildersTable builders={pendingBuilders} builderType='pending' totalBuilders={pendingBuildersLength} />
                  </Suspense>
                )
              ) : searchParams.builder === 'rejected' ? (
                rejectedBuildersLength === 0 ? (
                  <p>Empty Data!</p>
                ) : (
                  <Suspense fallback={<p>Loading...</p>}>
                    <BuildersTable builders={rejectedBuilders} builderType='rejected' totalBuilders={rejectedBuildersLength} />
                  </Suspense>
                )
              ) : (
                <div className={styles.no__exist}>
                  <p>No Staff Found!</p>
                </div>
              )
            }
          </>

        </div>

      </section>

      {/* Builders Table */}

    </>
  )
}

export default Builders;