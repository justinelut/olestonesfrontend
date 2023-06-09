import React from 'react';
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import { fetcher } from '../api/api_utils';
import { Helmet } from 'react-helmet-async';
import { WhatsAppWidget } from 'react-whatsapp-widget';
import 'react-whatsapp-widget/dist/index.css';

import { FloatingWhatsApp } from 'react-floating-whatsapp'


import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';

export default function Footer() {
  const { data } = useSWR('/api/globals/company', fetcher);
  const { data: footer } = useSWR('/api/globals/footer', fetcher);

  return (
    <>
      {/* <Helmet>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0'
        />

        <meta
          name='twitter:card'
          content='summary_large_image'
        />
        <meta
          name='twitter:title'
          content={data && data.name}
        />
        <meta
          name='twitter:description'
          content='Description of your content'
        />
        <meta
          name='twitter:image'
          content='https://yourwebsite.com/your-image.jpg'
        />

        <meta
          property='og:title'
          content={data && data.name}
        />
        <meta
          property='og:description'
          content='Description of your content'
        />
        <meta
          property='og:image'
          content='https://yourwebsite.com/your-image.jpg'
        />
        <meta
          property='og:url'
          content='https://yourwebsite.com/your-content-url'
        />
        <meta
          property='og:type'
          content='article'
        />

        <meta
          name='description'
          content='Description of your content'
        />
        <meta
          name='keywords'
          content='Keywords related to your content'
        />
        <meta
          name='author'
          content='Author of your content'
        />
        <meta
          name='robots'
          content='index, follow'
        />

        <title>{data && data.name}</title>
      </Helmet> */}

      <div className='flex bg-black p-4'>
        <div className=' py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl'>
          <div className='grid gap-16 row-gap-10 mb-8 lg:grid-cols-6'>
            <div className='md:max-w-md lg:col-span-2'>
              <a
                href='/'
                aria-label='Go home'
                title='Company'
                className='inline-flex items-center'>
                <span className='text-xl font-semibold text-yellowbg'>
                  {data && data.name}
                </span>
              </a>
              <div className='my-2 lg:max-w-sm'>
                <p className='text-base text-white'>
                  {data && data.description}
                </p>
              </div>
            </div>
            <div className='grid grid-cols-3 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-4'>
              {footer &&
                footer.links.map((title) => (
                  <div>
                    <p className='font-semibold tracking-wide text-yellowbg'>
                      {title.title}
                    </p>
                    <ul className='mt-2 space-y-2'>
                      {title.links.map((link) => (
                        <li>
                          <Link
                            to={`/${link.slug}`}
                            className='text-white'>
                            {link.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </div>
          <div className='bg-gray-900 py-4'>
            <div className='container mx-auto px-4'>
              <div className='flex flex-wrap -mx-4'>
                <div className='w-full md:w-1/3 px-4 mb-4'>
                  <h3 className='text-xl text-white font-bold mb-2'>Phone</h3>
                  <p className='text-white'>+254 707 782830</p>
                </div>
                <div className='w-full md:w-1/3 px-4 mb-4'>
                  <h3 className='text-xl text-white font-bold mb-2'>Email</h3>
                  <p className='text-white'>info@olestonesbuilders.co.ke</p>
                </div>
                <div className='w-full md:w-1/3 px-4 mb-4'>
                  <h3 className='text-xl text-white font-bold mb-2'>Address</h3>
                  <p className='text-white'>Nairobi, Kenya</p>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col justify-between pt-5 pb-10 border-t sm:flex-row bg-gray-900 opacity-60'>
            {/* <p className='text-lg text-text text-white'>
              © Copyright {new Date().getFullYear()} {data && data.name}. All
              rights reserved.
            </p> */}
            <p className='text-lg text-text text-white'>
              © Copyright {new Date().getFullYear()}. Ole Stones Builders &
              Logistics. All Rights Reserved.
            </p>

            <div className='flex items-center text-yellow mt-4 space-x-4 sm:mt-0'>
              <TwitterShareButton url={'https://www.olestonesbuilders.co.ke'}>
                <TwitterIcon size={32} />
              </TwitterShareButton>
              <WhatsappShareButton url={'https://www.olestonesbuilders.co.ke'}>
                <WhatsappIcon size={32} />
              </WhatsappShareButton>
              <FacebookShareButton url={'https://www.olestonesbuilders.co.ke'}>
                <FacebookIcon size={32} />
              </FacebookShareButton>
            </div>
          </div>
        </div>
      </div>

      <FloatingWhatsApp
          phoneNumber='+254707782830'
          accountName='Olestones Builders'
          avatar='/olestonesavatar.jpg'
          buttonClassName='absolute mb-24' // Add Tailwind CSS classes here
          chatboxClassName='absolute mb-24'
          chatMessage='Welcome to Ole Stones Builders, Tell us what you would like us to do for you.'
          allowEsc
          allowClickAway
          notification
          notificationSound
        />
    </>
  );
}
