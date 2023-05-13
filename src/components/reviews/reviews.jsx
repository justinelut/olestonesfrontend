import React, { useState } from 'react';
import { useAuthUser } from 'react-auth-kit';
import { useForm } from 'react-hook-form';
import { sender } from '../api/api_utils';

const ReviewTextField = () => {
  const [reviewText, setReviewText] = useState('');
  const auth = useAuthUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const results = await sender(`/api/reviews`, {
      review: data.userReview,
      firstname: auth().firstname,
      lastname: auth().lastname,
      email: auth().email,
      approve: 'disapproved',
    });
    results && console.log(results);
  };

  // Image file validation

  //  const validateImage = (value) => {
  //    if (!value[0]) {
  //      return 'Please upload an image';
  //    }
  //    const fileSize = value[0].size / 1024 / 1024; // in MB
  //    const supportedFormats = [
  //      'image/jpg',
  //      'image/jpeg',
  //      'image/png',
  //    ];
  //    if (supportedFormats.indexOf(value[0].type) === -1) {
  //      return 'Only JPG, JPEG and PNG formats are supported';
  //    }
  //    if (fileSize > 5) {
  //      return 'File too large. Image size should not exceed 5 MB';
  //    }
  //    return true;
  //  };

  function handleChange(event) {
    setReviewText(event.target.value);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='px-20 py-10 mx-auto '>
      <h2 class='mb-5 text-6xl md:text-8xl text-gray-800 xl:text-10xl text-center font-bold font-heading font-heading tracking-px-n leading-none'>
        Leave a review
      </h2>
      <div className='flex flex-col'>
        {/* <div className='max-w-xl mb-5'>
          <label
            className={`flex mb-4 justify-center w-full h-32 px-4 transition bg-inherit border-2 ${
              errors.image?.type === 'required'
                ? 'border-4 border-red-400 border-dashed'
                : 'border-gray-300 border-dashed'
            } rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none`}>
            <span className='flex items-center space-x-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-6 h-6 text-gray-600'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth='2'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                />
              </svg>
              <span className='font-medium text-gray-600'>
                Drop Images to Attach, or{' '}
                <span className='text-blue-600 underline'>browse</span>
              </span>
            </span>
            <input
              type='file'
              name='image'
              className='hidden'
              {...register('image', {
                required: true,
                // validate: validateImage(),
              })}
            />
          </label>
          {errors.image?.type === 'required' && (
            <span className='text-red-500'>Image is required</span>
          )}
        </div> */}

        <textarea
          className={`appearance-none bg-transparent ${
            errors.userReview?.type === 'required'
              ? 'border-4 border-red-400'
              : 'border'
          } rounded-md w-full text-gray-900 py-2 px-2 focus:outline-none h-[30vh]`}
          type='text'
          placeholder='Write a review...'
          name='userReview'
          onChange={handleChange}
          {...register('userReview', {
            required: true,
            minLength: 10,
            maxLength: 1000,
          })}
        />
        {errors.userReview?.type === 'required' && (
          <span className='text-red-500'>This field is required</span>
        )}
        {errors.userReview?.type === 'minLength' && (
          <span className='text-red-500'>
            The review must be at least 10 characters
          </span>
        )}
        {errors.userReview?.type === 'maxLength' && (
          <span className='text-red-500'>
            The review must not exceed 1000 characters
          </span>
        )}
        <button
          className='flex-shrink-0 bg-fill hover:bg-gray-700 text-lg mt-5 rounded-lg leading-relaxed border-4 text-white py-2'
          type='submit'>
          Submit
        </button>
      </div>
    </form>
  );
};

export default ReviewTextField;
