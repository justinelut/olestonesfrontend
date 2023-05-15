import React from 'react';
import { fetcher } from '../api/api_utils';
import useSWR from 'swr';
import { Link } from 'react-router-dom';

function Projectssection() {
  const { data } = useSWR(`/api/projects`, fetcher);
  return (
    <section class='py-14 overflow-hidden bg-black'>
      <div class='container mx-auto'>
        <h2 class='mb-5 text-xl md:text-2xl text-white xl:text-4xl text-center font-semibold font-heading font-heading tracking-px-n leading-none'>
          Our <span className='text-yellowbg'>Projects</span>
        </h2>
        <p class='mb-16 text-lg text-white text-center font-medium leading-normal md:max-w-lg mx-auto'>
          Explore our projects that we have done over the years
        </p>
        <div class='md:max-w-6xl mx-auto'>
          <div class='flex flex-wrap -m-3.5 mb-10'>
            {data &&
              data.docs.map((project) => (
                <div class='w-full md:w-1/3 p-3.5'>
                  {project && console.log(project)}
                  <Link
                    to={`/projects/${project.slug}`}
                    aria-label='View Item'>
                    <div className='relative overflow-hidden transition duration-200 transform rounded shadow-lg hover:-translate-y-2 hover:shadow-2xl'>
                      <img
                        className='object-cover w-full h-56 md:h-64 xl:h-80'
                        src={project.descriptor[0].image.url}
                        alt=''
                      />
                      
                      <div className='absolute inset-x-0 bottom-0 px-6 py-4 bg-black bg-opacity-75'>
                        <p className='text-sm font-medium tracking-wide text-white'>
                          {project.title}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
         
        </div>
      </div>
    </section>
  );
}

export default Projectssection;
