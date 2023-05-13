import Img1 from './image 12.png';
import Img2 from './image 13.png';
import Img3 from './image 15.png';
import Img4 from './image 14.png';
import Img5 from './image 21.png';
import Img6 from './image 20.png';

import React, { Component } from 'react';

import Slider from 'react-slick';
import { useState } from 'react';
import useSWR from 'swr'

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './blog.css';
import arrowNext from './arrowIcon.png';
import arrowPrev from './arrowIcon2.png';
import { fetcher } from '../api/api_utils';
import { Link } from 'react-router-dom';


export default function Blog() {
  const slide = React.useRef(null);
   const { data } = useSWR(`/api/posts`, fetcher);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 8000,
    swipe: true,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          autoplay: true,
          autoplaySpeed: 8000,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          autoplay: true,
          autoplaySpeed: 8000,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          autoplay: true,
          autoplaySpeed: 8000,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          autoplay: true,
          autoplaySpeed: 8000,
        },
      },
    ],
  };

  return (
    <div className='relative mb-2 my-6'>
      <div className=' flex flex-col justify-center items-center'>
        <h1 className='blogs font-medium text-3xl my-5  text-center mb-5'>
          Blogs
        </h1>

        <div className='!w-full !overflow-hidden rounded-md'>
          <div className='sliderParent w-[95%] sm:w-[110%]  relative'>
            <Slider
              ref={slide}
              {...settings}>
              {data &&
                data.docs.map((post) => (
                  <Link to={`/blog/${post.slug}`}>
                    <div>
                      <div className='mr-5'>
                        <img
                          src={post.image.sizes.card.url}
                          alt=''
                        />
                        <p className='font-medium text-2xl leading-9 max-sm:text-lg  text-black'>
                          {post.title}
                        </p>
                        <p className='text-justify  w-[90%] max-lg:text-sm'>
                          {post.summary}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
            </Slider>
          </div>
          <div className='text-center my-4'>
            <Link to='/blog'>
              <button
                style={{ width: '200px', height: '60px' }}
                className='animate-pulse tracking-wider text-center rounded-md border-2 border-[#eab308] px-8 py-2 text-lg font-medium text-charcoal transition hover:bg-charcoal hover:text-white focus:outline-none focus:ring'>
                View All
              </button>
            </Link>
          </div>
        </div>
        <button
          onClick={() => slide?.current?.slickNext()}
          className='absolute right-0 top-[54%] lg:top-[43%] '>
          <img
            src={arrowNext}
            alt=''
            className=''
          />
        </button>
      </div>
    </div>
  );
}
