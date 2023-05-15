import React, { useEffect, useState } from 'react';
import { fetcher } from '../api/api_utils';
import { Link, useLocation } from 'react-router-dom';
import useSWR from 'swr';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useAnimate, useInView, usePresence, stagger } from 'framer-motion';

import './studio.css';

const Studio = () => {
  const [images, setImages] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [nextPage, setNextPage] = useState();
  const [isPresent, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);

 

  useEffect(() => {
    async function fetchImages() {
      const data = await fetcher(`/api/gallery?page=1&limit=9`);
      if (data) {
        setImages([...data.docs]);
        setHasNextPage(data.hasNextPage);
        setNextPage(data.nextPage);
      }
    }

    fetchImages();
  }, []);

  const fetchMoreData = async () => {
    const data = await fetcher(`/api/gallery?page=${nextPage}&limit=9`);
    if (data) {
      setImages((images) => [...images, ...data.docs]);
      setHasNextPage(data.hasNextPage);
      setNextPage(data.nextPage);
    }
  };


  //  useEffect(() => {
  //    if (isInView && isPresent) {
  //      const enterAnimation = async () => {
  //        await animate(
  //          '#galler',
  //          { opacity: [0, 1] },
  //          { duration: 0.5, delay: stagger(0.3) }
  //        );
  //      };
  //      enterAnimation();
  //    }
  //  });



  return (
    <section ref={scope} class='py-8 bg-yellowbg overflow-hidden'>
      <div class='container px-4 mx-auto'>
        <h2 class='mb-5 text-2xl md:text-4xl text-black xl:text-6xl text-center font-bold font-heading tracking-px-n leading-none'>
          Gallery
        </h2>
        <p class='mb-10 text-lg text-white text-center font-medium leading-normal md:max-w-lg mx-auto'>
          Welcome to our gallery where we showcase our skills, experience and everything else related to our projects. 
        </p>
        <div class='md:max-w-6xl mx-auto'>
          <div class='flex flex-wrap -m-3.5 mb-10'>
            {images &&
              images.map((image, index) => (
                <div
                  id='galler'
                  class='w-full md:w-1/3 p-3.5'>
                  <img
                    key={index}
                    src={image.image.sizes.feature.url}
                    alt=''
                    className='w-full'
                  />
                </div>
              ))}
          </div>
          {images && hasNextPage ? (
            <button
              onClick={fetchMoreData}
              style={{ width: '200px', height: '60px',margin: 'auto' }}
              className='animate-pulse tracking-wide text-center rounded-md border-2 border-white px-8 mx-2 py-2 text-lg font-medium text-gray-50 transition hover:bg-gray-800 hover:text-white focus:outline-none focus:ring'>
              Load More
            </button>
          ) : (
            ''
          )}
        </div>
      </div>
    </section>
  );
};

export default Studio;
