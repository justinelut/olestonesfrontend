import React from 'react';
import bgImg from './bg.png';
import client from './Ellipse 30.png';
import './reviews.css';
import { useRef } from 'react';
import arrowNext from '../blogSection/arrowIcon.png';
import arrowPrev from '../blogSection/arrowIcon2.png';
import Slider from 'react-slick';
import { fetcher } from '../api/api_utils';
import useSWR from 'swr';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Reviews = () => {
  const slide = React.useRef(null);
  const { data } = useSWR(`/api/reviews`, fetcher);

  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '11.5%',
    slidesToShow: 1,
    dots: false,

    autoplay: false,
    autoplaySpeed: 700,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 1,
          centerMode: false,

          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerMode: false,

          infinite: true,
          dots: true,
        },
      },
    ],
  };
  return (
    <div className='flex items-center p-10 flex-col  gap-10 relative overflow-hidden bg-fill'>
      <h1 class='font-heading text-8xl xs:text-4xl md:text-8xl font-heading max-sm:text-6xl font-bold text-gray-700 px-4'>
        <span className='text-white'>What </span>
        <span class='font-serif italic'>Our</span>
        <br></br>
        <span className=''>clients say about us</span>
      </h1>
      <div className='w-[100%] sm:w-[90%] xl:w-full text-center '>
        <Slider
          ref={slide}
          {...settings}>
          {data &&
            data.docs.map((review, index) => (
              <div class='w-full lg:w-1/2 px-4'>
                <div class='max-w-lg'>
                  <img
                    class='block mb-8'
                    src='saturn-assets/images/testimonials/quote.svg'
                    alt=''
                  />
                  <p class='text-2xl font-semibold text-gray-900 mb-5'>
                    &ldquo;{review.review}&rdquo;
                  </p>
                  <span class='block text-gray-900 font-semibold mb-1'>
                    &mdash; {`${review.firstname + ' ' + review.lastname}`}
                  </span>
                  <span class='block text-gray-500 mb-10'>
                    {/* Product Manager, XYZ Tech */}
                  </span>
                  {/* <div>
                    <button class='inline-block mr-3 w-3 h-3 rounded-full bg-orange-900'></button>
                    <button class='inline-block mr-3 w-3 h-3 rounded-full bg-gray-200 hover:bg-orange-200'></button>
                    <button class='inline-block mr-3 w-3 h-3 rounded-full bg-gray-200 hover:bg-orange-200'></button>
                    <button class='inline-block w-3 h-3 rounded-full bg-gray-200 hover:bg-orange-200'></button>
                  </div> */}
                </div>
              </div>
            ))}
        </Slider>
      </div>
      <button
        onClick={() => slide?.current?.slickPrev()}
        className='absolute left-0 bottom-[35%] max-sm:hidden lg:hidden'
        style={{}}>
        <img
          src={arrowPrev}
          alt=''
          className='  max-md:w-12 max-sm:w-8  '
        />
      </button>
      <button
        onClick={() => slide?.current?.slickNext()}
        className='absolute right-0 bottom-[35%]  max-sm:hidden  lg:hidden'>
        <img
          src={arrowNext}
          alt=''
          className='  max-md:w-12 max-sm:w-8 '
        />
      </button>
    </div>
  );
};

export default Reviews;
