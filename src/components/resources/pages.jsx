import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { fetcher } from '../api/api_utils';
import useSWR from 'swr';
import serializeContent from '../utils/jsontohtml';

const Pages = () => {
  const { slug } = useParams();
  const { data } = useSWR(`/api/pages?where[slug][equals]=${slug}`, fetcher);
 

  if(data && data.docs.length === 0){
    <Navigate to='/404' />;
    return null
  }
 

  return (
    <div className='max-w-screen-lg mx-auto'>
      {data && console.log(data)}
      <main className='mt-10'>
        <div className='md:mb-0 w-full mx-auto relative'>
          <div className='px-4 lg:px-0'>
            <h2 className='text-4xl font-semibold mb-4 text-gray-800 leading-tight'>
              {data && data.docs[0].title}
            </h2>
          </div>
        </div>

        <div className='flex flex-col lg:flex-row lg:space-x-12 mb-10'>
          <div className='px-4 lg:px-0 mt-12 text-gray-700 text-lg leading-relaxed w-full lg:w-3/4'>
            <div
              dangerouslySetInnerHTML={{
                __html: data && serializeContent(data.docs[0].content).html,
              }}></div>
          </div>
          <div className='w-full lg:w-1/4 m-auto mt-12 max-w-screen-sm'>
            <div className='p-4 border-t bg-yellowbg border-b md:border md:rounded'>
              <p className='text-white-700 font-bold py-2'>
                {data && data.docs[0].summary}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pages;
