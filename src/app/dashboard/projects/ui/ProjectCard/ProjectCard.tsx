"use client";
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import styles from "./ProjectCard.module.css";

// React Icons
import { AiFillHome } from 'react-icons/ai';
import { MdCurrencyRupee, MdLocationOn, MdSquareFoot } from 'react-icons/md';

// Types
import { ApartmentDetails, PlotDetails, VillaDetails } from '@/types';

const PlotCard = ({projectDetails}: {projectDetails: PlotDetails}) => {

    const [changeHeroImage, setChangeHeroImage] = useState({
        currentImage: projectDetails.plotImages.length ? 1 : 0,
        totalImages: projectDetails.plotImages ? projectDetails.plotImages.length : 0
    });

    useEffect(() => {

        const interval = setInterval(() => {

            setChangeHeroImage((prevState) => {
                return {
                    ...changeHeroImage,
                    currentImage: prevState.currentImage < prevState.totalImages ? prevState.currentImage + 1 : 1
                }
            })

        }, 3000);

        return () => clearInterval(interval);

        // eslint-disable-next-line
    }, [])

    return (
        <>
            <article className={styles.project__card}>
                <div className={styles.card__top}>
                    {
                        changeHeroImage.totalImages === 0 ? (
                            <Image src="/assets/dummy.svg" alt='Hyderabad' width={240} height={210} />
                        ) : (
                            <Image src={projectDetails.plotImages[changeHeroImage.currentImage - 1] as any} alt={projectDetails.plotName} width={240} height={210} />
                        )
                    }
                    <h3>{projectDetails.plotName ? projectDetails.plotName : '---'}</h3>
                </div>
                <div className={styles.card__bottom}>
                    <div className={styles.card__details}>
                        <p><MdSquareFoot fontSize={21} color='var(--c-black)' /><span>{projectDetails.plotLayoutSize ? projectDetails.plotLayoutSize : '-'}</span></p>
                        <p><MdCurrencyRupee fontSize={21} color='var(--c-black)' /><span>{projectDetails.pricePerSqYard ? projectDetails.pricePerSqYard : '0'} per Sq.yard</span></p>
                    </div>
                    <div className={styles.card__details}>
                        <p><MdLocationOn fontSize={21} color='var(--c-black)' /><span>{projectDetails.plotLocation ? projectDetails.plotLocation : '-'}</span></p>
                        <p><AiFillHome fontSize={21} color='var(--c-black)' /><span>{projectDetails.plotType ? projectDetails.plotType : '-'}</span></p>
                    </div>
                    <button type='button' title='More Details - Checkout' aria-label='More Details - Checkout'>More Details</button>
                </div>
            </article>
        </>
    )
}

const VillaCard = ({projectDetails}: {projectDetails: VillaDetails}) => {

    const [changeHeroImage, setChangeHeroImage] = useState({
        currentImage: projectDetails.amenitiesImages.length ? 1 : 0,
        totalImages: projectDetails.amenitiesImages ? projectDetails.amenitiesImages.length : 0
    });

    useEffect(() => {

        const interval = setInterval(() => {

            setChangeHeroImage((prevState) => {
                return {
                    ...changeHeroImage,
                    currentImage: prevState.currentImage < prevState.totalImages ? prevState.currentImage + 1 : 1
                }
            })

        }, 3000);

        return () => clearInterval(interval);

        // eslint-disable-next-line
    }, [])

    return (
        <article className={styles.project__card}>
            <div className={styles.card__top}>
                {
                    changeHeroImage.totalImages === 0 ? (
                        <Image src="/assets/dummy.svg" alt='Hyderabad' width={240} height={210} />
                    ) : (
                        <Image src={projectDetails.amenitiesImages[changeHeroImage.currentImage - 1] as any} alt={projectDetails.villaName} width={240} height={210} />
                    )
                }
                <h3>{projectDetails.villaName ? projectDetails.villaName : '---'}</h3>
            </div>
            <div className={styles.card__bottom}>
                <div className={styles.card__details}>
                    <p><MdSquareFoot fontSize={21} color='var(--c-black)' /><span>{projectDetails.villaFacing ? projectDetails.villaFacing : '-'}</span></p>
                    <p><MdCurrencyRupee fontSize={21} color='var(--c-black)' /><span>{projectDetails.basePricePerSqft ? projectDetails.basePricePerSqft : '0'} per Sq.ft</span></p> 
                </div>
                <div className={styles.card__details}>
                    <p><MdLocationOn fontSize={21} color='var(--c-black)' /><span>{projectDetails.villaLocation ? projectDetails.villaLocation : '-'}</span></p>
                    <p><AiFillHome fontSize={21} color='var(--c-black)' /><span>{projectDetails.villasType ? projectDetails.villasType : '-'}</span></p>
                </div>
                <button type='button' title='More Details - Checkout' aria-label='More Details - Checkout'>More Details</button>
            </div>
        </article>
    )
}

const ApartmentCard = ({projectDetails}: {projectDetails: ApartmentDetails}) => {

    const [changeHeroImage, setChangeHeroImage] = useState({
        currentImage: projectDetails.amenitiesImages.length ? 1 : 0,
        totalImages: projectDetails.amenitiesImages ? projectDetails.amenitiesImages.length : 0
    });

    useEffect(() => {

        const interval = setInterval(() => {

            setChangeHeroImage((prevState) => {
                return {
                    ...changeHeroImage,
                    currentImage: prevState.currentImage < prevState.totalImages ? prevState.currentImage + 1 : 1
                }
            })

        }, 3000);

        return () => clearInterval(interval);

        // eslint-disable-next-line
    }, [])

    return (
        <>
            <article className={styles.project__card}>
                <div className={styles.card__top}>
                    {
                        changeHeroImage.totalImages === 0 ? (
                            <Image src="/assets/dummy.svg" alt='Hyderabad' width={240} height={210} />
                        ) : (
                            <Image src={projectDetails.amenitiesImages[changeHeroImage.currentImage - 1] as any} alt={projectDetails.name} width={240} height={210} />
                        )
                    }
                    <h3>{projectDetails.name ? projectDetails.name : '---'}</h3>
                </div>
                <div className={styles.card__bottom}>
                    <div className={styles.card__details}>
                        <p><MdSquareFoot fontSize={21} color='var(--c-black)' /><span>{projectDetails.projectSize ? projectDetails.projectSize : '-'}</span></p>
                        <p><MdCurrencyRupee fontSize={21} color='var(--c-black)' /><span>{projectDetails.pricePerSquareFeetRate ? projectDetails.pricePerSquareFeetRate : '0'} per Sq.ft</span></p> 
                    </div>
                    <div className={styles.card__details}>
                        <p><MdLocationOn fontSize={21} color='var(--c-black)' /><span>{projectDetails.projectLocation ? projectDetails.projectLocation : '-'}</span></p>
                        <p><AiFillHome fontSize={21} color='var(--c-black)' /><span>{projectDetails.projectType ? projectDetails.projectType : '-'}</span></p>
                    </div>
                    <button type='button' title='More Details - Checkout' aria-label='More Details - Checkout'>More Details</button>
                </div>
            </article>
        </>
    )
}

export { PlotCard, VillaCard, ApartmentCard } 