"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@/components/Characters/Card';
import FilterCharacter from '@/components/Characters/FilterCharacter';
import { Character } from '@/types/Characters';
import { PaginationInfo } from '@/types/Pagination';
import { Spinner } from "@nextui-org/react";

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
            <h1 className="text-3xl font-bold mb-6">Rick and Morty Characters</h1>

            <FilterCharacter onSearch={handleSearch} loading={loading} />

            {loading ? (
                <div className='w-full h-[100vh] flex justify-center items-center'>
                    <Spinner label="Loading characters..." color="primary" size="lg" />
                </div>
            ) : error ? (
                <div className="w-full h-[100vh] flex justify-center items-center">
                    <h2 className="">NOT FOUND</h2>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {characters.map((character) => (
                            <Card key={character.id} character={character} />
                        ))}
                    </div>
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

export default CharactersPage;
