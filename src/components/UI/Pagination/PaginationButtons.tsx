import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPrevPage: () => void;
    onNextPage: () => void;
    hasPrevPage: boolean;
    hasNextPage: boolean;
}

const PaginationButtons: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPrevPage,
    onNextPage,
    hasPrevPage,
    hasNextPage
}) => {
    return (
        <div className="mt-8 flex justify-center items-center space-x-4">
            <button
                onClick={onPrevPage}
                disabled={!hasPrevPage}
                className="px-4 py-2 bg-primary dark:bg-secondary_1 text-white dark:text-primary rounded-lg shadow-sm shadow-secondary dark:shadow-primary disabled:bg-primary_1 dark:disabled:bg-secondary hover:opacity-70 disabled:hover:opacity-100"
            >
                Prev
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
                onClick={onNextPage}
                disabled={!hasNextPage}
                className="px-4 py-2 bg-primary dark:bg-secondary_1 text-white dark:text-primary rounded-lg shadow-sm shadow-secondary dark:shadow-primary disabled:bg-primary_1 dark:disabled:bg-secondary hover:opacity-70 disabled:hover:opacity-100"
            >
                Next
            </button>
        </div>
    );
};

export default PaginationButtons;
