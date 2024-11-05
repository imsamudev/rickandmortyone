import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Divider, Spinner } from "@nextui-org/react";
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
        <Modal
            isOpen={isOpen}
            onOpenChange={onClose}
            size="5xl"
            closeButton
            classNames={{
                closeButton: "text-3xl m-1 text-white dark:text-primary hover:bg-primary dark:hover:bg-secondary",
            }}>

            <ModalContent>
                <ModalHeader
                    className='bg-gradient-to-r from-primary to-primary_1 dark:from-secondary dark:to-secondary_1'
                >
                    <div
                        className='text-2xl text-white dark:text-primary font-bold tracking-widest'>
                        {location.name} Details
                    </div>
                </ModalHeader>
                <Divider />
                <ModalBody
                    className="overflow-auto bg-gradient-to-tr from-white to-gray-300 dark:from-secondary dark:to-secondary_1 py-4"
                >
                    <div className='mb-4'>
                        <p>Type: {location.type}</p>
                        <p>Dimension: {location.dimension ?? 'Unknown'}</p>
                        <p>Residents: {location.residents.length}</p>
                    </div>
                    {loadingResidents ? (
                        <Spinner
                            label='Loading residents...'
                            labelColor='primary'
                            color="primary"
                            size="lg"
                        />
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

export default LocationModal;
