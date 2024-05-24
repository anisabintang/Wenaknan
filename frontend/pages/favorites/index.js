import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { decode } from 'jwt-js-decode';
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

const RestaurantCard = ({ src, name, category }) => (
    <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
        <div className="flex flex-col grow font-medium text-black uppercase max-md:mt-7">
            <img loading="lazy" src={src} alt={name} className="self-center border border-gray-200 border-solid aspect-[1.41] w-[205px]" />
            <div className="flex flex-col py-4 pr-12 pl-3 rounded-none border border-gray-200 border-solid bg-zinc-200 max-md:pr-5">
                <div className="self-end text-lg text-center"> {name} </div>
                <div className="self-start mt-6 text-xs"> category: {category} </div>
            </div>
        </div>
    </div>
);

function MyComponent() {
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = decode(token);
            console.log('Decoded JWT token:', decodedToken); // Log the contents of the token
            console.log('payload:', decodedToken.payload); // Log the payload (data

            setUserInfo({
                name: decodedToken.payload.name,
                email: decodedToken.payload.email
            });
        } else {
            console.error('No token found');
        }
    }, []);

    useEffect(() => {
        console.log('User info:', userInfo);
    }, [userInfo]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    const restaurantData = [
    ];

    return (
        <main className="flex flex-col justify-center bg-white">
            <header className="flex flex-col w-full bg-white max-md:max-w-full">
                <Navbar />
            </header>
            <div className="flex flex-col w-full bg-white max-md:max-w-full">
                <div className="mt-1.5 w-full max-md:max-w-full">
                    <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                        <Sidebar userInfo={userInfo} onLogout={handleLogout} />
                    </div>
                </div>
            </div>

        </main>
    );
}

export default MyComponent;