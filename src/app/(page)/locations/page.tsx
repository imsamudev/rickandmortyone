"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeroSection from '@/components/UI/HeroSection/HeroSection';
import FilterTitles from '@/components/UI/FilterTitles/FilterTitles';
import TableLocations from '@/components/Locations/TableLocations';
import FilterLocations from '@/components/Locations/FilterLocations';
import { Spinner } from "@nextui-org/react";
import { Location } from '@/types/Locations';
import { PaginationInfo } from '@/types/Pagination';

const LocationsPage: React.FC = () => {
    const [locations, setLocations] = useState<Location[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [query, setQuery] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [paginationInfo, setPaginationInfo] = useState<PaginationInfo | null>(null);

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

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (paginationInfo && currentPage < paginationInfo.pages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <HeroSection title="Locations" />
            <div className='text-left animate-fade-up animate-duration-500 animate-delay-600 sm:animate-fade-right'>
                <FilterTitles section="locations" />
                <div className='w-[100%] flex justify-start mt-4'>
                    <FilterLocations onSearch={handleSearch} loading={loading} />
                </div>
            </div>

            {loading ? (
                <div className="w-full h-[100vh] flex justify-center items-center">
                    <Spinner label="Loading locations..." labelColor="primary" color="primary" size="lg" />
                </div>
            ) : error ? (
                <div className="w-full h-[100vh] flex justify-center items-center">
                    <h2 className="">NOT FOUND</h2>
                </div>
            ) : (
                <>
                    <div className='animate-fade-up animate-duration-500 animate-delay-200'>
                        <TableLocations locations={locations} />
                    </div>

                    {paginationInfo && (
                        <div className="mt-8 flex justify-center items-center space-x-4">
                            <button
                                onClick={handlePrevPage}
                                disabled={currentPage <= 1}
                                className="px-4 py-2 bg-primary dark:bg-secondary_1 text-white dark:text-primary rounded-lg shadow-sm shadow-secondary dark:shadow-primary disabled:bg-primary_1 dark:disabled:bg-secondary hover:opacity-70 disabled:hover:opacity-100"
                            >
                                Prev
                            </button>
                            <span>Page {currentPage} of {paginationInfo?.pages ?? '?'}</span>
                            <button
                                onClick={handleNextPage}
                                disabled={!paginationInfo || currentPage >= paginationInfo.pages}
                                className="px-4 py-2 bg-primary dark:bg-secondary_1 text-white dark:text-primary rounded-lg shadow-sm shadow-secondary dark:shadow-primary disabled:bg-primary_1 dark:disabled:bg-secondary hover:opacity-70 disabled:hover:opacity-100"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default LocationsPage;
