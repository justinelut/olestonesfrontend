import { Link } from 'react-router-dom';
import { fetcher } from '../api/api_utils';
import useSWR from 'swr';
import { useAnimate, useInView, usePresence, stagger } from 'framer-motion';
import { useEffect } from 'react';

export const Gallery = () => {
  const { data } = useSWR(`/api/gallery?limit=8`, fetcher, {
    revalidateOnMount: true,
  });
    const [isPresent, safeToRemove] = usePresence();
    const [scope, animate] = useAnimate();
    const isInView = useInView(scope);

    useEffect(() => {
      if (isInView && isPresent) {
        const enterAnimation = async () => {
          await animate(
            'img',
            { opacity: [0, 1] },
            { duration: 0.5, delay: stagger(0.4) }
          );
        };
        enterAnimation();
      }
    });
  return (
    <div ref={scope} className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20'>
      <div className='flex bg-fill-secondary flex-col mb-6 lg:justify-between lg:flex-row md:mb-8'>
        <h2 className='max-w-lg mb-5 font-sans text-3xl font-bold tracking-tight text-gray-700 sm:text-4xl sm:leading-none md:mb-6 group'>
          <span className='inline-block mb-1 sm:mb-4'>
            <h2 class='mb-5 text-6xl md:text-8xl text-gray-800 xl:text-8  text-center font-bold font-heading font-heading tracking-px-n leading-none'>
              Photos
            </h2>
          </span>
          <div className='h-1 ml-auto duration-300 origin-left transform bg-deep-purple-accent-400 scale-x-30 group-hover:scale-x-100' />
        </h2>
        <p className='text-gray-800 text-lg lg:text-sm lg:max-w-md'>
          We're constantly updating our gallery with new and exciting images
          showcasing our work, so be sure to check back often to discover what's
          new. Thank you for visiting our website gallery, and we hope you enjoy
          our experience with us.
        </p>
      </div>
      <div className='grid gap-6 row-gap-5 mb-8 lg:grid-cols-4 sm:row-gap-6 sm:grid-cols-2'>
        {data &&
          data.docs.map((image, index) => (
            <a
              key={index}
              href='/'
              aria-label='View Item'>
              <div className='relative overflow-hidden transition duration-200 transform rounded shadow-lg hover:-translate-y-2 hover:shadow-2xl'>
                <img
                  className='object-cover w-full h-56 md:h-64 xl:h-80'
                  src={image.image.url}
                  alt=''
                />
                <div className='absolute inset-0 px-6 py-4 transition-opacity duration-200 bg-black bg-opacity-75 opacity-0 hover:opacity-100'>
                  <p className='mb-4 text-lg font-bold text-gray-100'>
                    {/* Mona Lisa */}
                  </p>
                  <p className='text-sm tracking-wide text-gray-300'>
                    {/* Painted between 1503 and 1517, Da Vinci’s alluring portrait
                    has been dogged by two questions since the day it was made:
                    Who’s the subject and why is she smiling? */}
                  </p>
                </div>
              </div>
            </a>
          ))}
      </div>
      <div className='text-center mt-10'>
        <Link
          to='/gallery'
          aria-label=''
          className='inline-flex items-center font-semibold p-4 transition-colors duration-200 text-yellow bg-gray-800  hover:fill-slate-700'>
          View all {data && data.totalDocs} Photos
          <svg
            className='inline-block w-3 ml-2'
            fill='currentColor'
            viewBox='0 0 12 12'>
            <path d='M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z' />
          </svg>
        </Link>
      </div>
    </div>
  );
};
