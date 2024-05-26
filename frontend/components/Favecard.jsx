import * as React from "react";
import Link from "next/link";

function FaveCard({ restaurant }) {
    const { restaurant_id, restaurant_name, restaurant_description, restaurant_rating, image, category, is_liked } = restaurant;

    const handleHeartClick = (e) => {
        e.stopPropagation();
    };

    const handleRatingClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="flex flex-col w-[220px] shadow-lg mt-7">
            <Link href={`/restaurants/${restaurant_id}`}>
                <div className="flex flex-col font-medium text-black uppercase justify-center max-md:mt-7">
                    <img
                    loading="lazy"
                    src={image}
                    className="self-center border border-gray-200 object-cover border-solid w-[220px] h-40 rounded-t-xl"
                    />
                    <div className="flex flex-col py-4 pr-3 pl-3 h-[150px] rounded-none justify-center border border-gray-200 border-solid bg-zinc-200 max-md:pr-5">
                        <div className="self-end text-lg text-center">{restaurant_name}</div>
                        <div className="self-center mt-6 text-xs">category: {category}</div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default FaveCard;
