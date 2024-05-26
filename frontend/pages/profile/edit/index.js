import * as React from "react";
import { useState, useEffect } from "react";
import { decode } from 'jwt-js-decode';
import { useRouter } from 'next/router';
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

function MainSection({ userInfo }) {
    return (
        <main className="flex flex-col items-center w-full py-8">
            <div className="flex flex-col md:flex-row gap-5 w-full max-w-screen-lg px-5">
                <div className="flex flex-col w-full md:w-[28%] max-md:ml-0">
                    <img
                        loading="lazy"
                        alt="Profile"
                        src={userInfo.profileImage || "https://cdn.builder.io/api/v1/image/assets/TEMP/40f8d2232269fb1d70cc1884649dc95792ad238adfbf6dc3979f3ecaea100c10?apiKey=7a756a63a9f44e489954adfab0cbb893&"}
                        className="object-cover overflow-hidden grow justify-center items-end px-16 pt-20 mr-auto aspect-[1.04] object-[top_left] w-[167px] max-md:mt-2 max-sm:mx-auto max-sm:w-full max-sm:max-w-[196px]"
                    />
                </div>
                <div className="flex flex-col ml-0 md:ml-5 w-full md:w-[72%]">
                    <h1 className="justify-center self-stretch px-5 my-auto text-5xl leading-4 text-slate-700 max-md:mt-10 max-md:max-w-full max-md:text-4xl">
                        {userInfo.name || "User Name"}
                    </h1>
                </div>
            </div>
        </main>
    );
}

function FormSection({ userInfo, setUserInfo }) {
    // Define state for input fields
    const [name, setName] = useState(userInfo.name || '');
    const [userName, setUserName] = useState(userInfo.userName || '');
    const [email, setEmail] = useState(userInfo.email || '');
    const router = useRouter();

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/user/${userInfo.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, user_name: userName, user_email: email }),
            });
            if (response.ok) {
                const updatedUserInfo = await response.json();
                setUserInfo(updatedUserInfo.user);
                router.push('/profile');
            } else {
                console.error('Failed to update user information:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating user information:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col self-center pt-2.5 pb-20 mt-8 w-full max-w-lg bg-white bg-opacity-80 rounded-[40px]">
            <div className="flex flex-col px-11 mx-auto mt-5 mb-2.5 w-full text-base text-black grow-0 min-h-[200px] max-md:px-5 max-md:max-w-full">
                <label htmlFor="newName" className="mr-auto max-md:max-w-full">
                    Name
                </label>
                <input
                    id="newName"
                    aria-label="Type your new name"
                    placeholder="Type your new name"
                    className="justify-center items-start px-6 py-6 mt-6 text-sm font-light bg-white rounded-lg border border-blue-500 border-solid text-zinc-500 max-md:px-5 max-md:max-w-full"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="newUserName" className="mt-5 max-md:max-w-full">
                    User Name
                </label>
                <input
                    id="newUserName"
                    aria-label="Type your new user name"
                    placeholder="Type your new user name"
                    className="justify-center items-start px-6 py-6 mt-6 text-sm font-light bg-white rounded-lg border border-blue-500 border-solid text-zinc-500 max-md:px-5 max-md:max-w-full"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <label htmlFor="newEmail" className="mt-5 max-md:max-w-full">
                    Email
                </label>
                <input
                    id="newEmail"
                    aria-label="Type your new email"
                    placeholder="Type your new email"
                    className="justify-center items-start px-6 py-6 mt-6 text-sm font-light bg-white rounded-lg border border-blue-500 border-solid text-zinc-500 max-md:px-5 max-md:max-w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <button
                type="submit"
                className="box-border relative shrink-0 self-center py-4 pr-6 pl-6 mt-5 w-auto text-center bg-red-700 rounded appearance-none cursor-pointer text-white"
                tabIndex="0"
            >
                Submit
            </button>
        </form>
    );
}

function MyComponent() {
    const [userInfo, setUserInfo] = useState({});
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = decode(token);
            console.log('Decoded JWT token:', decodedToken); // Log the contents of the token
            console.log('payload:', decodedToken.payload); // Log the payload (data

            setUserInfo({
                id: decodedToken.payload.user_id,
                name: decodedToken.payload.name,
                username: decodedToken.payload.username,
                email: decodedToken.payload.email,
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
        router.push('/login');
    };

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Navbar />
            <div className="flex flex-1">
                <Sidebar userInfo={userInfo} onLogout={handleLogout} />
                <div className="flex flex-col flex-1 items-center">
                    <MainSection userInfo={userInfo} />
                    <FormSection userInfo={userInfo} setUserInfo={setUserInfo} />
                </div>
            </div>
        </div>
    );
}

export default MyComponent;
