"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@/components/Characters/Card';
import FilterCharacter from '@/components/Characters/FilterCharacter';
import { Character } from '@/types/Characters';
import { PaginationInfo } from '@/types/Pagination';
import { Divider, Spinner } from "@nextui-org/react";


const CharactersPage: React.FC = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [query, setQuery] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [paginationInfo, setPaginationInfo] = useState<PaginationInfo | null>(null);

    const fetchCharacters = async (searchQuery = '', page = 1) => {
        setLoading(true);
        try {
            const response = await axios.get(`https://rickandmortyapi.com/api/character`, {
                params: {
                    page,
                    name: searchQuery,
                },
            });
            setCharacters(response.data.results);
            setPaginationInfo(response.data.info);
            setError(null);
        } catch (err) {
            console.error('Error fetching characters', err);
            setError('No characters found. Please try another search term.');
            setCharacters([]);
            setPaginationInfo(null);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCharacters(query, currentPage);
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
            <div className='h-[30vh] animate-fade-left animate-duration-500 animate-delay-400'>
                <h1 className="text-5xl text-center md:text-right md:text-6xl lg:text-8xl drop-shadow-[-1.2px_1.2px_1.2px_rgba(0,0,0,0.8)] text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary dark:to-primary_1 mb-8 mt-6 py-4">
                    <span className="text-2xl md:text-3xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-tr from-accent to-primary">
                        Rick and Morty
                    </span>
                    <Divider orientation='horizontal' className='my-2' />
                    Characters
                </h1>
            </div>

            <div className='text-center md:text-left animate-fade-right animate-duration-500 animate-delay-600'>
                <p className='text-2xl md:text-3xl px-1 '>
                    Discover all the characters available in the serie
                </p>
                <p className='text-base md:text-lg mb-4 px-1 animate-pulse animate-duration-1000 animate-infinite animate-delay-1000'>
                    Start by searching for your favorite characters!
                </p>
                <div className='w-[100%] flex justify-start mt-4'>
                    <FilterCharacter onSearch={handleSearch} loading={loading} />
                </div>
            </div>

            {loading ? (
                <div className='w-full h-[100vh] flex justify-center items-center'>
                    <Spinner label="Loading characters..." labelColor="primary" color="primary" size="lg" />
                </div>
            ) : error ? (
                <div className="w-full h-[100vh] flex justify-center items-center">
                    <h2 className="">NOT FOUND</h2>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 justify-items-center sm:grid-cols-2 sm:justify-items-start md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 animate-fade-up animate-duration-500 animate-delay-100">
                        {characters.map((character) => (
                            <Card key={character.id} character={character} />
                        ))}
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

export default CharactersPage;
