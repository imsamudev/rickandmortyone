'use client';

import ErrorBoundary from '@/components/ErrorBoundary';
import { NextUIProvider, Spinner } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import Image from 'next/image';
import Logo from "@/assets/logo/Logo.svg";
import { useEffect, useState } from 'react';

const LOADING_DELAY = 3000;
const EXIT_ANIMATION_DURATION = 800;

export function Providers({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [exiting, setExiting] = useState(false);

    useEffect(() => {
        setMounted(true);

        window.requestAnimationFrame(() => {
            document.body.style.display = 'none';
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            document.body.offsetHeight;
            document.body.style.display = '';
        });

        const timer = setTimeout(() => {
            setExiting(true);
            setTimeout(() => {
                setLoading(false);
            }, EXIT_ANIMATION_DURATION);
        }, LOADING_DELAY);

        return () => clearTimeout(timer);
    }, []);

    if (!mounted || loading) {
        return (
            <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
                <div className={`flex flex-col h-screen justify-center items-center text-center bg-gradient-to-tr from-white to-gray-300 dark:from-black dark:to-secondary
                ${exiting ? 'animate-fade-out' : 'animate-fade-in'}`}>
                    <Image
                        src={Logo}
                        alt="Logo"
                        width={280} height={280}
                        className='py-8'
                    />
                    <Spinner

                        label="Rick's working his magic, just a moment..."
                        labelColor='primary'
                        color="primary"
                        size="lg"
                        className='p-4'
                    />
                    <Image
                        src="/images/global/rick.svg"
                        alt="Rick svg"
                        width={200}
                        height={200}
                        className='animate-delay-100 animate-appearance-in animate-iteration-infinite animate-duration-1000'
                    />
                </div>
            </NextThemesProvider>
        );
    }

    return (
        <ErrorBoundary>
            <NextUIProvider>
                <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
                    {children}
                </NextThemesProvider>
            </NextUIProvider>
        </ErrorBoundary>
    );
}