import React from 'react';

interface FilterTitlesProps {
    section: string;
}

const FilterTitles: React.FC<FilterTitlesProps> = ({ section }) => {
    return (
        <>
            <p className='text-2xl md:text-3xl px-1'>
                Discover all the {section} available in the serie
            </p>
            <p className='text-base md:text-lg mb-4 px-1 animate-pulse animate-duration-1000 animate-infinite animate-delay-1000'>
                Start by searching for your favorite {section}!
            </p>
        </>
    );
};

export default FilterTitles;
