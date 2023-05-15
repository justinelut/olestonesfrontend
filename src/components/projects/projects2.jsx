import React from 'react';
import './projects.css';
import useSWR from 'swr';
import { fetcher } from '../api/api_utils';
import { Link } from 'react-router-dom';

const Projects = () => {
  const { data } = useSWR('/api/globals/projects', fetcher);

  const Img1 = data && data.image[0].image.url;
  const Img2 = data && data.image[1].image.url;
  const Img3 = data && data.image[2].image.url;
  const Img4 = data && data.image[3].image.url;

  return (
    <div className='flex mx-5 lg:px-20 md:px-20 relative mb-10 max-lg:justify-center max-lg:flex-col max-lg:items-center mt-[5rem] lg:mt-[5rem]'>
      <div className=' grid grid-cols-2 gap-4 sm:grid-cols-1 mb-10 lg:grid-cols-4'>
        <img
          src={Img1}
          alt=''
          className='h-full w-full sm:row-start-1 sm:row-end-3'
        />
        <img
          src={Img3}
          alt=''
          className='h-full w-full'
        />
        <img
          src={Img2}
          alt=''
          className='h-full w-full sm:row-start-2 sm:row-end-4'
        />
        <img
          src={Img4}
          alt=''
          className='h-full w-full'
        />
      </div>
      <div className='py-10 mb-10 w-[72%] lg:w-[60%] xl:w-[50%] lg:px-[4.25rem] lg:pb-[3.625rem]  bottom-[1.75rem] lg:min-h-[32.4375rem] flex flex-col items-center justify-center  top-[2.25rem] lg:absolute right-[6.6rem] lg:bg-white z-20   lg:bg-opacity-75    lg:text-center'>
        <p
          id='projectsSection'
          className='font-medium text-3xl leading-9 mt-5  mb-[2.8125rem]'>
          {data && data.title}
        </p>

        <p className='text-[18px] mb-[1.875rem]'>{data && data.description}</p>

        <Link
          to='/projects'
          className='self-center tracking-wide text-center rounded-md border-2 border-yellowbg px-10  py-2 text-base font-medium text-charcoal transition hover:bg-charcoal hover:text-white focus:outline-none focus:ring'>
          View All
        </Link>
      </div>
    </div>
  );
};

export default Projects;
