import React from 'react'
import Image from 'next/image'

const TriviaGame = () => {
    return (
        <div className='text-center h-[100vh] flex flex-col justify-center items-center animate-fade-in duration-500'>
            <h1 className='text-4xl lg:text-7xl mb-4 drop-shadow-[-1.2px_1.2px_1.2px_rgba(0,0,0,1)]'>Coming Soon!</h1>
            <h2 className='text-2xl lg:text-4xl animate-pulse duration-1000'>Get ready for a Rick and Morty trivia challenge!</h2>
            <Image
                src='/images/global/rym3.png'
                alt='Rick and Morty image'
                width={250}
                height={250}
                objectFit='cover'
                className='block my-8 sm:w-72 lg:w-96 animate-expand-contract'
            />

        </div>
    )
}

export default TriviaGame