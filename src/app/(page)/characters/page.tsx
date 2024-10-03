"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@/components/Characters/Card';
import { Character } from '@/types/Characters';
import { PaginationInfo } from '@/types/Pagination';
import { Spinner } from "@nextui-org/react";

const CharactersPage: React.FC = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [paginationInfo, setPaginationInfo] = useState<PaginationInfo | null>(null);

    useEffect(() => {
        const fetchCharacters = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${currentPage}`);
                setCharacters(response.data.results);
                setPaginationInfo(response.data.info);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching characters:', error);
                setError('Failed to fetch characters. Please try again later.');
                setLoading(false);
            }
        };

        fetchCharacters();
    }, [currentPage]);

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

    if (loading) {
        return <div className='w-full h-[100vh] flex justify-center items-center'>
            <Spinner label="Loading characters..." color="primary" size="lg" />
        </div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Rick and Morty Characters</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {characters.map((character) => (
                    <Card key={character.id} character={character} />
                ))}
            </div>
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
        </div>
    );
};

export default CharactersPage;