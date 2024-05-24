// Import the useState and useEffect hooks from React
import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import axios from "axios";
import { decode } from 'jwt-js-decode';
import Navbar from "@/components/navbar";
import RestaurantCard from "@/components/restcard";

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
                        <li className="flex mt-3 w-full rounded">
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

const STORAGE_URL = 'http://localhost:8080';

function RestaurantDetails() {
    const router = useRouter();
    const { id } = router.query;
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({});

    // Function to fetch restaurant details
    const fetchRestaurant = async () => {
        try {
            const response = await axios.get(`${STORAGE_URL}/restaurant/${id}`);
            const data = response.data;
            const imagePath = `${STORAGE_URL}/${data.restaurant_photo_path.replace(/\\/g, '/')}`;
            const restaurantWithImage = {
                ...data,
                image: imagePath
            };
            setRestaurant(restaurantWithImage);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching restaurant', error);
            setLoading(false);
        }
    };

    // Effect hook to fetch restaurant details when id changes
    useEffect(() => {
        if (id) {
            fetchRestaurant();
        }
    }, [id]);

    // Effect hook to fetch user info when component mounts
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = decode(token);
            console.log('Decoded JWT token:', decodedToken); // Log the contents of the token
            console.log('payload:', decodedToken.payload);             // Log the payload (data)
            setUserInfo({
                name: decodedToken.payload.name,
                email: decodedToken.payload.email
            });
        } else {
            console.error('No token found');
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    // Rendering loading state while data is being fetched
    if (loading) {
        return <p>Loading...</p>;
    }

    // Rendering "Restaurant not found" message if restaurant data is not available
    if (!restaurant) {
        return <p>Restaurant not found</p>;
    }

    // Rendering the RestaurantDetails component with fetched data
    return (
        <div className="flex flex-col justify-center bg-white">
            <Navbar />
            <div className="flex flex-col w-full bg-white max-md:max-w-full">
                <div className="mt-1.5 w-full max-md:max-w-full">
                    <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                        {/* Passing userInfo and handleLogout to Sidebar component */}
                        <Sidebar userInfo={userInfo} onLogout={handleLogout} />
                        <main
                            className="flex flex-col ml-5 w-[77%] max-md:ml-0 max-md:w-full"
                            style={{ overflowY: "scroll", maxHeight: "100vh" }}
                        >
                            <div className="flex flex-col grow items-center px-16 pt-12 text-black max-md:px-5 max-md:mt-1.5 max-md:max-w-full">
                                <div className="flex flex-col max-w-full w-[641px]">
                                    <RestaurantCard restaurant={restaurant} />
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RestaurantDetails;

