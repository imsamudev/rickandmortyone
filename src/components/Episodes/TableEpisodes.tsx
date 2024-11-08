import React, { useState } from 'react';
import { FaFileAlt } from 'react-icons/fa';
import { Episode } from '@/types/Episodes';
import EpisodeModal from '@/components/Episodes/EpisodesModal';

interface TableEpisodesProps {
    episodes: Episode[];
}

const TableEpisodes: React.FC<TableEpisodesProps> = ({ episodes }) => {
    const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleOpenModal = (episode: Episode) => {
        setSelectedEpisode(episode);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedEpisode(null);
    };

    return (
        <>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto bg-white dark:bg-secondary rounded-lg overflow-hidden">
                    <thead className="bg-primary text-white text-lg tracking-wider dark:text-secondary">
                        <tr>
                            <th className="py-3 px-4 text-left">Name</th>
                            <th className="py-3 px-4 text-left hidden sm:table-cell">Air Date</th>
                            <th className="py-3 px-4 text-left hidden md:table-cell">Episode</th>
                            <th className="py-3 px-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {episodes.map((episode) => (
                            <tr key={episode.id} className="border-b border-opacity-40 border-primary">
                                <td className="p-4">{episode.name}</td>
                                <td className="p-4 hidden sm:table-cell">{episode.air_date}</td>
                                <td className="p-4 hidden md:table-cell">{episode.episode}</td>
                                <td className="p-4 text-right">
                                    <button
                                        className="text-white dark:text-secondary bg-primary hover:bg-primary_1 hover:scale-90 transition-all duration-300 px-4 py-2 rounded-lg"
                                        onClick={() => handleOpenModal(episode)}
                                    >
                                        <FaFileAlt size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedEpisode && (
                <EpisodeModal
                    episode={selectedEpisode}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
};

export default TableEpisodes;
