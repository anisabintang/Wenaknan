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

function MyComponent() {
  const [userInfo, setUserInfo] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = decode(token);
      console.log('Decoded JWT token:', decodedToken); // Log the contents of the token
      console.log('payload:', decodedToken.payload); // Log the payload (data)

      setUserInfo({
        name: decodedToken.payload.name,
        email: decodedToken.payload.email,
        profileImage: decodedToken.payload.profileImage // Assuming the token has a profileImage field
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

  const handleEditProfile = () => {
    router.push('/profile/edit');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar userInfo={userInfo} onLogout={handleLogout} />
        <div className="flex flex-col flex-1 items-center">
          <MainSection userInfo={userInfo} />
          <button
            onClick={handleEditProfile}
            className="box-border relative shrink-0 self-center py-4 pr-6 pl-6 mt-5 w-auto text-center bg-red-700 rounded appearance-none cursor-pointer text-white"
            tabIndex="0"
          >
            Edit Profile
          </button>
          {/* Display email and username */}
          <div className="mt-5 w-full max-w-lg flex flex-col">
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Username:</span>
              <span>{userInfo.name || "N/A"}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Email:</span>
              <span>{userInfo.email || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyComponent;