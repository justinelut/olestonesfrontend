import React, { useState } from 'react';

const PasswordResetPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform password reset request here
    // API call to backend to handle the password reset logic

    // Example API call using fetch:
    fetch('/api/password-reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch((error) => {
        setMessage('An error occurred. Please try again later.');
        console.error(error);
      });
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full mx-auto'>
        <div className='text-center'>
          <h2 className='mt-6 text-3xl font-extrabold text-gray-900'>
            Password Reset
          </h2>
        </div>
        <form
          className='mt-8 space-y-6'
          onSubmit={handleSubmit}>
          <div className='rounded-md shadow-sm -space-y-px'>
            <div>
              <label
                htmlFor='email'
                className='sr-only'>
                Email
              </label>
              <input
                id='email'
                name='email'
                type='email'
                autoComplete='email'
                value={email}
                onChange={handleEmailChange}
                required
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                placeholder='Email address'
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellowbg hover:bg-yellow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
              Reset Password
            </button>
          </div>
        </form>
        <div className='mt-2 text-center text-sm text-gray-600'>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default PasswordResetPage;
