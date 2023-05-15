import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { fetcher } from '../api/api_utils';
import useSWR from 'swr';
import FormatDay from '../utils/dateformater';
import serializeContent from '../utils/jsontohtml';

const SingleBlogPost = () => {
  const { slug } = useParams();
  const { data } = useSWR(`/api/posts?where[slug][equals]=${slug}`, fetcher);
  const tagColors = [
    'bg-slate-200',
    'bg-gray-200',
    'bg-purple-200',
    'bg-yellow-200',
    'bg-red-300',
  ];

   if (data && data.docs.length === 0) {
     <Navigate to='/404' />;
     return null;
   }
 

  return (
    <div className='max-w-screen-lg mb-6 mx-auto'>
      <main className='mt-10'>
        <div className='mb-4 md:mb-0 w-full mx-auto relative'>
          <div className='px-4 lg:px-0'>
            <h2 className='text-4xl font-semibold text-black leading-tight'>
              {data && data.docs[0].title}
            </h2>
                <a
                  href='/blog'
                  className='py-2 text-slate-900 font-medium inline-flex items-center justify-center mb-2'>
                  { data && data.docs[0].category.name}
                </a>
          </div>
          <div className='flex items-center justify-between text-base font-medium dark:text-gray-400 mb-4'>
            <div className='flex items-center'>
              <span className='mr-2'>by</span>
              <a
                rel='noopener noreferrer'
                href='/'
                target='_blank'
                className='underline dark:text-violet-400'>
                <span itemprop='name'>
                  {data &&
                    data.docs[0].createdBy.firstname + ' ' + data &&
                    data.docs[0].createdBy.lastname}
                </span>
              </a>
            </div>
            <time
              datetime={FormatDay(data && data.docs[0].updatedAt)}
              className='text-gray-900 dark:text-gray-50 text-base font-medium'>
              {FormatDay(data && data.docs[0].updatedAt)}
            </time>
          </div>
          <img
            src={data && data.docs[0].image.url}
            className='w-full object-cover lg:rounded'
            alt='me'
            style={{ height: '28em' }}
          />
        </div>

        <div className='flex flex-col lg:flex-row lg:space-x-12'>
          <div className='px-4 lg:px-0 mt-12 text-black text-lg leading-relaxed w-full lg:w-3/4'>
            <div
              dangerouslySetInnerHTML={{
                __html: data && serializeContent(data.docs[0].content).html,
              }}></div>

            <div className='mt-4'>
              <h3 className='text-lg font-medium mb-2'>Tags</h3>
              <div className='flex flex-wrap'>
                <div className='flex flex-wrap mt-4'>
                  {data &&
                    data.docs[0].tags.map((tag, index) => (
                      <div
                        key={index}
                        className={`mr-2 mb-2 p-2 rounded-md ${
                          tagColors[index % tagColors.length]
                        }`}>
                        <span className='text-sm font-medium text-gray-900'>
                          {tag.name}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className='w-full lg:w-1/4 m-auto mt-12 max-w-screen-sm'>
            <div className='p-4 border-t border-b md:border md:rounded'>
              <div className='flex py-2'>
                <img
                  alt='me'
                  src={data && data.docs[0].image.sizes.profile.url}
                  className='h-10 w-10 rounded-full mr-2 object-cover'
                />
                <div>
                  <p className='font-semibold text-gray-700 text-sm'>
                    {' '}
                    {data &&
                      data.docs[0].createdBy.firstname + ' ' + data &&
                      data.docs[0].createdBy.lastname}{' '}
                  </p>
                  <p className='font-semibold text-gray-600 text-xs'>
                    {' '}
                    {data && data.docs[0].createdBy.roles[0]}{' '}
                  </p>
                </div>
              </div>
              <p className='text-gray-900 py-3'>
                {data && data.docs[0].createdBy.aboutme}
              </p>
              <button className='px-2 py-1 text-white bg-fill flex w-full items-center justify-center rounded'>
                Follow
                <i className='bx bx-user-plus ml-2'></i>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SingleBlogPost;
