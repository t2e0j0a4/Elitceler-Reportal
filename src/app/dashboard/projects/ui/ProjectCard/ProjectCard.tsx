import React from 'react'
import Image from 'next/image';
import styles from "./ProjectCard.module.css";

// React Icons
import { AiFillHome } from 'react-icons/ai';
import { MdCurrencyRupee, MdLocationOn, MdSquareFoot } from 'react-icons/md';

const ProjectCard = () => {
  return (
    <article className={styles.project__card}>
        <div className={styles.card__top}>
            <Image src="/assets/dummy.svg" alt='Hyderabad' width={240} height={210} />
            <h3>Hyderabad</h3>
        </div>
        <div className={styles.card__bottom}>
            <div className={styles.card__details}>
                <p><MdSquareFoot fontSize={21} color='var(--c-black)' /><span>10000 Sq.ft</span></p>
                <p><MdCurrencyRupee fontSize={21} color='var(--c-black)' /><span>1000 per Sq.ft</span></p>
            </div>
            <div className={styles.card__details}>
                <p><MdLocationOn fontSize={21} color='var(--c-black)' /><span>Hyderabad</span></p>
                <p><AiFillHome fontSize={21} color='var(--c-black)' /><span>Residential</span></p>
            </div>
            <button type='button' title='More Details - Checkout' aria-label='More Details - Checkout'>More Details</button>
        </div>
    </article>
  )
}

export default ProjectCard