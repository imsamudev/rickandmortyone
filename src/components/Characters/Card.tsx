import React, { useState } from 'react';
import Image from 'next/image';
import { Character } from '@/types/Characters';
import CharacterModal from '@/components/Characters/CharacterModal';

interface CardProps {
    character: Character;
}

const Card: React.FC<CardProps> = ({ character }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <>
            <div
                className="bg-secondary text-white rounded-lg shadow-md overflow-hidden max-w-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={handleOpenModal}
            >
                <div className="relative w-full h-64">
                    <Image
                        src={character.image}
                        alt={character.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-lg"
                    />
                </div>
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-2">{character.name}</h2>
                    <p className="">Status: {character.status}</p>
                    <p className="">Species: {character.species}</p>
                    <p className="">Gender: {character.gender}</p>
                </div>
            </div>
            <CharacterModal character={character} isOpen={isModalOpen} onClose={handleCloseModal} />
        </>
    );
};

export default Card;
