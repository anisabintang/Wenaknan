import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { decode } from 'jwt-js-decode';
import Navbar from "@/components/navbar";
import RestaurantCard from "../../components/restcard";
import Sidebar from "../../components/sidebar";

// Shuffle function
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const STORAGE_URL = 'http://localhost:8080';

function Main({ restaurants, loading, handleScroll, userId }) {
    return (
        <main
            className="flex flex-col ml-5 w-[77%] max-md:ml-0 max-md:w-full"
            onScroll={handleScroll}
            style={{ overflowY: "scroll", maxHeight: "100vh" }}
        >
            <div className="flex flex-col grow items-center px-16 pt-12 text-black max-md:px-5 max-md:mt-1.5 max-md:max-w-full">
                <div className="flex flex-col max-w-full w-[641px]">
                    {restaurants.map((restaurant) => (
                        <RestaurantCard key={restaurant.restaurant_id} restaurant={restaurant} userId={userId} />
                    ))}
                </div>
                {loading && <p>Loading...</p>}
            </div>
        </main>
    );
}

function MyComponent() {
    const [userInfo, setUserInfo] = useState({});
    const [userId, setUserId] = useState(null);
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchRestaurants = async (userId) => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:8080/restaurant/status/', {
                params: {
                    user_id: userId
                }
            });
            let data = response.data;

            data = shuffle(data);

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
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = decode(token);
            console.log('Decoded JWT token:', decodedToken); // Log the contents of the token
            console.log('payload:', decodedToken.payload); // Log the payload (data
            console.log('user_id:', decodedToken.payload.user_id); // Log the user ID (user_id

            const userInfo = {
                name: decodedToken.payload.name,
                email: decodedToken.payload.email,
                user_id: decodedToken.payload.user_id
            };
            setUserInfo(userInfo);
            setUserId(userInfo.user_id);

            fetchRestaurants(userInfo.user_id);
        } else {
            console.error('No token found');
        }
    }, []);

    const handleScroll = (event) => {
        const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
        if (scrollHeight - scrollTop === clientHeight && !loading) {
            fetchRestaurants(userId);
        }
    };

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
                        <Main restaurants={restaurants} loading={loading} handleScroll={handleScroll} userId={userId} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyComponent;
