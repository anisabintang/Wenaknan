import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { decode } from 'jwt-js-decode';
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import FaveCard from "@/components/Favecard";
import axios from "axios";

const STORAGE_URL = 'http://localhost:8080';

function Main({ userId }) {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchRestaurants = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:8080/user/${userId}/favorites`);
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
        if (userId) {
            fetchRestaurants();
        }
    }, [userId]);

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
            {loading && <p>Loading...</p>}
            <div className="grid grid-cols-4 gap-1">
                {restaurants.map((restaurant) => (
                    <FaveCard key={restaurant.restaurant_id} restaurant={restaurant} />
                ))}
            </div>
        </main>
    );
}

function MyComponent() {
    const [userInfo, setUserInfo] = useState({});
    const [userId, setUserId] = useState(null);

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

            setUserId(decodedToken.payload.user_id); // Assuming the token payload contains user_id
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
        <main className="flex flex-col justify-center bg-white">
            <header className="flex flex-col w-full bg-white max-md:max-w-full">
                <Navbar />
            </header>
            <div className="flex flex-col w-full bg-white max-md:max-w-full">
                <div className="mt-1.5 w-full max-md:max-w-full">
                    <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                        <Sidebar userInfo={userInfo} onLogout={handleLogout} />
                        <Main userId={userId} />
                    </div>
                </div>
            </div>
        </main>
    );
}

export default MyComponent;
