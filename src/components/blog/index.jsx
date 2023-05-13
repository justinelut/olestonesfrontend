import React from 'react'
import { fetcher } from "../api/api_utils";
import useSWR from 'swr'
import FormatDay from "../utils/dateformater";
import { Link } from "react-router-dom";
export default function Blog(){
  const {data} = useSWR(`/api/posts`, fetcher)
  
    return (
      <div className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20'>
          <h3 className='text-center mt-5 mb-10 text-4xl text-semibold text-gray-900'>Welcome to Our Blog Page</h3>
        <div className='grid gap-5 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full'>
          {data &&
            data.docs.map((post) => (
              <Link to={post.slug}>
                <div className='overflow-hidden transition-shadow duration-300 bg-white rounded'>
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
                    <p className='mb-2 text-xs font-semibold text-gray-600 uppercase'>
                      {FormatDay(post.updatedAt)}
                    </p>
                    <a
                      href='/'
                      aria-label='Article'
                      className='inline-block mb-3 text-black transition-colors duration-200 hover:text-deep-purple-accent-700'>
                      <p className='text-2xl font-bold leading-5'>
                        {post.title}
                      </p>
                    </a>
                    <p className='mb-4 text-gray-700'>{post.summary}</p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    );
};