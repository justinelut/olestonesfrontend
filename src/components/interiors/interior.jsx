import React from 'react';
import './interior.css';
import { fetcher } from '../api/api_utils';
import useSWR from 'swr'
const Interior = () => {
  const { data } = useSWR(`/api/whyus`, fetcher);
  return (
    <>
      <div className='flex items-center flex-col gap-[5rem]  mt-[4rem] md:mt-[2rem] mb-10  mx-2 rounded-md bg-gray-900'>
        <p className='text-4xl font-medium tracking-wide text-white pt-5'>Why Us?</p>
        <div className='flex flex-col md:flex-row w-full  max-md:gap-8 justify-evenly'>
          {data &&
            data.docs.map((whyus) => (
              <div
                className={`flex flex-col items-center gap-2 py-3 leading-3 p-10 m-2  mb-[5rem] rounded-md animate-pulse bg-white transition focus:outline-none focus:ring`}>
                <img
                  src={whyus.image.url}
                  alt=''
                  className='w-20'
                />
                <p className='text-center font-semibold text-xl'>
                  {whyus.title}
                </p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Interior;
