import React, { useState } from 'react';

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8aG91c2UlMjBpbnRlcmlvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
  ];

  const nextImage = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((currentIndex + images.length - 1) % images.length);
  };

  return (
    <div className='relative mt-12 mx-5 mb-12'>
      <button
        className='absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-500 bg-opacity-50 hover:bg-opacity-75 text-white text-4xl font-bold py-1 px-2 rounded-full focus:outline-none'
        onClick={prevImage}>
        &lArr;
      </button>
      <div className='flex justify-center max-w-md mx-auto'>
        
        <img
          className='w-full h-64 object-cover rounded-lg shadow-md'
          src={images[currentIndex]}
          alt='carousel'
        />
      </div>
      <button
        className='absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-500 bg-opacity-50 hover:bg-opacity-75 text-white text-4xl font-bold py-1 px-2 rounded-full focus:outline-none'
        onClick={nextImage}>
        &rArr;
      </button>
    </div>
  );
};

export default Slider;
