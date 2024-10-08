import React, { useState } from 'react';
import Image from 'next/image';
import { Character } from '@/types/Characters';
import CharacterModal from '@/components/Characters/CharacterModal';

interface SmallCardProps {
    character: Character;
}

const SmallCard: React.FC<SmallCardProps> = ({ character }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <>
            <div className="relative w-48 h-48 mx-auto"
                onClick={handleOpenModal}>
                <Image
                    src={character.image}
                    alt={character.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                />
                <div className="absolute bg-gradient-to-tr from-black w-full bottom-0 text-white py-2">
                    <h3 className="text-base px-2">{character.name}</h3>
                </div>
            </div>
            <CharacterModal character={character} isOpen={isModalOpen} onClose={handleCloseModal} />
        </>
    );
};

export default SmallCard;
