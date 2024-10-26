"use client";
import Image from 'next/image';
import React from 'react';
import styles from './FileUpload.module.css';

// React Icons
import { IoIosClose } from 'react-icons/io';
import { FaFileUpload } from "react-icons/fa";

type FileUploaderProps = {
    labelFor: string, labelTitle: string,
    files: File[], setFiles: React.Dispatch<React.SetStateAction<File[]>>
}

const FileUpload: React.FC<FileUploaderProps> = ({labelFor, labelTitle, files, setFiles}) => {


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files ? [...files, ...Array.from(e.target.files)] : [];
        setFiles(selectedFiles);
    };

    const handleFileRemove = (name: string) => {
        const updatedFiles = files.filter((file) => file.name !== name);
        setFiles(updatedFiles);
    };


    return (
        <div className={styles.file__uploader}>
            
            <p>{labelTitle}</p>

            <div className={styles.uploader__title}>
                <FaFileUpload color='#232323C0' fontSize={24} />
                <div>
                    <span>Choose files (PDF or Image)</span>
                    <span>PDF and Image files upto 50MB, Up to 20 files allowed</span>
                </div>
                <label htmlFor={labelFor}>Upload Now</label>
                <input type="file" id={labelFor} multiple onChange={handleFileChange}/>
            </div>


            {files.length > 0 && (
                <div className={styles.uploaded__files}>
                    <p>Uploaded</p>
                    <ul>
                        {files.map((file, index) => (
                            file.type === 'application/pdf' ? (
                                <li key={index} className={styles.file__pdf}>
                                    <span>{file.name}</span>
                                    <p>PDF</p>
                                    <button onClick={(e) => {
                                        e.preventDefault();
                                        handleFileRemove(file.name)}
                                    } className={styles.removeButton} title='Remove' aria-label='Remove'><IoIosClose fontSize={21} /></button>
                                </li>
                            ) : (
                                <li key={index}>
                                    <Image src={URL.createObjectURL(file)} alt={file.name} width={180} height={150} />
                                    <button onClick={(e) => {
                                        e.preventDefault();
                                        handleFileRemove(file.name)}
                                    } className={styles.removeButton} title='Remove' aria-label='Remove'><IoIosClose fontSize={21} /></button>
                                </li>
                            )
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default FileUpload;