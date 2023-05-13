import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { fetcher } from '../api/api_utils';
import { currency } from '../utils/currencyFormater';
import { useForm } from 'react-hook-form';
import { useIsAuthenticated } from 'react-auth-kit';
import { useStore } from '../store/store';

export default function Singleproduct() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const { pid } = useParams();
  const setProductDetails = useStore((state) => state.setProductDetails);

  const quantity = watch('quantity', 1);
  const onSubmit = (data) => {
    setProductDetails({ data, pid: pid });
    if (isAuthenticated()) {
      navigate(`/products/${pid}/checkout`);
    } else {
      navigate(`/login?redirect=${pid}`);
    }
  };

  const { data } = useSWR(`/api/products/${pid}`, fetcher);

  return (
    <div>
      <section>
        <div className='relative mx-auto max-w-screen-xl px-4 py-8'>
          <div className='grid grid-cols-1 items-start gap-8 md:grid-cols-2'>
            <div className='grid grid-cols-2 gap-4 md:grid-cols-1'>
              <img
                alt=''
                src={data && data.images[0].image.url}
                className='aspect-square w-full rounded-md object-cover'
              />

              <div className='grid grid-cols-2 gap-4 lg:mt-4'>
                {data &&
                  data.images.slice(1).map((image) => (
                    <img
                      alt=''
                      src={image.image.sizes.card.url}
                      className='aspect-square w-full rounded-xl object-cover'
                    />
                  ))}
              </div>
            </div>

            <div className='sticky top-0'>
              <strong className='rounded-full border border-yellow bg-gray-100 px-3 py-0.5 text-sm font-medium tracking-wide text-gray-700'>
                Pre Order
              </strong>

              <div className='mt-8 flex justify-between'>
                <div className='max-w-[35ch] space-y-2'>
                  <h1 className='text-xl font-bold sm:text-2xl'>
                    {data && data.title}
                  </h1>

                  <p className='text-base'>Highest Rated Product</p>

                  <div className='-ml-0.5 flex'>
                    <svg
                      className='h-5 w-5 text-yellow-400'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                      fill='currentColor'>
                      <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                    </svg>

                    <svg
                      className='h-5 w-5 text-yellow-400'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                      fill='currentColor'>
                      <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                    </svg>

                    <svg
                      className='h-5 w-5 text-yellow-400'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                      fill='currentColor'>
                      <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                    </svg>

                    <svg
                      className='h-5 w-5 text-yellow-400'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                      fill='currentColor'>
                      <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                    </svg>

                    <svg
                      className='h-5 w-5 text-gray-200'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                      fill='currentColor'>
                      <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                    </svg>
                  </div>
                </div>

                <p className='text-lg font-bold'>
                  {currency.format(data && data.price)}
                </p>
              </div>

              <div className='mt-4'>
                <div className='prose max-w-none'>
                  <p>{data && data.description}</p>
                </div>
              </div>

              <form
                className='mt-8'
                onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                  <legend className='mb-1 text-lg font-medium'>Color</legend>

                  <div className='flex flex-wrap gap-1'>
                    {data &&
                      data.colors.map((color) => (
                        <label
                          htmlFor={color.color}
                          className='cursor-pointer'
                          key={color.color}>
                          <input
                            type='radio'
                            name='color'
                            id={color.color}
                            value={color.color}
                            className='peer sr-only'
                            {...register('color', {
                              required: true,
                            })}
                          />
                          <span
                            className={`group inline-block rounded-full${
                              errors.color?.type === 'required'
                                ? ' border-4 border-red-500'
                                : ' border'
                            }  px-5 py-2 text-base mx-4 font-medium peer-checked:bg-fill peer-checked:text-white`}>
                            {color.color}
                          </span>
                        </label>
                      ))}
                  </div>
                </fieldset>

                <fieldset className='mt-4'>
                  <legend className='mb-1 text-lg font-medium'>Size</legend>
                  <div className='flex flex-wrap gap-1'>
                    {data &&
                      data.sizes.map((size) => (
                        <label
                          htmlFor={size.size}
                          className='cursor-pointer'
                          key={size.size}>
                          <input
                            type='radio'
                            name='size'
                            id={size.size}
                            value={size.size}
                            className='peer sr-only'
                            {...register('size', {
                              required: true,
                            })}
                          />
                          <span
                            className={`group inline-block rounded-full${
                              errors.size?.type === 'required'
                                ? ' border-4 border-red-500'
                                : ' border'
                            }  px-5 py-2 text-base font-medium peer-checked:bg-fill peer-checked:text-white`}>
                            {size.size}
                          </span>
                        </label>
                      ))}
                  </div>
                </fieldset>

                <div className='mt-8 flex gap-4'>
                  <div>
                    <label
                      htmlFor='quantity'
                      className='sr-only'>
                      Qty
                    </label>

                    <input
                      type='number'
                      id='quantity'
                      name='quantity'
                      min='1'
                      value={quantity}
                      {...register('quantity', {
                        required: true,
                      })}
                      className={`w-12 ${
                        errors.quantity?.type === 'required'
                          ? ' border-4 border-red-500'
                          : ' border-gray-200'
                      } rounded px-5 py-2 text-center text-lg [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none`}
                    />
                  </div>

                  <button
                    type='submit'
                    className='block rounded bg-fill px-5 py-3 text-lg mx-4 text-white font-bold hover:bg-yellow'>
                    Purchase
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
