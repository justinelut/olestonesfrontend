import React from 'react';
import { fetcher } from '../api/api_utils';
import useSWR from 'swr';
import { BiChevronsRight } from 'react-icons/bi'
const Another = () => {
  const { data } = useSWR(`/api/globals/yourgoals`, fetcher);

  return (
    <div className='relative'>
      <div
        className={`box-border flex flex-col justify-center lg:text-center top-0 bottom-0 lg:bottom-auto lg:top-[5rem] pl-[1rem] sm:pl-[5rem] lg:pl-[10rem] pr-6  sm:pr-[2rem] lg:pr-[9rem] pt-[2rem] pb-[4rem] left-0 bg-yellowbg`}>
        <p className='font-medium text-3xl leading-9 text-white'>
          Transform your space in 3 steps:
        </p>

        {data &&
          data.goal.map((goal) => (
            <>
              <h2 className='font-semibold md:text-4xl text-2xl mt-[2rem]'>
                <span className='hidden max-lg:inline-block text-white'><BiChevronsRight style={{size: '20'}}/></span>{' '}
                {goal.title}
              </h2>
              <p className=' mt-[7px] text-lg text-white'>{goal.description}</p>
            </>
          ))}
      </div>
      {/* <div className='flex justify-end w-full'>
        <img
          src={image}
          className=' h-[50.25rem] lg:h-[57.75rem]'
          alt=' a living room'
        />
      </div> */}
    </div>
  );
};

export default Another;
