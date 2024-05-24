import * as React from "react";
import { useRouter } from "next/router";

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
                            <a href="/profile" className="flex items-center gap-4 p-3 text-slate-700 rounded w-full">
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

export default Sidebar;