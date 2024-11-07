"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeroSection from '@/components/UI/HeroSection/HeroSection';
import FilterTitles from '@/components/UI/FilterTitles/FilterTitles';
import FilterSearch from '@/components/UI/FilterSearch/FilterSearch';
import LoadingSearch from '@/components/UI/Loaders/LoadingSearch';
import ErrorSearch from '@/components/UI/Errors/ErrorSearch';
import TableEpisodes from '@/components/Episodes/TableEpisodes';
import { Episode } from '@/types/Episodes';
import { PaginationInfo } from '@/types/Pagination';



const EpisodesPage: React.FC = () => {
    const [episodes, setEpisodes] = useState<Episode[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [query, setQuery] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [paginationInfo, setPaginationInfo] = useState<PaginationInfo | null>(null);

    const fetchEpisodes = async (searchQuery = '', page = 1) => {
        setLoading(true);
        try {
            const response = await axios.get(`https://rickandmortyapi.com/api/episode`, {
                params: {
                    page,
                    name: searchQuery,
                },
            });
            setEpisodes(response.data.results);
            setPaginationInfo(response.data.info);
            setError(null);
        } catch (error) {
            console.error('Error fetching episodes:', error);
            setError('No episodes found. Please try another search term.');
            setEpisodes([]);
            setPaginationInfo(null);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchEpisodes(query, currentPage);
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
        <div className="container mx-auto px-4 py-4">
            <HeroSection title="Episodes" />
            <div className='text-left my-4 animate-fade-up animate-duration-500 animate-delay-600 sm:animate-fade-right'>
                <FilterTitles section="episodes" />
                <div className='w-[100%] flex justify-start mt-4'>
                    <FilterSearch onSearch={handleSearch} loading={loading} placeholder="Search episodes..." />
                </div>
            </div>

            {loading ? (
                <LoadingSearch section='episodes' />
            ) : error ? (
                <ErrorSearch />
            ) : (
                <>
                    <div className='animate-fade-up animate-duration-500 animate-delay-200'>
                        <TableEpisodes episodes={episodes} />
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

export default EpisodesPage;
