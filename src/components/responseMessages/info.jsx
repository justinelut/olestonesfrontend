import React from 'react';

const Info = (props) => {
  return (
    <>
      <div
        className='bg-green-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative'
        role='alert'>
        <span className='block sm:inline'> {props.message}</span>
      </div>
    </>
  );
};

export default Info;
