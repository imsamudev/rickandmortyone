import React, { useState, useEffect } from 'react';
import { Input } from "@nextui-org/react";
import { FaSearch } from 'react-icons/fa';

interface FilterLocationsProps {
    onSearch: (query: string) => void;
    loading: boolean;
}

const FilterLocations: React.FC<FilterLocationsProps> = ({ onSearch, loading }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            onSearch(searchTerm);
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, onSearch]);

    return (
        <div className="mb-6 flex justify-center items-center">
            <Input
                fullWidth
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
