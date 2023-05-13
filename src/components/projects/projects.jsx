import React from 'react';
import { fetcher } from '../api/api_utils';
import useSWR from 'swr';
import { Link } from 'react-router-dom';

function Projectssection() {
  const { data } = useSWR(`/api/projects`, fetcher);
  return (
    <section class='py-14 overflow-hidden bg-slate-800'>
      <div class='container mx-auto'>
        <h2 class='mb-5 text-xl md:text-2xl text-white xl:text-4xl text-center font-semibold font-heading font-heading tracking-px-n leading-none'>
          Our Projects
        </h2>
        <p class='mb-16 text-lg text-white text-center font-medium leading-normal md:max-w-lg mx-auto'>
          Explore our projects that we have done over the years
        </p>
        <div class='md:max-w-6xl mx-auto'>
          <div class='flex flex-wrap -m-3.5 mb-10'>
            {data &&
              data.docs.map((project) => (
                <div class='w-full md:w-1/3 p-3.5'>
                  <a
                    href='/'
                    aria-label='View Item'>
                    <div className='relative overflow-hidden transition duration-200 transform rounded shadow-lg hover:-translate-y-2 hover:shadow-2xl'>
                      <img
                        className='object-cover w-full h-56 md:h-64 xl:h-80'
                        src={project.image[0].image.url}
                        alt=''
                      />
                      <div className='absolute inset-0 px-6 py-4 transition-opacity duration-200 bg-black bg-opacity-75 opacity-0 hover:opacity-100'>
                        {/* <p className='mb-4 text-lg font-bold text-gray-100'>
                          {project.title}
                        </p> */}
                        <p className='text-sm tracking-wide text-gray-300'>
                          {project.description}
                        </p>
                      </div>
                      <div className='absolute inset-x-0 bottom-0 px-6 py-4 bg-black bg-opacity-75'>
                        <p className='text-sm font-medium tracking-wide text-white'>
                          {project.title}
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
          </div>
          {/* <Link
            class='flex justify-center items-center text-center font-semibold text-indigo-600 hover:text-indigo-700 leading-normal'
            to='/projects'>
            <span class='mr-2.5'>
              See all {data && data.docs.length} projects
            </span>
            <svg
              width='17'
              height='16'
              viewbox='0 0 17 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M9.83333 3.33337L14.5 8.00004M14.5 8.00004L9.83333 12.6667M14.5 8.00004L2.5 8.00004'
                stroke='currentColor'
                stroke-width='1.5'
                stroke-linecap='round'
                stroke-linejoin='round'></path>
            </svg>
          </Link> */}
        </div>
      </div>
    </section>
  );
}

export default Projectssection;
