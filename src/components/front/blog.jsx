import React, { useEffect } from 'react';
import { fetcher } from '../api/api_utils';
import useSWR from 'swr';
import { Link } from 'react-router-dom';
import FormatDay from '../utils/dateformater';
import { useAnimate, useInView, usePresence, stagger } from 'framer-motion';

function Blogs() {
  const { data } = useSWR(`/api/posts?limit=3`, fetcher);
    const [isPresent, safeToRemove] = usePresence();
    const [scope, animate] = useAnimate();
    const isInView = useInView(scope);

    useEffect(() => {
      if (isInView && isPresent) {
        const enterAnimation = async () => {
          await animate(
            '#project',
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
      class='relative py-24 bg-fill overflow-hidden'>
      <div class='container px-4 mx-auto'>
        <h2 class='mb-5 text-8xl md:text-8xl text-gray-700 xl:text-8xl text-center font-bold font-heading font-heading tracking-px-n leading-none'>
          Our Blogs
        </h2>
        <p class='mb-16 text-lg text-white text-center font-medium leading-normal md:max-w-lg mx-auto'>
          Read and learn from our articles
        </p>
        <div class='md:max-w-6xl mx-auto'>
          <div className='grid gap-5 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full'>
            {data &&
              data.docs.map((post) => (
                <Link to={'/blog/' + post.slug}>
                  <div
                    id='project'
                    className='overflow-hidden bg-gray-700 transition-shadow duration-30 rounded'>
                    <a
                      href='/'
                      aria-label='Article'>
                      <img
                        src={post.image.sizes.card.url}
                        className='object-cover w-full h-64 rounded'
                        alt=''
                      />
                    </a>
                    <div className='py-5 px-5'>
                      <p className='mb-2 text-xs font-semibold text-white uppercase'>
                        {FormatDay(post.updatedAt)}
                      </p>
                      <a
                        href='/'
                        aria-label='Article'
                        className='inline-block mb-3 text-white transition-colors duration-200 hover:text-deep-purple-accent-700'>
                        <p className='text-2xl font-bold leading-5'>
                          {post.title}
                        </p>
                      </a>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
          <Link
            class='flex mt-10 justify-center items-center text-center font-semibold text-white hover:text-gray-800'
            to='/blog'>
            <span class='mr-2.5'>
              Read all {data && data.totalDocs} Blogs posts
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

export default Blogs
