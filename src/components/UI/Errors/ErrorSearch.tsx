import React from 'react';
import Image from 'next/image';

const ErrorSearch = () => {
    return (
        <div className='my-2 flex flex-col justify-center items-center text-center animate-fade-up animate-duration-500'>
            <Image
                src='/images/global/rym2.png'
                alt='Rick and Morty PNG'
                width={250}
                height={250}
                objectFit='cover'
                className='block my-2 sm:w-72 lg:w-96 animate-expand-contract'
            />
            <h2
                className="text-4xl sm:text-5xl tracking-widest"
            >
                NOT FOUND
            </h2>
            <h3 className='animate-pulse animate-infinite animate-duration-1000'>
                Please, try another search...
            </h3>
        </div>
    );
};

export default ErrorSearch;
