import React, { useState } from 'react';
import axios from 'axios';

const HeartButton = ({ restaurantId, userId, initialLiked }) => {
  const [isLiked, setIsLiked] = useState(initialLiked);

  const handleClick = async (e) => {
    e.stopPropagation();
    try {
      if (isLiked) {
        // Delete favorite
        await axios.delete('http://localhost:8080/favorite', {
          data: { user_id: userId, restaurant_id: restaurantId }
        });
      } else {
        // Add favorite
        await axios.post('http://localhost:8080/favorite/add', {
          user_id: userId,
          restaurant_id: restaurantId
        });
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Error updating favorite status:', error);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="relative flex items-center justify-center p-2 focus:outline-none"
      style={{ width: '40px', height: '40px' }} // Adjust size as needed
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        className="absolute top-0 left-0 w-full h-full"
        style={{ fill: isLiked ? 'red' : 'none', stroke: 'black' }}
      >
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          strokeWidth="2"
          className={`transition-all duration-300 ${
            !isLiked ? 'hover:fill-red-500 hover:stroke-red-500' : ''
          }`}
        />
      </svg>
      {isLiked ? null : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className="absolute top-0 left-0 w-full h-full"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      )}
    </button>
  );
};

export default HeartButton;
