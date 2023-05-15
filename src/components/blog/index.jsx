import React from 'react'
import { fetcher } from "../api/api_utils";
import useSWR from 'swr'
import FormatDay from "../utils/dateformater";
import { Link } from "react-router-dom";
export default function Blog(){
  const {data} = useSWR(`/api/posts`, fetcher)
  
    return (
      <div className='px-4 py-16 bg-fill lg:py-20'>
        <h3 className='text-center text-6xl mt-5 mb-10 font-semibold text-black'>
          Blogs
        </h3>
        <div className='grid px-2 md:px-10 lg:px-10 gap-5 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full'>
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
                  <div className='py-5 px-5 bg-black'>
                    <p className='mb-2 text-xs  text-yellowbg uppercase'>
                      {FormatDay(post.updatedAt)}
                    </p>
                    <a
                      href='/'
                      aria-label='Article'
                      className='max-w-sm inline-block mb-3 text-white transition-colors duration-200 hover:text-deep-purple-accent-700'>
                      <p className='text-2xl text-white font-semibold'>
                        {post.title}
                      </p>
                    </a>
                    <p className='mb-4 text-white'>{post.summary}</p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    );
};