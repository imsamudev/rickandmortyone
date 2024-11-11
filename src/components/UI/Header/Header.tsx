"use client";
import { NavLink } from "@/types/UI/Header";
import { useStore } from "@/context/useStore";
import { FaBars, FaXmark } from "react-icons/fa6";
import Image from "next/image";
import Logo from "@/assets/logo/Logo.svg";
import rym0 from "@/assets/globals/rym0.svg";
import Link from "next/link";
import Switcher from "@/components/UI/Header/Switcher";
import { Divider } from "@nextui-org/react";

const navLinks: NavLink[] = [
    { label: "Characters", href: "/characters" },
    { label: "Locations", href: "/locations" },
    { label: "Episodes", href: "/episodes" },
    { label: "Game", href: "/trivia" },
];

const Header: React.FC = () => {
    const { isMenuOpen, toggleMenu } = useStore();

    return (
        <header className=" w-full p-4">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Link href={"/"} className="flex items-center space-x-2">
                        <Image
                            src={Logo}
                            alt="Logo"
                            width={150}
                            height={150}
                            className="sm:w-52 lg:w-64 xl:72"
                        />
                    </Link>
                </div>
                <nav className="hidden sm:flex sm:items-center sm:space-x-2 lg:space-x-4 ml-auto">
                    {navLinks.map(({ label, href }) => (
                        <Link
                            key={label}
                            href={href}
                            className="text-base lg:text-xl xl:text-2xl font-medium p-2"
                        >
                            {label}
                        </Link>
                    ))}
                </nav>
                <div className="flex justify-center items-center">
                    <div className="px-4 sm:px-2 sm:pl-4">
                        <Switcher />
                    </div>
                    <div className="block sm:hidden pt-1">
                        <button
                            onClick={toggleMenu}
                            aria-label="Toggle menu"
                            className="text-2xl"
                        >
                            {isMenuOpen ? <FaXmark /> : <FaBars />}
                        </button>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="fixed inset-0 z-10 sm:hidden">
                    <div className="relative bg-gradient-to-tr from-primary_1 to-primary dark:from-secondary_1 dark:to-secondary text-secondary dark:text-primary flex flex-col h-full w-full p-4 ml-auto animate-fade animate-duration-300 z-50">
                        <div className="flex justify-between">
                            <Link
                                href={"/"}
                                className="flex text-xl items-center space-x-2 animate-fade-down animate-duration-300"
                                style={{ animationDelay: `${navLinks.length * 0.2 + 0.35}s` }}
                            >
                                <Image src={Logo} alt="Logo" width={150} height={150} />
                            </Link>
                            <button
                                onClick={toggleMenu}
                                aria-label="Close menu"
                                className="text-2xl self-end mb-4"
                            >
                                <FaXmark />
                            </button>
                        </div>
                        <nav className="flex flex-col mt-4 items-center">
                            {navLinks.map(({ label, href }, index) => (
                                <Link
                                    key={label}
                                    href={href}
                                    className="text-2xl py-4 mt-2 text-center animate-fade-up animate-duration-300"
                                    style={{ animationDelay: `${index * 0.19 + 0.3}s` }}
                                    onClick={toggleMenu}
                                >
                                    {label}
                                    <Divider orientation='horizontal'
                                        className="bg-primary my-2" />
                                </Link>
                            ))}
                        </nav>

                        <div>
                            <Image className="absolute bottom-1 right-2 opacity-25" src={rym0} alt='rickandmortySVG' width={150} height={150} />
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
