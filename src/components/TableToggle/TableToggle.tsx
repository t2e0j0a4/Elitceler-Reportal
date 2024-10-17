'use client';
import React, { Dispatch } from 'react';
import styles from "./TableToggle.module.css";

// React Icons
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";

const TableToggle = ({ totalData, tabinationCount, tableEntry, setTableEntry, currentTableSheet, setCurrentTableSheet }: { totalData: number, tabinationCount: number, tableEntry: {tableFrom: number, tableTo: number}, setTableEntry: Dispatch<React.SetStateAction<{ tableFrom: number, tableTo: number }>>, currentTableSheet: number, setCurrentTableSheet: Dispatch<React.SetStateAction<number>> }) => {
  return (
    <div className={styles.table__toggle}>
        <p><span>{currentTableSheet}/{tabinationCount}</span> Sheets | <span>{totalData}</span> Results</p>
        <div className={styles.toggle}>
          
            <button type="button" title='Previous' disabled={currentTableSheet === 1 && true} aria-disabled={currentTableSheet === 1 && true} onClick={() => {
                setCurrentTableSheet((current) => current - 1);
                setTableEntry({
                    tableFrom: tableEntry.tableFrom - 15,
                    tableTo: tableEntry.tableTo -15
                })
            }}><GrFormPreviousLink fontSize={21} /><span>Previous</span></button>

            <button type="button" disabled={currentTableSheet === tabinationCount && true} aria-disabled={currentTableSheet === tabinationCount && true} title='Next' onClick={() => {
                setCurrentTableSheet((current) => current + 1);
                setTableEntry({
                    tableFrom: tableEntry.tableFrom + 15,
                    tableTo: tableEntry.tableTo + 15
                })
            }}><span>Next</span><GrFormNextLink fontSize={21} /></button>

        </div>
    </div>
  )
}

export default TableToggle