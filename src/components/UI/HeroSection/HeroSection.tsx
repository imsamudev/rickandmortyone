import React from 'react';
import { Divider } from "@nextui-org/react";

interface HeroSectionProps {
    title: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title }) => {
    return (
        <div className='h-[30vh] animate-fade-down animate-duration-500 animate-delay-400 sm:animate-fade-left'>
            <h1 className="text-5xl text-center md:text-right md:text-6xl lg:text-8xl drop-shadow-[-1.2px_1.2px_1.2px_rgba(0,0,0,0.8)] text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary dark:to-primary_1 mb-8 mt-6 py-4">
                <span className="text-2xl md:text-3xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-tr from-accent to-primary">
                    Rick and Morty
                </span>
                <Divider orientation='horizontal' className='my-2' />
                {title}
            </h1>
        </div>
    );
};

export default HeroSection;
