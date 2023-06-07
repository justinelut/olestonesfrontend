import React from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

const SocialLinks = () => {
  return (
    <div className='flex justify-center space-x-8 bg-yellowbg py-2'>
      <a
        href='https://www.facebook.com/profile.php?id=100091628060481&mibextid=ZbWKwL'
        className='text-white'>
        <FaFacebook className='text-2xl' />
      </a>
      <a
        href='https://www.instagram.com'
        className='text-white'>
        <FaInstagram className='text-2xl' />
      </a>
    </div>
  );
};

export default SocialLinks;
