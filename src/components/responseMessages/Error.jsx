import React from 'react'

const Error = (props) => {
  return (
    <>
      <div
        className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'
        role='alert'>
        {/* <strong className='font-bold'>Login was not successful.</strong> */}
        <span className='block sm:inline'>{props.message}</span>
      </div>
    </>
  );
}

export default Error;