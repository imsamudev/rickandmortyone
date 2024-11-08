import React, { useState } from 'react';
import { FaFileAlt } from 'react-icons/fa';
import { Location } from '@/types/Locations';
import LocationModal from '@/components/Locations/LocationsModal';

interface TableLocationsProps {
    locations: Location[];
}

const TableLocations: React.FC<TableLocationsProps> = ({ locations }) => {
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleOpenModal = (location: Location) => {
        setSelectedLocation(location);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedLocation(null);
    };

    return (
        <>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto bg-white dark:bg-secondary rounded-lg overflow-hidden">
                    <thead className="bg-primary text-white text-lg tracking-wider dark:text-secondary">
                        <tr>
                            <th className="py-3 px-4 text-left">Name</th>
                            <th className="py-3 px-4 text-left hidden sm:table-cell">Type</th>
                            <th className="py-3 px-4 text-left hidden md:table-cell">Dimension</th>
                            <th className="py-3 px-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {locations.map((location) => (
                            <tr key={location.id} className="border-b border-opacity-40 border-primary">
                                <td className="p-4">{location.name}</td>
                                <td className="p-4 hidden sm:table-cell">{location.type}</td>
                                <td className="p-4 hidden md:table-cell">{location.dimension || 'Unknown'}</td>
                                <td className="p-4 text-right">
                                    <button
                                        className="text-white dark:text-secondary bg-primary hover:bg-primary_1 hover:scale-90 transition-all duration-300 px-4 py-2 rounded-lg"
                                        onClick={() => handleOpenModal(location)}
                                    >
                                        <FaFileAlt size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedLocation && (
                <LocationModal
                    location={selectedLocation}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
};

export default TableLocations;
