import React, { useState, useEffect } from 'react';
import { Input } from "@nextui-org/react";
import { FaSearch } from 'react-icons/fa';

interface FilterCharacterProps {
    onSearch: (query: string) => void;
    loading: boolean;
}

const FilterCharacter: React.FC<FilterCharacterProps> = ({ onSearch, loading }) => {
    const [query, setQuery] = useState<string>('');

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            onSearch(query);
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [query, onSearch]);

    return (
        <div className="mb-12 flex justify-center items-center w-[100%] lg:w-[35%] ">
            <Input
                color='primary'
                radius='lg'
                size='lg'
                placeholder="Search characters..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                endContent={<FaSearch />}
                aria-label="Search characters"
            />
        </div>
    );
};

export default FilterCharacter;
