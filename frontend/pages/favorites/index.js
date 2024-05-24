import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { decode } from 'jwt-js-decode';
import Navbar from "@/components/navbar";

function Sidebar({ userInfo, onLogout }) {
    const router = useRouter();

    return (
        <aside className="flex flex-col w-[23%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow justify-between p-5 mx-auto w-full text-base font-medium bg-white max-md:mt-1.5">
                <img loading="lazy" src="" className="w-8 aspect-square" />
                <nav>
                    <ul>
                        <li className={`flex mt-7 w-full text-black ${router.pathname === '/main' ? 'bg-blue-50' : ''} rounded`}>
                            <a href="/main" className="flex items-center gap-4 p-3 rounded w-full">
                                <img
                                    loading="lazy"
                                    src="/assets/foryou.png"
                                    className="shrink-0 w-5 aspect-square"
                                />
                                <span className="flex-1">For You</span>
                            </a>
                        </li>
                        <li className={`flex mt-3 w-full rounded ${router.pathname === '/favorites' ? 'bg-blue-50' : ''}`}>
                            <a href="/favorites" className="flex items-center gap-4 p-3 text-slate-700 rounded w-full">
                                <img
                                    loading="lazy"
                                    src="/assets/favorites.png"
                                    className="shrink-0 w-5 aspect-square"
                                />
                                <span className="flex-1">Favorites</span>
                            </a>
                        </li>
                        <li className={`flex mt-3 w-full rounded ${router.pathname === '/profile' ? 'bg-blue-50' : ''}`}>
                            <a href="#" className="flex items-center gap-4 p-3 text-slate-700 rounded w-full">
                                <img
                                    loading="lazy"
                                    src="/assets/profile.png"
                                    className="shrink-0 w-5 aspect-square"
                                />
                                <span className="flex-1">Profile</span>
                            </a>
                        </li>
                    </ul>
                </nav>
                <div className="flex gap-2 justify-center p-3 mt-96 text-xs max-md:mt-10">
                    <img
                        loading="lazy"
                        src=""
                        className="shrink-0 w-10 aspect-square"
                    />
                    <div className="flex flex-col flex-1 my-auto">
                        <div className="leading-[133%] text-slate-700">{userInfo.name}</div>
                        <div className="mt-1 leading-[117%] text-slate-500">
                            {userInfo.email}
                        </div>
                    </div>
                </div>
                <div className="flex gap-4 justify-center p-3 mt-3 whitespace-nowrap rounded text-slate-700 cursor-pointer" onClick={onLogout}>
                    <img
                        loading="lazy"
                        src=""
                        className="shrink-0 w-5 aspect-square"
                    />
                    <div className="flex-1">Logout</div>
                </div>
            </div>
        </aside>
    );
}

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