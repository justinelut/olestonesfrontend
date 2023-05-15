import React, { useEffect } from 'react';
import aboutusimage from './aboutus.png';
import { fetcher } from '../api/api_utils';
import useSWR from 'swr';
import { useAnimate, useInView, usePresence, stagger } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Aboutus() {
  const { data } = useSWR(`/api/services`, fetcher);
  const [isPresent, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);

  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const textContent = `We're a Team of fully-certified Professional Builders & Movers, Who
            Tackle everything from complex large projects to smaller-scale jobs.
            Fueled by our commitment to excellence, we go the extra mile to make
            sure clients are completely satisfied with our work. We are
            committed to providing our Customers with exceptional services while
            offering our employees the best training and an excellent working
            environment in which they can excel. 'Ole Stones Builders &
            Logistics' commits itself to quality and excellence in terms of its
            workmanship and performance.`;

  useEffect(() => {
    if (isInView && isPresent) {
      const enterAnimation = async () => {
        await animate(
          'span',
          { opacity: [0, 1], x: [-100, 0] },
          { duration: 0.5, delay: stagger(0.3) }
        );
      };
      enterAnimation();
    }
  });

  return (
    <>
      <div className='bg-black py-8'>
        <div class='max-w-2xl mx-auto mb-8 text-center'>
          <h1 class='font-heading text-2xl xs:text-6xl md:text-6xl font-semibold text-yellowbg mb-4'>
            Who We <span className='text-white'>Are?</span>
          </h1>
          <div className='p-5'>
            {isExpanded ? (
              <div>
                <p className='text-white'>{textContent}</p>
                <button
                  className='text-yellowbg hover:text-white m-2 p-2 border border-yellowbg rounded'
                  onClick={handleToggleText}>
                  Read Less
                </button>
              </div>
              
            ) : (
              <div>
                <p className='line-clamp-3 text-white'>{textContent}</p>
                <button
                  className='text-white hover:text-yellowbg m-2 p-2 border border-yellowbg rounded'
                  onClick={handleToggleText}>
                  Read More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <section
        ref={scope}
        class='relative bg-fill py-20 overflow-hidden'>
        <div class='container px-4 mx-auto'>
          <div class='max-w-3xl mx-auto text-center'>
            <h1 class='font-heading text-4xl xs:text-4xl md:text-6xl sm:text-2xl font-bold text-gray-800 mb-24'>
              <span>What We do at </span>
              <span class='font-serif italic text-white'>Ole Stones</span>
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
                          <h3 class='text-3xl font-bold text-gray-900'>
                            {service.title}
                          </h3>
                          <span class='text-base font-medium text-gray-900'>
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
                class='block max-w-full max-h-full md:w-60 md:h-200 lg:h-auto xl:h-150 px-auto mx-auto'
                src={aboutusimage}
                alt=''
              />
              <div class='w-full lg:w-2/5 xl:w-auto px-4 lg:pb-10'>
                <div class='mx-auto max-w-sm'>
                  {data &&
                    data.docs.slice(3, 6).map((service, index) => (
                      <div
                        key={index}
                        class='flex items-center pb-12 mb-12 border-b-2 border-white'>
                        <div class='flex flex-shrink-0 w-15 h-15 mr-6 items-center justify-center bg-yellow-200 rounded-full'>
                          <img
                            src='saturn-assets/images/features/icon-cam.svg'
                            alt=''
                          />
                        </div>
                        <div>
                          <h3 class='text-3xl font-bold text-gray-900'>
                            {service.title}
                          </h3>
                          <span class='text-base font-medium text-gray-900'>
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Aboutus;
