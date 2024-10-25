"use client";
import Link from 'next/link';
import Image from 'next/image';
import styles from "./ProjectCard.module.css";
import React, { useEffect, useState } from 'react'

// React Icons
import { AiFillHome } from 'react-icons/ai';
import { LuCheck } from "react-icons/lu";
import { RiCloseLine } from "react-icons/ri";
import { MdCurrencyRupee, MdLocationOn, MdSquareFoot } from 'react-icons/md';

// Types
import { ApartmentDetails, PlotDetails, VillaDetails } from '@/types';

// Utils
import createToast from '@/utils/createToast';

// Actions
import { updateBuilderProjectStatus } from '@/actions/projects';
import { useRouter } from 'next/navigation';

const PlotCard = ({projectDetails, projectFrom, pending = false}: {projectDetails: PlotDetails, projectFrom: 'admin' | 'builder', pending?: boolean}) => {

    const [changeHeroImage, setChangeHeroImage] = useState({
        currentImage: projectDetails.plotImages && projectDetails.plotImages.length ? 1 : 0,
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


    const router = useRouter()
    const [updationLoad, setUpdationLoad] = useState(false);

    const updateProjectStatus = async (status: 'APPROVED' | 'REJECTED', projectId: string) => {
      setUpdationLoad(true);
      const toastId = createToast('loading', 'Updating Status...');
      const statusChange = await updateBuilderProjectStatus(status, projectId);
      if (statusChange.status === 'success') {
        createToast('success', 'Status updated successfully', toastId);
        router.refresh();
      } else {
        createToast('error', statusChange.message ? statusChange.message : 'Issue updating status', toastId);
      }
      setUpdationLoad(false);
    }

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
                    {
                        pending ? (
                            <div className={styles.card__options}>
                                <Link href={projectFrom === 'admin' ? `/dashboard/projects/${projectDetails.projectId}?type=plot` : `/dashboard/projects/builders/${projectDetails.projectId}?type=plot`} title='More Details - Checkout' aria-label='More Details - Checkout'>More Details</Link>
                                <div className={styles.card__pending}>
                                    <button title='Accept' disabled={updationLoad} aria-disabled={updationLoad} aria-label='Accept' onClick={() => {
                                        updateProjectStatus('APPROVED', projectDetails.projectId as string);
                                    }}><LuCheck/></button>
                                    <button title='Reject' disabled={updationLoad} aria-disabled={updationLoad} aria-label='Reject' onClick={() => {
                                        updateProjectStatus('REJECTED', projectDetails.projectId as string);
                                    }}><RiCloseLine/></button>
                                </div>
                            </div>
                        ) : (
                            <Link href={projectFrom === 'admin' ? `/dashboard/projects/${projectDetails.projectId}?type=plot` : `/dashboard/projects/builders/${projectDetails.projectId}?type=plot`} title='More Details - Checkout' aria-label='More Details - Checkout'>More Details</Link>
                        )
                    }
                </div>
            </article>
        </>
    )
}

const VillaCard = ({projectDetails, projectFrom, pending = false}: {projectDetails: VillaDetails, projectFrom: 'admin' | 'builder', pending?: boolean}) => {

    const [changeHeroImage, setChangeHeroImage] = useState({
        currentImage: projectDetails.amenitiesImages && projectDetails.amenitiesImages.length ? 1 : 0,
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

    const router = useRouter()
    
    const [updationLoad, setUpdationLoad] = useState(false);
    const updateProjectStatus = async (status: 'APPROVED' | 'REJECTED', projectId: string) => {
      setUpdationLoad(true);
      const toastId = createToast('loading', 'Updating Status...');
      const statusChange = await updateBuilderProjectStatus(status, projectId);
      if (statusChange.status === 'success') {
        createToast('success', 'Status updated successfully', toastId);
        router.refresh();
      } else {
        createToast('error', statusChange.message ? statusChange.message : 'Issue updating status', toastId);
      }
      setUpdationLoad(false);
    }

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

                {
                    pending ? (
                        <div className={styles.card__options}>
                            <Link href={projectFrom === 'admin' ? `/dashboard/projects/${projectDetails.projectId}?type=villa` : `/dashboard/projects/builders/${projectDetails.projectId}?type=villa`} title='More Details - Checkout' aria-label='More Details - Checkout'>More Details</Link>
                            <div className={styles.card__pending}>
                                <button title='Accept' disabled={updationLoad} aria-disabled={updationLoad} aria-label='Accept' onClick={() => {
                                    updateProjectStatus('APPROVED', projectDetails.projectId as string);
                                }}><LuCheck/></button>
                                <button title='Reject' disabled={updationLoad} aria-disabled={updationLoad} aria-label='Reject' onClick={() => {
                                    updateProjectStatus('REJECTED', projectDetails.projectId as string);
                                }}><RiCloseLine/></button>
                            </div>
                        </div>
                    ) : (
                        <Link href={projectFrom === 'admin' ? `/dashboard/projects/${projectDetails.projectId}?type=villa` : `/dashboard/projects/builders/${projectDetails.projectId}?type=villa`} title='More Details - Checkout' aria-label='More Details - Checkout'>More Details</Link>
                    )
                }
            </div>
        </article>
    )
}

const ApartmentCard = ({projectDetails, projectFrom, pending = false}: {projectDetails: ApartmentDetails, projectFrom: 'admin' | 'builder', pending?: boolean}) => {

    const [changeHeroImage, setChangeHeroImage] = useState({
        currentImage: projectDetails.amenitiesImages && projectDetails.amenitiesImages.length ? 1 : 0,
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

    const router = useRouter()
    const [updationLoad, setUpdationLoad] = useState(false);

    const updateProjectStatus = async (status: 'APPROVED' | 'REJECTED', projectId: string) => {
      setUpdationLoad(true);
      const toastId = createToast('loading', 'Updating Status...');
      const statusChange = await updateBuilderProjectStatus(status, projectId);
      if (statusChange.status === 'success') {
        createToast('success', 'Status updated successfully', toastId);
        router.refresh();
      } else {
        createToast('error', statusChange.message ? statusChange.message : 'Issue updating status', toastId);
      }
      setUpdationLoad(false);
    }

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
                    <h3>{projectDetails.name ? projectDetails.name : '-'}</h3>
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
                    {
                        pending ? (
                            <div className={styles.card__options}>
                                <Link href={projectFrom === 'admin' ? `/dashboard/projects/${projectDetails.projectId}?type=apartment` : `/dashboard/projects/builders/${projectDetails.projectId}?type=apartment`} title='More Details - Checkout' aria-label='More Details - Checkout'>More Details</Link>
                                <div className={styles.card__pending}>
                                    <button title='Accept' disabled={updationLoad} aria-disabled={updationLoad} aria-label='Accept' onClick={() => {
                                        updateProjectStatus('APPROVED', projectDetails.projectId as string);
                                    }}><LuCheck/></button>
                                    <button title='Reject' disabled={updationLoad} aria-disabled={updationLoad} aria-label='Reject' onClick={() => {
                                        updateProjectStatus('REJECTED', projectDetails.projectId as string);
                                    }}><RiCloseLine/></button>
                                </div>
                            </div>
                        ) : (
                            <Link href={projectFrom === 'admin' ? `/dashboard/projects/${projectDetails.projectId}?type=apartment` : `/dashboard/projects/builders/${projectDetails.projectId}?type=apartment`} title='More Details - Checkout' aria-label='More Details - Checkout'>More Details</Link>
                        )
                    }
                </div>
            </article>
        </>
    )
}

export { PlotCard, VillaCard, ApartmentCard } 