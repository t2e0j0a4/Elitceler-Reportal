'use client';
import styles from "./FormSelect.module.css";
import React, { useEffect, useRef, useState } from 'react';

// React Icons
import { FaAngleDown } from 'react-icons/fa6';

const FormSelect = ({
    options, selectedOption, setSelectedOption, optionPlaceholder
}: {
    options: {id: string, name: string}[],
    selectedOption: {
        id: string;
        name: string;
    },
    setSelectedOption: React.Dispatch<React.SetStateAction<{
        id: string;
        name: string;
    }>>,
    optionPlaceholder: string
}) => {

    const [showOptions, setShowOptions] = useState(false);

    // Close Dropdown

    const selectRef = useRef<HTMLDivElement | null>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
        ) {
        setShowOptions(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Close Dropdown

    return (
        <div className={styles.form__select} ref={selectRef}>
            <p>{optionPlaceholder}</p>
            <div className={styles.select__top} role="button" tabIndex={0} onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    setShowOptions(!showOptions);
                }
            }} onClick={(e) => {
                setShowOptions(!showOptions);
            }}>
                <p>{selectedOption.name ? <span style={{ textTransform: 'capitalize' }}>{selectedOption.name}</span> : <span className={styles.placeholder__clr}>{optionPlaceholder}</span>}</p>
                <FaAngleDown style={{ transform: `${showOptions ? 'rotate(-180deg)' : 'rotate(0deg)'}`, transition: 'transform 0.3s ease', color: 'var(--c-primaryShade)' }} />
            </div>

            {showOptions && (
                <div className={styles.select__options}>
                {
                    options.map((option, index: number) => {
                        return <p key={option.id} role="button" className={`${selectedOption.id === option.id && styles.selected__option}`} tabIndex={selectedOption.id === option.id ? -1 : 0} onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                if (selectedOption.id === option.id) {
                                    setSelectedOption({
                                        id: '',
                                        name: ''
                                    });
                                } else {
                                    setSelectedOption(option)
                                }
                                setShowOptions(false);
                            }
                        }} onClick={(e) => {
                            if (selectedOption.id === option.id) {
                                setSelectedOption({
                                    id: '',
                                    name: ''
                                });
                            } else {
                                setSelectedOption(option)
                            }
                            setShowOptions(false);
                        }}>{option.name}</p>
                    })
                }
                </div>
            )}
        </div>
    )
}

export default FormSelect