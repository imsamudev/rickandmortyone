"use client"
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import Image from 'next/image';
import { SliderHeroInterface } from '@/types/SliderHeroInterface';
import { useEffect, useState } from 'react';

import 'swiper/css';

const slides: SliderHeroInterface[] = [
    {
        title: "Welcome to Rick & Morty ONE",
        description: "A modern web site of the serie, discover the amazing Rick & Morty world!",
        backgroundImage: "/images/carouselHero/coverHero.webp",
        buttonText: "More about",
        buttonLink: "/about"
    },
    {
        title: "Characters",
        description: "Discover all the characters availables in the animated serie",
        backgroundImage: "/images/carouselHero/coverHero3.webp",
        buttonText: "Let's go!",
        buttonLink: "/characters"
    },
    {
        title: "Locations",
        description: "Discover all the locations availables in the animated serie",
        backgroundImage: "/images/carouselHero/coverHero4.webp",
        buttonText: "Let's go!",
        buttonLink: "/locations"
    },
    {
        title: "Episodes",
        description: "Discover all the episodes availables in the animated serie",
        backgroundImage: "/images/carouselHero/coverHero2.webp",
        buttonText: "Let's go!",
        buttonLink: "/episodes"
    },
];

export default function CarouselHero() {
    const [headerHeight, setHeaderHeight] = useState(0);

    useEffect(() => {
        const header = document.querySelector('header');
        if (header) {
            setHeaderHeight(header.offsetHeight);
        }

        const handleResize = () => {
            if (header) {
                setHeaderHeight(header.offsetHeight);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 5000 }}
            slidesPerView={1}
            style={{ height: `calc(100vh - ${headerHeight}px) ` }}
        >
            {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                    <div className="relative h-full">
                        <Image
                            src={slide.backgroundImage}
                            alt={slide.title}
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-start text-white text-center md:text-left p-4">
                            <div className='p-4 rounded-xl bg-gradient-to-tr from-1% md:bg-gradient-to-br from-black w-full md:w-3/4'>
                                <h2 className="text-4xl font-bold mb-4 md:text-7xl drop-shadow-lg">{slide.title}</h2>
                                <p className="text-xl font-bold drop-shadow-lg mb-8">{slide.description}</p>
                                <Link
                                    href={slide.buttonLink}
                                    className="bg-primary text-white drop-shadow-lg font-bold py-2 px-4 rounded-full shadow-lg hover:bg-accent hover:text-black transition duration-300"
                                >
                                    {slide.buttonText}
                                </Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};