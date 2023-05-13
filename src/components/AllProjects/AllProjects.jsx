import React from 'react';
import useSWR from 'swr';
import { fetcher } from '../api/api_utils';

const Projects = () => {
  const { data } = useSWR('/api/globals/projects', fetcher);

  return (
    <>
      <div className='py-10 text-center mx-2 sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20'>
        <div className='max-w-xl mb-6 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12'>
          <h2 className='max-w-lg mb-6 text-3xl font-bold leading-none tracking-tight sm:text-4xl md:mx-auto'>
            Welcome to our complete projects page!
          </h2>
          {/* <p className='md:text-lg'>{data && data.description}</p> */}
        </div>
        <div className='grid gap-5 row-gap-5 mb-8 lg:grid-cols-4 sm:grid-cols-2'>
          {data &&
            data.image.map((proj) => (
              <div  
                aria-label='View Item'
                className='inline-block overflow-hidden duration-300 transform bg-white rounded shadow-sm hover:-translate-y-2'>
                <div className='flex flex-col h-full'>
                  <img
                    src={proj.image.url}
                    className='object-cover w-full h-48'
                    alt=''
                  />
                  <div className='flex-grow border border-t-0 rounded-b'>
                    <div className='p-5'>
                      <h6 className='mb-2 font-semibold leading-5'>
                        {proj.title}
                      </h6>
                      <p className='text-base'>{proj.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className='text-center'>
          <a
            href='/'
            className='text-white inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide bg-yellowbg transition duration-200 rounded md:w-auto  focus:outline-none'>
             Previous page
          </a>
        </div>
      </div>
    </>
  );
};

export default Projects;
