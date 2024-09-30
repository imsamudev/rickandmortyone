"use client";
import { NavLink } from "@/types/UI/Header";
import { useStore } from "@/context/useStore";
import { FaBars, FaXmark } from "react-icons/fa6";
import Image from "next/image";
import Logo from "@/assets/logo/Logo.svg";
import rym0 from "@/assets/globals/rym0.svg";
import Link from "next/link";

const navLinks: NavLink[] = [
    { label: "Characters", href: "/characters" },
    { label: "Episodes", href: "/episodes" },
    { label: "Locations", href: "/locations" },
    { label: "About", href: "/about" },
];

const Header: React.FC = () => {
    const { isMenuOpen, toggleMenu } = useStore();

    return (
        <header className=" w-full p-4 shadow-md">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Link href={"/"} className="flex items-center space-x-2">
                        <Image src={Logo} alt="Logo" width={150} height={150} />
                    </Link>
                </div>
                <nav className="hidden sm:flex sm:items-center sm:space-x-6 lg:space-x-8 ml-auto">
                    {navLinks.map(({ label, href }) => (
                        <Link
                            key={label}
                            href={href}
                            className="text-xl text-darkBlue font-medium p-2"
                        >
                            {label}
                        </Link>
                    ))}
                </nav>
                <div className="block sm:hidden">
                    <button
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                        className="text-2xl"
                    >
                        {isMenuOpen ? <FaXmark /> : <FaBars />}
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="fixed inset-0 z-10 sm:hidden">
                    <div className="relative bg-white flex flex-col h-full w-full p-4 ml-auto animate-fade animate-duration-500">
                        <div className="flex justify-between">
                            <Link
                                href={"/"}
                                className="flex items-center space-x-2 animate-fade-down animate-duration-500"
                                style={{ animationDelay: `${navLinks.length * 0.2 + 0.45}s` }}
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
                        <nav className="flex flex-col mt-4">
                            {navLinks.map(({ label, href }, index) => (
                                <Link
                                    key={label}
                                    href={href}
                                    className="text-xl font-bold text-darkBlue py-4 px-2 animate-fade-left animate-duration-500"
                                    style={{ animationDelay: `${index * 0.2 + 0.4}s` }}
                                    onClick={toggleMenu}
                                >
                                    {label}
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
