import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { sender } from '../api/api_utils';
import Success from '../responseMessages/Success';
const Form = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [succMessage, setSuccMessage] = useState();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const results = await sender('/api/contact', {
      name: data.name,
      phonenumber: data.phone,
      email: data.email,
      message: data.message,
    });

    if (results.message) {
      reset()
      setSuccMessage(
        'Thank you for contacting us, we will get back to you as soon as possible!!'
      );
      setTimeout(() => {
        navigate('/');
      }, 5000);
    }
  };

  return (
    <div className='flex py-10 items-center flex-col bg-fill'>
      <h1 class='mb-5 py-10 text-6xl md:text-4xl text-black xl:text-6xl text-center font-bold font-heading font-heading tracking-px-n leading-none'>
        Give Us A <span className='text-white'>Shout!</span>
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex gap-10 flex-col items-center justify-center w-full'>
        <input
          type='text'
          name='name'
          className='border-b-[2px] md:w-2/4 max-md:w-2/3 p-4 rounded focus:outline-1 bg-white text-lg text-gray-900'
          placeholder='Enter Your Name'
          {...register('name', {
            required: true,
            minLength: 2,
          })}
        />
        {errors.name?.type === 'required' && (
          <span className='text-red-500'>This field is required</span>
        )}
        {errors.name?.type === 'minLength' && (
          <span className='text-red-500'>
            Name must be at least 2 characters
          </span>
        )}
        <input
          type='tel'
          name='phone'
          className='border-b-[2px] text-lg focus:outline-1 p-4 rounded max-md:w-2/3 md:w-2/4 bg-white text-gray-900'
          placeholder='Phone Number'
          {...register('phone', {
            required: true,
            pattern: /^[0-9]{10}$/,
          })}
        />
        {errors.phone?.type === 'required' && (
          <span className='text-red-500'>This field is required</span>
        )}
        {errors.phone?.type === 'pattern' && (
          <span className='text-red-500'>
            Please enter a valid 10-digit phone number
          </span>
        )}

        <input
          type='email'
          name='email'
          className='border-b-[2px] text-lg focus:outline-1 p-4 rounded max-md:w-2/3  md:w-2/4 bg-white  text-gray-900'
          placeholder='Email'
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email?.type === 'required' && (
          <span className='text-red-500'>This field is required</span>
        )}
        {errors.email?.type === 'pattern' && (
          <span className='text-red-500'>
            Please enter a valid email address
          </span>
        )}
        <textarea
          type='text'
          name='message'
          className='h-20 pt-15 border-b-[2px] p-4 rounded focus:outline-1 max-md:w-2/3 md:w-2/4  bg-white text-gray-900 text-lg'
          placeholder='Send us a message'
          {...register('message', {
            required: true,
            minLength: 15,
          })}
        />
        {errors.message?.type === 'required' && (
          <span className='text-red-500'>This field is required</span>
        )}
        {errors.message?.type === 'minLength' && (
          <span className='text-red-500'>
            The message must be at least 15 characters
          </span>
        )}
        {succMessage && <Success message={succMessage} />}
        <button
          // style={{ width: '150px', height: '60px' }}
          className='mx-2 text-2xl font-semibold outline-4 bg-inherit text-white border-2 border-white p-4'>
          REQUEST A QU0TATION
        </button>
      </form>
    </div>
  );
};

export default Form;
