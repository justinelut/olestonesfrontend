import React from 'react';
import aboutusimage from './aboutus.png';
import { fetcher } from '../api/api_utils';
import useSWR from 'swr';
import { Link } from 'react-router-dom';

function Aboutus() {
  const { data } = useSWR(`/api/services`, fetcher);
  return (
    <section class='relative bg-fill py-10 overflow-hidden'>
      <div class='container px-4 mx-auto'>
        <div class='max-w-3xl mx-auto text-center'>
          {/* <span class='inline-block py-1 px-3 mb-4 text-xs font-semibold  rounded-full'>
            About us
          </span> */}
          <h1 class='font-heading text-2xl xs:text-6xl md:text-6xl font-bold text-gray-900 mb-10'>
            <span className='text-white'>What We do at </span>
            <span class='font-serif text-black'>Ole Stones</span>
          </h1>
        </div>
        <div class='max-w-7xl mx-auto'>
          <div class='flex flex-wrap -mx-4 items-center'>
            <div class='w-full lg:w-2/5 xl:w-auto px-4 lg:pb-10 mb-16 lg:mb-0'>
              <div class='mx-auto max-w-sm'>
                {data &&
                  data.docs.slice(0, 3).map((service, index) => (
                    <div
                      key={index}
                      class='flex items-center pb-12 mb-12 border-b-2 border-white'>
                      <div class='flex flex-shrink-0 w-15 h-15 mr-6 items-center justify-center bg-orange-100 rounded-full'>
                        <img
                          src='saturn-assets/images/features/icon-hierarchy.svg'
                          alt=''
                        />
                      </div>
                      <div>
                        <h2 class='text-xl text-black font-semibold'>
                          {service.title}
                        </h2>
                        <span class='text-base font-medium text-black'>
                          {service.description.slice(0, 100) + ' ... '}
                          <Link
                            className='text-white font-bold'
                            to={`/services/${service.slug}`}>
                            Learn More
                          </Link>
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <img
              className='block max-w-full max-h-full md:w-60 md:h-200 lg:h-auto xl:h-150 px-auto mx-auto'
              src={aboutusimage}
              alt=''
            />
            <div class='w-full lg:w-2/5 xl:w-auto px-4 lg:pb-10'>
              <div class='mx-auto max-w-sm'>
                {data &&
                  data.docs.slice(3, 6).map((service, index) => (
                    <div key={index} class='flex items-center pb-12 mb-12 border-b-2 border-white'>
                      <div class='flex flex-shrink-0 w-15 h-15 mr-6 items-center justify-center bg-yellowbg rounded-full'>
                        <img
                          src='saturn-assets/images/features/icon-cam.svg'
                          alt=''
                        />
                      </div>
                      <div>
                        <h2 class='text-xl text-black font-semibold'>
                          {service.title}
                        </h2>
                        <span class='text-base font-medium text-black'>
                          {service.description.slice(0, 100) + ' ... '}
                          <Link
                            className='text-white font-semibold'
                            to={`/services/${service.slug}`}>
                            Learn More
                          </Link>
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Aboutus;
