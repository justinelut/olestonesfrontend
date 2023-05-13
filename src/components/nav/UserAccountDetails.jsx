import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCheck } from 'react-icons/fa';
import { currency } from '../utils/currencyFormater';
import { AiOutlineLogout } from 'react-icons/ai';
import { useSignOut } from 'react-auth-kit';

const UserAccountDetails = (props) => {
  const signOut = useSignOut();
  return (
    <>
      <div className='mt-4 items-center justify-center'>
        <ul className='flex items-center space-x-8 px-4 max'>
          <li className='flex items-center ml-4 max-sm:ml-[2px] max-sm:flex-col'>
            <FaUserCheck />
            <span className=''>{props.user.firstname}</span>
          </li>
          <li className='flex items-center max-sm:flex-col'>
            {props && props.user.roles[0] === 'admin' ? (
              <a href='/admin'>Dashboard</a>
            ) : (
              <></>
            )}
          </li>
          <li className='flex items-center max-sm:flex-col'>
            {/* <FaWallet /> */}
            <span className=''>
              Bal {currency.format(props.user.accbalance)}
            </span>
          </li>
          <li className='flex items-center max-sm:flex-col'>
            <Link to='/review/'>
              <span>Review</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default UserAccountDetails;
