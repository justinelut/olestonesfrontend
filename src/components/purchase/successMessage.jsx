import React from 'react';

const successMessage = ({ message }) => {
  return (
    <div
      className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative'
      role='alert'>
      <strong className='font-bold mr-2'>Success!</strong>
      <span className='block sm:inline'>{message}</span>
      <span className='absolute top-0 bottom-0 right-0 px-4 py-3'>
        <svg
          className='fill-current h-6 w-6 text-green-500'
          role='button'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'>
          <title>Close</title>
          <path d='M14.348 5.652a1 1 0 0 1 1.414 1.414L11.414 10l4.348 4.348a1 1 0 1 1-1.414 1.414L10 11.414l-4.348 4.348a1 1 0 0 1-1.414-1.414L8.586 10 4.238 5.652a1 1 0 1 1 1.414-1.414L10 8.586l4.348-4.348z' />
        </svg>
      </span>
    </div>
  );
};

export default successMessage;
