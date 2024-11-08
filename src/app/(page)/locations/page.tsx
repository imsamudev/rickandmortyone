"use client";
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import HeroSection from '@/components/UI/HeroSection/HeroSection';
import FilterTitles from '@/components/UI/FilterTitles/FilterTitles';
import FilterSearch from '@/components/UI/FilterSearch/FilterSearch';
import ErrorSearch from '@/components/UI/Errors/ErrorSearch';
import LoadingSearch from '@/components/UI/Loaders/LoadingSearch';
import TableLocations from '@/components/Locations/TableLocations';
import PaginationButtons from '@/components/UI/Pagination/PaginationButtons';
import { Location } from '@/types/Locations';
import { PaginationInfo } from '@/types/Pagination';

const LocationsPage: React.FC = () => {
    const [locations, setLocations] = useState<Location[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [query, setQuery] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [paginationInfo, setPaginationInfo] = useState<PaginationInfo | null>(null);
    const searchBoxRef = useRef<HTMLDivElement | null>(null);

    const fetchLocations = async (searchQuery = '', page = 1) => {
        setLoading(true);
        try {
            const response = await axios.get(`https://rickandmortyapi.com/api/location`, {
                params: {
                    page,
                    name: searchQuery,
                },
            });
            setLocations(response.data.results);
            setPaginationInfo(response.data.info);
            setError(null);
        } catch (error) {
            console.error('Error fetching locations:', error);
            setError('No locations found. Please try another search term.');
            setLocations([]);
            setPaginationInfo(null);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchLocations(query, currentPage);
    }, [query, currentPage]);

    const handleSearch = (searchQuery: string) => {
        if (searchQuery !== query) {
            setQuery(searchQuery);
            setCurrentPage(1);
        }
    };

    return (
        <div className="container mx-auto px-4 py-4">
            <HeroSection title="Locations" />
            <div ref={searchBoxRef} className='text-left my-4 animate-fade-up animate-duration-500 animate-delay-600 sm:animate-fade-right'>
                <FilterTitles section="locations" />
                <div className='w-[100%] flex justify-start mt-4'>
                    <FilterSearch onSearch={handleSearch} loading={loading} placeholder="Search locations..." />

                </div>
            </div>

            {loading ? (
                <LoadingSearch section='locations' />

            ) : error ? (
                <ErrorSearch />
            ) : (
                <>
                    <div className='animate-fade-up animate-duration-500 animate-delay-200'>
                        <TableLocations locations={locations} />
                    </div>

                    {paginationInfo && (
                        <PaginationButtons
                            currentPage={currentPage}
                            totalPages={paginationInfo.pages}
                            onPrevPage={() => setCurrentPage(currentPage - 1)}
                            onNextPage={() => setCurrentPage(currentPage + 1)}
                            hasPrevPage={paginationInfo.prev !== null}
                            hasNextPage={paginationInfo.next !== null}
                            searchBoxRef={searchBoxRef}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default LocationsPage;
