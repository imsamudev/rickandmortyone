import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Divider } from "@nextui-org/react";
import { Location } from '@/types/Locations';
import { Character } from '@/types/Characters';
import axios from 'axios';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import SmallCard from '@/components/Characters/SmallCard';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';



interface LocationModalProps {
    location: Location | null;
    isOpen: boolean;
    onClose: () => void;
}

const LocationModal: React.FC<LocationModalProps> = ({ location, isOpen, onClose }) => {
    const [residents, setResidents] = useState<Character[]>([]);
    const [loadingResidents, setLoadingResidents] = useState<boolean>(false);

    useEffect(() => {
        const fetchResidents = async () => {
            if (location && location.residents.length > 0) {
                setLoadingResidents(true);
                try {
                    const residentIds = location.residents.map(url => url.split('/').pop());
                    const response = await axios.get(`https://rickandmortyapi.com/api/character/${residentIds}`);
                    setResidents(Array.isArray(response.data) ? response.data : [response.data]);
                } catch (error) {
                    console.error("Error fetching residents:", error);
                } finally {
                    setLoadingResidents(false);
                }
            }
        };

        fetchResidents();
    }, [location]);

    if (!location) return null;

    return (
        <Modal isOpen={isOpen} onOpenChange={onClose} size="5xl" closeButton>
            <ModalContent>
                <ModalHeader>{location.name} Details</ModalHeader>
                <Divider />
                <ModalBody>
                    <div className='mb-4'>
                        <p>Type: {location.type}</p>
                        <p>Dimension: {location.dimension ?? 'Unknown'}</p>
                        <p>Residents: {location.residents.length}</p>
                    </div>
                    {loadingResidents ? (
                        <p>Loading residents...</p>
                    ) : residents.length > 0 ? (
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
                                {residents.map((resident) => (
                                    <SwiperSlide key={resident.id} className='mb-8 pb-4'>
                                        <SmallCard character={resident} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    ) : (
                        <p>No residents found for this location.</p>
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

export default LocationModal;
