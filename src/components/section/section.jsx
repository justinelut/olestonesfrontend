import React from 'react';
import { Link } from 'react-router-dom';

const Section = ({ data }) => {
  return (
    <>
      <div className='relative bg-gradient-to-r from-[#1c1c1c] to-[#333333]'>
        <img
          src={data && data.image.url}
          className='lg:w-[100%] h-full opacity-20'
          alt=''
        />
        <div
          className='absolute inset-0 flex flex-col justify-center items-center text-center'
          style={{ top: '15%' }}>
          <p className='font-semibold text-xl sm:text-3xl md:text-4xl text-white mx-auto'>
            {data && data.title1}
          </p>
          <p className='text-base sm:text-lg md:text-xl font-normal text-white mb-4'>
            {data && data.title2}
          </p>
          <Link
            to='/gallery'
            className='text-black rounded-sm tracking-wide text-base sm:text-lg font-bold self-center px-4 sm:px-8 py-2 sm:py-3 border transition focus:outline-none focus:ring whitespace-nowrap bg-yellowbg'>
            View Our Work
          </Link>
        </div>
      </div>
    </>
  );
};

export default Section;
