import React from 'react';
import quotationbg from './quotationbg.jpg'

function quotation() {
  return (
    <>
      <div>
        <div className='relative overflow-hidden rounded-lg shadow-lg bg-black opacity-30'>
          <img
            className='object-cover w-full h-60'
            src={quotationbg}
            alt=''
          />

          <div className='absolute top-0 left-0 px-6 py-4'>
            <h4 className='mb-3 text-6xl font-semibold tracking-tight text-yellowbg'>
              Give Us A Shout
            </h4>
            <p className='leading-normal text-gray-100'>
              We are incredibly responsive to your requests and value your
              requests. We promise a short response time of 12 hours or fewer.
            </p>
            <a href="/" className='bg-fill inline-block max-sm:w-1/4 text-white font-semibold text-lg p-5 '>REQUEST FOR A QUOTATION</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default quotation;
