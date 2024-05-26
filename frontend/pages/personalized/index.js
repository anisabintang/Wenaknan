import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { decode } from 'jwt-js-decode';
import Navbar from "@/components/navbar";
import RestaurantCard from "../../components/restcard";
import Sidebar from "../../components/sidebar";

//shuffle function
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const STORAGE_URL = 'http://localhost:8080';

function Main() {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchRestaurants = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:8080/custom/recommend', {
                params:{
                    "userId": 1
                }
            });
            let data = response.data;

            const restaurantsWithAbsoluteImagePaths = data.map((restaurant) => {
                const imagePath = `${STORAGE_URL}/${restaurant.restaurant_photo_path.replace(/\\/g, '/')}`;
                return {
                    ...restaurant,
                    image: imagePath
                };
            });

            setRestaurants(restaurantsWithAbsoluteImagePaths);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching restaurants', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const handleScroll = (event) => {
        const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
        if (scrollHeight - scrollTop === clientHeight && !loading) {
            fetchRestaurants();
        }
    };

    return (
        <main
            className="flex flex-col ml-5 w-[77%] max-md:ml-0 max-md:w-full"
            onScroll={handleScroll}
            style={{ overflowY: "scroll", maxHeight: "100vh" }}
        >
            <div className="flex flex-col grow items-center px-16 pt-12 text-black max-md:px-5 max-md:mt-1.5 max-md:max-w-full">
                <div className="flex flex-col max-w-full w-[641px]">
                    {restaurants.map((restaurant) => (
                        <RestaurantCard restaurant={restaurant} userId={1} />
                    ))}
                </div>
                {loading && <p>Loading...</p>}
            </div>
        </main>
    );
}

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

    return (
        <div className="flex flex-col justify-center bg-white">
            <Navbar />
            <div className="flex flex-col w-full bg-white max-md:max-w-full">
                <div className="mt-1.5 w-full max-md:max-w-full">
                    <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                        <Sidebar userInfo={userInfo} onLogout={handleLogout} />
                        <Main />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyComponent;
