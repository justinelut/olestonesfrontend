import React, { useEffect } from 'react';
import { fetcher } from '../api/api_utils';
import useSWR from 'swr';
import { Link } from 'react-router-dom';
import {
  useAnimate,
  useInView,
  usePresence,
  stagger,
} from 'framer-motion';

function Projects() {
  const { data } = useSWR(`/api/projects`, fetcher);
    const [isPresent, safeToRemove] = usePresence();
    const [scope, animate] = useAnimate();
    const isInView = useInView(scope);

    useEffect(() => {
      if (isInView && isPresent) {
        const enterAnimation = async () => {
          await animate(
            'img',
            { opacity: [0, 1] },
            { duration: 0.5, delay: stagger(0.6) }
          );
        };
        enterAnimation();
      }
    });

  return (
    <section
      ref={scope}
      class='py-24 bg-gray-700  overflow-hidden'>
      <div class='container px-4 mx-auto'>
        <div class='max-w-3xl mx-auto text-center'>
          <h2 class='mb-5 text-4xl md:text-6xl sm:text-4xl xs:text-4xl text-yellowbg xl:text-8xl text-center font-bold font-heading font-heading tracking-px-n leading-none'>
            Our Projects
          </h2>
          <p class='mb-16 text-lg sm:text-4xl xs:text-4xl text-white text-center font-medium leading-normal md:max-w-lg mx-auto'>
            Explore our projects that we have done over the years
          </p>
        </div>
        <div class='md:max-w-6xl mx-auto'>
          <div class='flex flex-wrap -m-3.5 mb-10'>
            {data &&
              data.docs.slice(0, 5).map((project) => (
                <div class='w-full md:w-1/3 p-3.5'>
                  <Link
                    to='/'
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
                  </Link>
                </div>
              ))}
          </div>
          <Link
            class='flex justify-center items-center text-center font-semibold text-yellow hover:text-indigo-700 leading-normal'
            to='/projects'>
            <span class='mr-2.5'>
              See all {data && data.totalDocs} projects
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
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Projects;
