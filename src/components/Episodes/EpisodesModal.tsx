import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Divider, Spinner } from "@nextui-org/react";
import { Episode } from '@/types/Episodes';
import { Character } from '@/types/Characters';
import axios from 'axios';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import SmallCard from '@/components/Characters/SmallCard';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';

interface EpisodeModalProps {
    episode: Episode | null;
    isOpen: boolean;
    onClose: () => void;
}

const EpisodeModal: React.FC<EpisodeModalProps> = ({ episode, isOpen, onClose }) => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [loadingCharacters, setLoadingCharacters] = useState<boolean>(false);

    useEffect(() => {
        const fetchCharacters = async () => {
            if (episode && episode.characters.length > 0) {
                setLoadingCharacters(true);
                try {
                    const characterIds = episode.characters.map(url => url.split('/').pop());
                    const response = await axios.get(`https://rickandmortyapi.com/api/character/${characterIds}`);
                    setCharacters(Array.isArray(response.data) ? response.data : [response.data]);
                } catch (error) {
                    console.error("Error fetching characters:", error);
                } finally {
                    setLoadingCharacters(false);
                }
            }
        };

        fetchCharacters();
    }, [episode]);

    if (!episode) return null;

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onClose}
            size="5xl"
            closeButton
            classNames={{
                closeButton: "text-3xl m-1 text-white dark:text-primary hover:bg-primary dark:hover:bg-secondary",
            }}
        >
            <ModalContent>
                <ModalHeader
                    className='bg-gradient-to-r from-primary to-primary_1 dark:from-secondary dark:to-secondary_1'
                >
                    <div
                        className="text-2xl text-white dark:text-primary font-bold tracking-widest">
                        {episode.name} Details
                    </div>
                </ModalHeader>
                <Divider />
                <ModalBody
                    className="overflow-auto bg-gradient-to-tr from-white to-gray-300 dark:from-secondary dark:to-secondary_1 py-4"
                >
                    <div className='mb-4'>
                        <p>Air Date: {episode.air_date}</p>
                        <p>Episode: {episode.episode}</p>
                        <p>Characters: {episode.characters.length}</p>
                    </div>
                    {loadingCharacters ? (
                        <Spinner
                            label="Loading characters..."
                            labelColor="primary"
                            color="primary"
                            size="lg"
                        />
                    ) : characters.length > 0 ? (
                        <div className=''>
                            <Swiper
                                slidesPerView={1}
                                spaceBetween={10}
                                pagination={{
                                    type: 'fraction'
                                }}
                                modules={[Pagination]}
                                breakpoints={{

                                    480: {
                                        slidesPerView: 2,
                                        spaceBetween: 5
                                    },
                                    640: {
                                        slidesPerView: 3,
                                        spaceBetween: 10
                                    },
                                    1366: {
                                        slidesPerView: 5,
                                        spaceBetween: 30
                                    }
                                }}
                            >
                                {characters.map((character) => (
                                    <SwiperSlide key={character.id} className='mb-8 pb-4'>
                                        <SmallCard character={character} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    ) : (
                        <p>No characters found for this episode.</p>
                    )}
                </ModalBody>
                <Divider />
                <ModalFooter
                    className='bg-gradient-to-r from-primary to-primary_1 dark:from-secondary dark:to-secondary_1'
                >
                    <Button
                        onPress={onClose}
                        className='px-4 py-2 bg-primary dark:bg-secondary_1 text-white dark:text-primary rounded-lg shadow-sm shadow-secondary dark:shadow-primary hover:opacity-60 hover:scale-95 tracking-wider'>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EpisodeModal;
