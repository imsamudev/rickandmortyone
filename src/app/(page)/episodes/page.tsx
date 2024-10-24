"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableEpisodes from '@/components/Episodes/TableEpisodes';
import FilterEpisodes from '@/components/Episodes/FilterEpisodes';
import { Spinner } from "@nextui-org/react";
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
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl lg:text-5xl font-bold mb-6 text-center">Rick and Morty Episodes</h1>

            <FilterEpisodes onSearch={handleSearch} loading={loading} />

            {loading ? (
                <div className="w-full h-[100vh] flex justify-center items-center">
                    <Spinner label="Loading episodes..." color="primary" size="lg" />
                </div>
            ) : error ? (
                <div className="w-full h-[100vh] flex justify-center items-center">
                    <h2 className="">NOT FOUND</h2>
                </div>
            ) : (
                <>
                    <TableEpisodes episodes={episodes} />

                    {paginationInfo && (
                        <div className="mt-8 flex justify-center items-center space-x-4">
                            <button
                                onClick={handlePrevPage}
                                disabled={currentPage <= 1}
                                className="px-4 py-2 bg-primary text-white rounded-lg disabled:bg-gray-300"
                            >
                                Prev
                            </button>
                            <span>Page {currentPage} of {paginationInfo?.pages ?? '?'}</span>
                            <button
                                onClick={handleNextPage}
                                disabled={!paginationInfo || currentPage >= paginationInfo.pages}
                                className="px-4 py-2 bg-primary text-white rounded-lg disabled:bg-gray-300"
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
