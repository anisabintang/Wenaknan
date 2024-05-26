import * as React from "react";
import Link from "next/link";
import HeartButton from "@/components/heartBtn";

function RestaurantCard({ restaurant, userId }) {
    const { restaurant_id, restaurant_name, restaurant_description, restaurant_rating, image, category, is_liked } = restaurant;

    const handleHeartClick = (e) => {
        e.stopPropagation();
    };

    const handleRatingClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="flex flex-col p-2.5 bg-white max-md:max-w-full border-b-2 pb-5">
            <Link href={`/restaurants/${restaurant_id}`}>
                <div className="block">
                    <h2 className="text-4xl font-extrabold max-md:max-w-full">{restaurant_name}</h2>
                    <img
                        loading="lazy"
                        src={image}
                        className="mt-5 w-full aspect-[2.22] max-md:max-w-full object-cover rounded-xl shadow-lg"
                        alt={restaurant_name}
                    />
                </div>
            </Link>
            <div
                className="flex gap-5 justify-between pr-8 mt-5 w-full h-10 text-2xl font-semibold whitespace-nowrap max-md:flex-wrap max-md:pr-5 max-md:max-w-full"
                onClick={handleRatingClick}
            >
                <HeartButton 
                    restaurantId={restaurant_id}
                    userId={userId}
                    initialLiked={is_liked}
                    onClick={handleHeartClick} 
                />
                <div className="flex gap-1">
                    <div>{restaurant_rating}</div>
                    <img
                        loading="lazy"
                        src="/assets/star.png"
                        className="flex h-4/5 aspect-square"
                        alt="star"
                    />
                </div>
            </div>
            <Link href={`/restaurants/${restaurant_id}`}>
                <div className="block">
                    <div className="space-y-3">
                        <p className="mt-5 text-lg font-medium max-md:max-w-full">
                            {restaurant_description}
                        </p>
                        <p>
                            Category: {category}
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default RestaurantCard;
