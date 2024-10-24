'use client';
import styles from "./BuildersTable.module.css";
import React, { useEffect, useState } from 'react'

// Types
import { BuilderType } from '@/types'

// React Icons
import { LuCheck } from "react-icons/lu";
import { FaRegEye } from "react-icons/fa6";
import { RiCloseLine } from "react-icons/ri";

// UI
import BuilderDetails from "../BuilderDetails/BuilderDetails"; 

// Components
import TableToggle from "@/components/TableToggle/TableToggle";

const BuildersTable = ({ builders, totalBuilders, builderType }: { builders: BuilderType[], totalBuilders: number, builderType: 'approved' | 'pending' | 'rejected' }) => {

    const [currentTableSheet, setCurrentTableSheet] = useState(1);
    const [tableEntry, setTableEntry] = useState({ tableFrom: 0, tableTo: 15 });

    useEffect(() => {
        setCurrentTableSheet(1);
        setTableEntry({ tableFrom : 0, tableTo : 15 });
    }, [builderType]);

    const [selectedBuilderId, setSelectedBuilderId] = useState<string>('');

    return (
      <section className={styles.builders__main}>

        {/* Builders Table */}

        <table className={styles.builders}>

          <thead className={styles.table__head}>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Contact Number</th>
              {/* {builderType !== 'pending' && <th>Email</th>} */}
              <th>Email</th>
              <th>Details</th>
              {builderType === 'pending' && <th>Options</th>}
            </tr>
          </thead>

          <tbody className={styles.table__body}>
            {
              builders.slice(tableEntry.tableFrom, tableEntry.tableTo).map((builder: BuilderType, index: number) => {
                  return (
                      <tr key={builder.id}>
                          <td>{index + 1}</td>
                          <td>{builder.name ? builder.name : '-'}</td>
                          <td>{builder.phoneNumber ? builder.phoneNumber : '-'}</td>
                          <td>{builder.email ? builder.email : '-'}</td>
                          {/* {builderType !== 'pending' && <td>{builder.email ? builder.email : '-'}</td>} */}
                          <td>
                            <div><button type='button' onClick  ={() => {setSelectedBuilderId(builder.id)}} title='More Details'><FaRegEye/><span>Details</span></button></div>
                          </td>
                          {
                            builderType === 'pending' && (
                              <td>
                                <div>
                                  <button type='button' title='Accept'><LuCheck fontSize={15} /><span>Accept</span></button>
                                  <button type='button' title='Reject'><RiCloseLine fontSize={15} /><span>Reject</span></button>
                                </div>
                              </td>
                            )
                          }
                      </tr>
                  )
              })
            }
          </tbody>

        </table>

        {/* Builders Table */}

        {/* Table Toggle Options */}

        <TableToggle totalData={totalBuilders} tabinationCount={Math.ceil(builders.length / 15)} tableEntry={tableEntry} setTableEntry={setTableEntry} currentTableSheet={currentTableSheet} setCurrentTableSheet={setCurrentTableSheet} />

        {/* Table Toggle Options */}

        {/* Open Builder Popup */}

        {selectedBuilderId && <BuilderDetails selectedBuilderId={selectedBuilderId} setSelectedBuilderId={setSelectedBuilderId} builders={builders} />}

        {/* Open Builder Popup */}

      </section>
    )
}

export default BuildersTable;