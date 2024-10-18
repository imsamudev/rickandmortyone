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
        <Modal isOpen={isOpen} onOpenChange={onClose} size="5xl" closeButton>
            <ModalContent>
                <ModalHeader>{episode.name} Details</ModalHeader>
                <Divider />
                <ModalBody>
                    <div className='mb-4'>
                        <p>Air Date: {episode.air_date}</p>
                        <p>Episode: {episode.episode}</p>
                        <p>Characters: {episode.characters.length}</p>
                    </div>
                    {loadingCharacters ? (
                        <Spinner label="Loading characters..." labelColor="primary" color="primary" size="lg" />
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
                <ModalFooter>
                    <Button color="danger" onPress={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EpisodeModal;
