import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Spinner, Divider } from "@nextui-org/react";
import axios from 'axios';
import Image from 'next/image';
import { Character } from '@/types/Characters';
import { Episode } from '@/types/Episodes';
import { Location } from '@/types/Locations';
import LocationModal from '@/components/Locations/LocationsModal';
import EpisodeModal from '@/components/Episodes/EpisodesModal';

interface CharacterModalProps {
    character: Character;
    isOpen: boolean;
    onClose: () => void;
}

const CharacterModal: React.FC<CharacterModalProps> = ({ character, isOpen, onClose }) => {
    const [loadingDetails, setLoadingDetails] = useState<boolean>(false);
    const [episodes, setEpisodes] = useState<Episode[]>([]);
    const [origin, setOrigin] = useState<Location | null>(null);
    const [location, setLocation] = useState<Location | null>(null);

    const [locationModalData, setLocationModalData] = useState<Location | null>(null);
    const [isLocationModalOpen, setIsLocationModalOpen] = useState<boolean>(false);
    const [episodeModalData, setEpisodeModalData] = useState<Episode | null>(null);
    const [isEpisodeModalOpen, setIsEpisodeModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchAdditionalDetails = async () => {
            if (!isOpen) return;
            setLoadingDetails(true);
            try {
                const [originData, locationData, episodeData] = await Promise.all([
                    character.origin.url ? axios.get(character.origin.url).then(res => res.data) : null,
                    character.location.url ? axios.get(character.location.url).then(res => res.data) : null,
                    character.episode.length > 0
                        ? axios.get(`https://rickandmortyapi.com/api/episode/${character.episode.map(ep => ep.split('/').pop())}`)
                            .then(res => Array.isArray(res.data) ? res.data : [res.data])
                        : []
                ]);

                setOrigin(originData);
                setLocation(locationData);
                setEpisodes(episodeData);
            } catch (error) {
                console.error("Error fetching additional details:", error);
            }
            setLoadingDetails(false);
        };

        fetchAdditionalDetails();
    }, [isOpen, character]);

    const openLocationModal = (location: Location) => {
        setLocationModalData(location);
        setIsLocationModalOpen(true);
    };

    const openEpisodeModal = (episode: Episode) => {
        setEpisodeModalData(episode);
        setIsEpisodeModalOpen(true);
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onOpenChange={onClose}
                size="full"
                closeButton
                className="h-auto"
                classNames={{
                    closeButton: "text-2xl",
                }}
            >
                <ModalContent>
                    <ModalHeader>
                        <div className="text-2xl font-bold">Character Details</div>
                    </ModalHeader>
                    <Divider />
                    <ModalBody className="overflow-auto max-h-[80vh]">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <Image
                                src={character.image}
                                alt={character.name}
                                width={200}
                                height={200}
                                className="rounded-lg"
                            />
                            <div className="text-lg">
                                <h2 className="text-3xl md:text-4xl pb-2">
                                    <strong>{character.name}</strong>
                                </h2>
                                <p><strong>Status:</strong> {character.status}</p>
                                <p><strong>Species:</strong> {character.species}</p>
                                <p><strong>Gender:</strong> {character.gender}</p>
                                <p><strong>Type:</strong> {character.type ? character.type : "Unknown"}</p>

                                <p>
                                    <strong>Origin:</strong>{" "}
                                    {origin ? (
                                        <span
                                            onClick={() => openLocationModal(origin)}
                                            className="cursor-pointer hover:underline"
                                        >
                                            {origin.name}
                                        </span>
                                    ) : (
                                        "Unknown"
                                    )}
                                </p>
                                <p>
                                    <strong>Location:</strong>{" "}
                                    {location ? (
                                        <span
                                            onClick={() => openLocationModal(location)}
                                            className="cursor-pointer hover:underline"
                                        >
                                            {location.name}
                                        </span>
                                    ) : (
                                        "Unknown"
                                    )}
                                </p>
                            </div>
                        </div>

                        <Divider className="my-4" />

                        {loadingDetails ? (
                            <div className="flex justify-center items-center">
                                <Spinner label="Loading details..." labelColor="primary" color="primary" size="lg" />
                            </div>
                        ) : (
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Episodes:</h3>
                                <ul className="list-disc list-inside">
                                    {episodes.map((episode) => (
                                        <li
                                            key={episode.id}
                                            className="cursor-pointer hover:underline"
                                            onClick={() => openEpisodeModal(episode)}
                                        >
                                            {episode.name} (Air date: {episode.air_date})
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </ModalBody>
                    <Divider />
                    <ModalFooter>
                        <Button color="danger" onPress={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <LocationModal
                location={locationModalData}
                isOpen={isLocationModalOpen}
                onClose={() => setIsLocationModalOpen(false)}
            />
            <EpisodeModal
                episode={episodeModalData}
                isOpen={isEpisodeModalOpen}
                onClose={() => setIsEpisodeModalOpen(false)}
            />
        </>
    );
};

export default CharacterModal;