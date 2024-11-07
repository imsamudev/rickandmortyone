import React, { useState, useEffect, useRef } from 'react';
import { Input } from "@nextui-org/react";
import { FaSearch } from 'react-icons/fa';

interface FilterSearchProps {
    onSearch: (query: string) => void;
    loading: boolean;
    placeholder: string;
}

const FilterSearch: React.FC<FilterSearchProps> = ({ onSearch, placeholder }) => {
    const [query, setQuery] = useState<string>('');
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            onSearch(query);
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [query, onSearch]);

    const handleFocus = () => {
        if (searchRef.current) {
            searchRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            onSearch(query);
            (e.target as HTMLInputElement).blur();
        }
    };

    const handleIconClick = () => {
        onSearch(query);
    };

    return (
        <div ref={searchRef} className="mb-12 pt-6 flex justify-center items-center w-[100%] lg:w-[35%]">
            <Input
                variant='bordered'
                color="primary"
                radius="lg"
                size="lg"
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                endContent={
                    <FaSearch
                        onClick={handleIconClick}
                        className="cursor-pointer"
                    />
                }
                aria-label="Search"
                onFocus={handleFocus}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
};

export default FilterSearch;
