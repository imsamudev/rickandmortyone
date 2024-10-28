import React, { useState, useEffect } from 'react';
import { Input } from "@nextui-org/react";
import { FaSearch } from 'react-icons/fa';

interface FilterLocationsProps {
    onSearch: (query: string) => void;
    loading: boolean;
}

const FilterLocations: React.FC<FilterLocationsProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            onSearch(searchTerm);
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, onSearch]);

    return (
        <div className="mb-12 flex justify-center items-center w-[100%] lg:w-[35%] ">
            <Input
                color='primary'
                radius='lg'
                size='lg'
                placeholder="Search locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                endContent={<FaSearch />}
                aria-label="Search locations"
            />
        </div>
    );
};

export default FilterLocations;
