'use client' // Error components must be Client Components
import React, { useEffect } from 'react';

// React Icons
import { MdDashboard } from "react-icons/md";
import { FiRefreshCcw } from "react-icons/fi";

export default function Error({ error, reset }: { error: Error & { message?: string }, reset: () => void }) {

    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main className='app__error'>
            <h2>Error!</h2>
            <svg fill="var(--c-primaryShade)" height="200px" width="200px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M503.83,21.787H8.17c-4.512,0-8.17,3.657-8.17,8.17v452.085c0,4.513,3.658,8.17,8.17,8.17h495.66 c4.513,0,8.17-3.657,8.17-8.17V29.957C512,25.444,508.343,21.787,503.83,21.787z M16.34,38.128h397.617v49.021H16.34V38.128z M495.66,473.872H16.34V103.489H495.66V473.872z M495.66,87.149h-65.362V38.128h65.362V87.149z"></path> </g> </g> <g> <g> <path d="M471.149,119.83H40.851c-4.512,0-8.17,3.657-8.17,8.17v256c0,4.513,3.658,8.17,8.17,8.17s8.17-3.657,8.17-8.17V136.17 h413.957v305.021H49.021v-24.511c0-4.513-3.658-8.17-8.17-8.17s-8.17,3.657-8.17,8.17v32.681c0,4.513,3.658,8.17,8.17,8.17 h430.298c4.513,0,8.17-3.657,8.17-8.17V128C479.319,123.487,475.662,119.83,471.149,119.83z"></path> </g> </g> <g> <g> <circle cx="462.979" cy="62.638" r="8.17"></circle> </g> </g> <g> <g> <path d="M256,173.208c-24.755,0-48.362,7.727-68.27,22.343c-3.637,2.671-4.422,7.785-1.751,11.421 c2.671,3.638,7.786,4.421,11.421,1.751c17.084-12.544,37.349-19.174,58.6-19.174c54.662,0,99.132,44.47,99.132,99.132 s-44.47,99.132-99.132,99.132s-99.132-44.47-99.132-99.132c0-21.252,6.63-41.516,19.174-58.6c2.671-3.637,1.887-8.75-1.75-11.421 c-3.637-2.668-8.751-1.887-11.421,1.751c-14.618,19.907-22.344,43.515-22.344,68.27c0,63.671,51.8,115.472,115.472,115.472 c63.671,0,115.472-51.801,115.472-115.472S319.671,173.208,256,173.208z"></path> </g> </g> <g> <g> <path d="M267.555,288.681l39.286-39.286c3.191-3.192,3.191-8.364,0-11.555c-3.192-3.19-8.364-3.19-11.555,0L256,277.126 l-39.286-39.286c-3.191-3.19-8.364-3.19-11.554,0c-3.191,3.192-3.191,8.364,0,11.555l39.285,39.286l-39.285,39.286 c-3.191,3.191-3.191,8.363,0,11.555c1.595,1.595,3.686,2.392,5.777,2.392c2.091,0,4.182-0.797,5.777-2.392L256,300.236 l39.285,39.286c1.596,1.595,3.686,2.392,5.778,2.392c2.09,0,4.182-0.797,5.778-2.392c3.191-3.192,3.191-8.364,0-11.555 L267.555,288.681z"></path> </g> </g> </g></svg>
            <p>{error.message}</p>
            <div className='error__options'>
                <a href="/dashboard"><MdDashboard fontSize={17} /><span>Dashbaord</span></a>
                <button onClick={() => reset()} type='button' title='Try again'><FiRefreshCcw fontSize={17} /><span>Try again</span></button>
            </div>
        </main>
    )
}