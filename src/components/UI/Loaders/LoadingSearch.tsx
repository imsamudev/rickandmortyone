import { Spinner } from '@nextui-org/react';

interface LoadingSearchProps {
    section: string;
}

const LoadingSearch: React.FC<LoadingSearchProps> = ({ section }) => {
    return (
        <div className='w-full h-[40vh] flex justify-center items-center'>
            <Spinner label={`Loading ${section}...`}
                labelColor='primary'
                color='primary'
                size='lg'
                className='p-2 '
            />
        </div>
    );
};

export default LoadingSearch;
