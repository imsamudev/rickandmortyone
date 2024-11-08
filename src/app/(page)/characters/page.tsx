"use client";
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import HeroSection from '@/components/UI/HeroSection/HeroSection';
import FilterTitles from '@/components/UI/FilterTitles/FilterTitles';
import FilterSearch from '@/components/UI/FilterSearch/FilterSearch';
import ErrorSearch from '@/components/UI/Errors/ErrorSearch';
import LoadingSearch from '@/components/UI/Loaders/LoadingSearch';
import Card from '@/components/Characters/Card';
import PaginationButtons from '@/components/UI/Pagination/PaginationButtons';
import { Character } from '@/types/Characters';
import { PaginationInfo } from '@/types/Pagination';



const CharactersPage: React.FC = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [query, setQuery] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [paginationInfo, setPaginationInfo] = useState<PaginationInfo | null>(null);
    const searchBoxRef = useRef<HTMLDivElement | null>(null);

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

    return (
        <div className="container mx-auto px-4 py-4">
            <HeroSection title="Characters" />
            <div ref={searchBoxRef} className='text-left my-4 animate-fade-up animate-duration-500 animate-delay-600 sm:animate-fade-right'>
                <FilterTitles section="characters" />
                <div className='w-[100%] flex justify-start mt-4'>
                    <FilterSearch onSearch={handleSearch} loading={loading} placeholder="Search characters..." />
                </div>
            </div>

            {loading ? (
                <LoadingSearch section='characters' />
            ) : error ? (
                <ErrorSearch />
            ) : (
                <>
                    <div className="grid grid-cols-1 justify-items-center sm:grid-cols-2 sm:justify-items-start md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {characters.map((character) => (
                            <Card key={character.id} character={character} />
                        ))}
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

export default CharactersPage;
