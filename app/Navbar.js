import Link from "next/link";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";

const Navbar = () => {
    const [nav, setNav] = useState(false);

    const links = [
        {
            id: 1,
            link: "/",
            title: "Home",
        },
        {
            id: 2,
            link: "/about",
            title: "About",
        },
        {
            id: 5,
            link: "https://github.com/Mango932/EcoFlow",
            title: "Contact",
        },
    ];

    return (
        <div className="flex justify-around items-center w-full px-20 py-5 text-white nav bg-green-200 ">
            <div className="">
                <a href="" target="_blank" rel="noreferrer">
                    <Image
                        src="/Logo.png"
                        alt="Logo"
                        width={150}
                        height={150}
                    />
                </a>
            </div>

            <div className="hidden md:flex">
                {links.map(({ id, link, title }) => (
                    <li
                        key={id}
                        className="nav-links px-4 cursor-pointer capitalize font-medium text-green-700 hover:scale-105 hover:text-green-800 duration-200 link-underline flex text-xl"
                    >
                        <Link href={link}>{title}</Link>
                    </li>
                ))}
            </div>

            <div
                onClick={() => setNav(!nav)}
                className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
            >
                {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
            </div>

            {nav && (
                <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500">
                    {links.map(({ id, link }) => (
                        <li
                            key={id}
                            className="px-4 cursor-pointer capitalize py-6 text-4xl"
                        >
                            <Link onClick={() => setNav(!nav)} href={link}>
                                {link}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Navbar;
