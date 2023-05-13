import React from 'react';
import { Link } from 'react-router-dom';
import { useSignOut } from 'react-auth-kit';
import { currency } from '../utils/currencyFormater';
import { motion } from 'framer-motion';

const UserAccountDetails = (props) => {
  const signOut = useSignOut();
  return (
    <>
      <div className='flex flex-col md:flex-row items-center justify-center py-6 md:px-10 lg:px-16'>
        <div className='text-sm font-bold text-slate-800 flex items-center md:mr-auto'>
          <button className='text-xs font-bold text-blue uppercase px-4 py-2 transition duration-300 ease-in-out bg-yellow-500 rounded-lg hover:bg-yellow-400 focus:outline-none focus:shadow-outline-yellow'>
            Hello {props.user.firstname}
          </button>
          <span className='mr-2'>
            Bal {currency.format(props.user.accbalance)}
          </span>
        </div>

        {props && props.user.roles[0] === 'admin' && (
          <a
            href='/admin'
            className='text-sm font-bold text-slate-800 uppercase px-4 py-2 transition duration-300 ease-in-out border border-yellow rounded-lg hover:text-white hover:bg-yellow-500 mr-2 mb-2 md:mb-0 md:mr-4'>
            Dashboard
          </a>
        )}
        <Link
          to='/review/'
          className='text-sm font-bold text-slate-800 uppercase px-4 py-2 transition duration-300 ease-in-out border border-yellow rounded-lg hover:text-white hover:bg-yellow-500 mr-2 mb-2 md:mb-0 md:mr-4'>
          Write a Review
        </Link>
      </div>
    </>
  );
};

export default UserAccountDetails;
