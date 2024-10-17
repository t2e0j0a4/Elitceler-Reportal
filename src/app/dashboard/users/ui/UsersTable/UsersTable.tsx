"use client";
import React, { useState } from 'react';
import styles from "./UsersTable.module.css";

// Types
import { UserType } from '@/types';

// React Icons
import { FaRegEye } from 'react-icons/fa6';

// Components
import TableToggle from '@/components/TableToggle/TableToggle';
import UserDetails from '../UserDetails/UserDetails';

const UsersTable = ({users, totalUsers}: { users: UserType[], totalUsers: number }) => {

    const [currentTableSheet, setCurrentTableSheet] = useState(1);
    const [tableEntry, setTableEntry] = useState({ tableFrom: 0, tableTo: 15 });

    const [selectedUserId, setSelectedUserId] = useState<string>('');

    return (
        <section className={styles.users__main}>

            {/* Users Table */}

            <table className={styles.users}>
                <thead className={styles.table__head}>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Details</th>
                    </tr>
                </thead>

                <tbody className={styles.table__body}>
                    {
                        users.slice(tableEntry.tableFrom, tableEntry.tableTo).map((user: UserType, index: number) => {
                            return (
                                <tr key={user.id}>
                                    <td>{index + 1}</td>
                                    <td>{user.name ? user.name : '-'}</td>
                                    <td>{user.username ? user.username : '-'}</td>
                                    <td>{user.email ? user.email : '-'}</td>
                                    <td>{user.phone ? user.phone : '-'}</td>
                                    <td>
                                        <div><button type='button' onClick={() => {setSelectedUserId(user.id)}} title='More Details'><FaRegEye/><span>Details</span></button></div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>

            </table>

            {/* Users Table */}

            {/* Table Toggle Options */}

            <TableToggle totalData={totalUsers} tabinationCount={Math.ceil(users.length / 15)} tableEntry={tableEntry} setTableEntry={setTableEntry} currentTableSheet={currentTableSheet} setCurrentTableSheet={setCurrentTableSheet} />

            {/* Table Toggle Options */}

            {/* Open User Popup */}

            {selectedUserId && <UserDetails selectedUserId={selectedUserId} setSelectedUserId={setSelectedUserId} />}

            {/* Open User Popup */}

        </section>
    )
}

export default UsersTable