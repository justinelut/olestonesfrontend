import React, { useState } from 'react';
import { useIsAuthenticated, useAuthUser } from 'react-auth-kit';
import { Controller, useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import { fetcher, sender } from '../api/api_utils';
import { currency } from '../utils/currencyFormater';
import Select from 'react-select';
import { useStore } from '../store/store';
import { PurchaseConfirmation } from './checkbalance';
import Info from '../responseMessages/info';
export default function Checkout() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const isAuthenticated = useIsAuthenticated();
  const { pid } = useParams();
  const auth = useAuthUser();
  const { data } = useSWR(`/api/products/${pid}`, fetcher);
  const { data: delivery } = useSWR(`/api/delivery`, fetcher);
  const [disabled, setDisabled] = useState(false);
  const [initiator, setInitiator] = useState(false);
  const [message, setMessage] = useState();
  const [buttonId, setButtonId] = useState();
  const [btn1Disabled, setBtn1Disabled] = useState(false);
  const [btn1Text, setBtn1Text] = useState('Pay Via Mpesa');
  const [btn2Disabled, setBtn2Disabled] = useState(true);
  const [btn2Text, setBtn2Text] = useState('Confirm');
  const [btn2Clicked, setBtn2Clicked] = useState(false);
  const navigate = useNavigate();

  const productdetails = useStore((state) => state.productdetails);
  if (!productdetails) return <Navigate to='/products' />;
  const quantity = productdetails.data.quantity;
  const size = productdetails.data.size;
  const color = productdetails.data.color;

  function handleClick(event) {
    const id = event.target.id;
    setButtonId(id);
  }

  const onSubmit = async (formdata) => {
    if (parseInt(buttonId) === 0) {
      setBtn1Disabled(true);
      setBtn1Text('Initiating Payment...');
      const results = await sender('/api/mpesalogs', {
        amount: parseInt(data.price) * parseInt(quantity),
        productid: pid,
        user: auth(),
        phonenumber: formdata.phone,
      });
      setTimeout(() => {
        setInitiator(false);
        setDisabled(true);
      }, 20000);
      if (results.doc.phonenumber) {
        setMessage(
          'Payment initiated, check you phone to complete the payment process'
        );
        setBtn1Text('Payment Initiated');
        setBtn2Disabled(false);
        setBtn2Text('Confirm');
      } else {
        setBtn1Text('Pay Via Mpesa');
        setBtn1Disabled(false);
      }
    } else if (parseInt(buttonId) === 1) {
      setBtn2Disabled(true);
      setBtn2Text('Confirming...');
      const totalPrice = parseInt(data.price) * parseInt(quantity);
      const { message, payment } = await PurchaseConfirmation(
        auth().id,
        totalPrice
      );
      if (payment && message) {
         setBtn2Clicked(true);
         setBtn2Text('Confirmed');
        const order = await sender('/api/orders', {
          productname: data.title,
          productcolor: color,
          productsize: size,
          productid: pid,
          productquantity: quantity,
          totalamountpayed: totalPrice,
          shippingmethod: formdata.shippingmethod,
          email: formdata.email,
          name: formdata.name,
          county: formdata.county.value,
          subcounty: formdata.subcounty.value,
          town: formdata.town,
          center: formdata.center,
          house: formdata.house,
          phone: formdata.phone,
          clientid: auth().id,
        });
        if(order){
          setMessage(
            `You have successfully purchased, ${order.doc.productname}, redirecting...`
          );
          setTimeout(()=>{
            navigate(`/products/${pid}/checkout/ordersuccess?ordernumber=${order.doc.id}`);
          }, 3000)
        }
      }else{
        setMessage(message)
        setBtn2Disabled(false);
        setBtn2Text('Confirm');
      }
    } else {
      setBtn2Disabled(false);
      setBtn2Text('Confirm');
    }
  };

  const subcounties =
    data &&
    data.subcounties.map((subcounty) => {
      const label = subcounty
        .split('_')
        .map((word) => {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join('_');
      return { value: subcounty, label: label };
    });

  const counties =
    data &&
    data.county.map((subcounty) => {
      const label = subcounty
        .split('_')
        .map((word) => {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join('_');
      return { value: subcounty, label: label };
    });

  const validateSelect = (value) => {
    if (!value) {
      return 'Select field is required';
    }
  };

  if (!isAuthenticated()) {
    return <Navigate to='/products' />;
  }

  if (data && !data) return <Navigate to='/products' />;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col items-center border-b py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32'>
          <Link
            href={`/products/${pid}`}
            className='text-2xl font-bold text-gray-800'>
            {data && data.title}
          </Link>

          <div className='mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base'>
            <div className='relative'>
              <ul className='relative flex w-full items-center justify-between space-x-2 sm:space-x-4'>
                <li className='flex items-center space-x-3 text-left sm:space-x-4'>
                  <a
                    className='flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700'
                    href='/'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-4 w-4'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      stroke-width='2'>
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        d='M5 13l4 4L19 7'
                      />
                    </svg>
                  </a>
                  <span className='font-semibold text-gray-900'>Payment</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32'>
          <div className='px-4 pt-8'>
            <p className='text-xl font-medium'>Order Summary</p>
            <p className='text-gray-500'>Check and confirm your items.</p>
            <div className='mt-8 space-y-3 rounded-lg border px-2 py-4 sm:px-6'>
              <div className='flex flex-col rounded-lg sm:flex-row'>
                <img
                  className='m-2 h-24 w-28 rounded-md border object-cover object-center'
                  src={data && data.images[0].image.url}
                  alt=''
                />
                <div className='flex w-full flex-col px-4 py-4'>
                  <span className='font-semibold'>{data && data.title}</span>
                  <span className='float-right text-gray-400'>{size}</span>
                  <span className='float-right text-gray-400'>{color}</span>
                  <p className='text-lg font-bold'>
                    {currency.format(data && data.price)} X {quantity}
                  </p>
                </div>
              </div>
            </div>
            <p class='mt-8 text-lg font-medium'>Shipping Methods</p>
            <div class='mt-5 grid gap-6'>
              {delivery &&
                delivery.docs.map((deliver, index) => (
                  <div
                    key={index}
                    className='relative'>
                    <input
                      className='peer hidden'
                      id={deliver.name}
                      value={deliver.name}
                      type='radio'
                      defaultChecked={index === 0} // set defaultChecked on first radio button
                      name='shippingmethod'
                      {...register('shippingmethod', { required: true })}
                    />
                    <span className='peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white'></span>
                    <label
                      className='peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4'
                      htmlFor={deliver.name} // use htmlFor instead of for
                    >
                      <img
                        className='w-14 object-contain'
                        src={deliver.image.sizes.card.url}
                        alt=''
                      />
                      <div className='ml-5'>
                        <span className='mt-2 font-semibold'>
                          {deliver.name}
                        </span>
                        <p className='text-slate-500 text-sm leading-6'>
                          {deliver.description}
                        </p>
                      </div>
                    </label>
                  </div>
                ))}
            </div>
          </div>

          <div className='mt-10 bg-gray-50 px-4 pt-8 lg:mt-0'>
            <p className='text-xl font-medium'>Payment Details</p>
            <p className='text-gray-400'>
              Complete your order by providing your payment details.
            </p>
            <div className=''>
              <label
                for='email'
                className='mt-4 mb-2 block text-sm font-medium'>
                Email
              </label>
              <div className='relative'>
                <input
                  type='text'
                  id='email'
                  name='email'
                  className={`w-full bg-inherit rounded-md border ${
                    errors.email?.type === 'required'
                      ? 'border-4 border-red-500'
                      : 'border-gray-200'
                  } px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 ${
                    errors.email?.type === 'required'
                      ? 'focus:border-red-500 focus:ring-red-500'
                      : 'focus:border-blue-500 focus:ring-blue-500'
                  }  `}
                  placeholder='your.email@gmail.com'
                  {...register('email', {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                />
                <div className='pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4 text-gray-400'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    stroke-width='2'>
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'
                    />
                  </svg>
                </div>
              </div>
              <label
                for='name'
                className='mt-4 mb-2 block text-sm font-medium'>
                Full name
              </label>
              <div className='relative mt-5'>
                <input
                  type='text'
                  id='name'
                  name='name'
                  className={`w-full bg-inherit rounded-md border ${
                    errors.name?.type === 'required'
                      ? 'border-4 border-red-500'
                      : 'border-gray-200'
                  } px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 ${
                    errors.name?.type === 'required'
                      ? 'focus:border-red-500 focus:ring-red-500'
                      : 'focus:border-blue-500 focus:ring-blue-500'
                  } `}
                  placeholder='Your full name here'
                  {...register('name', {
                    required: true,
                    minLength: 2,
                  })}
                />

                <div className='pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4 text-gray-400'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    stroke-width='2'>
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z'
                    />
                  </svg>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4 w-full max-md:flex max-md:flex-col'>
                <div>
                  <label
                    for='county'
                    className='mt-4 mb-2 block text-base font-medium'>
                    County
                  </label>
                  <Controller
                    name='county'
                    control={control}
                    rules={{ validate: validateSelect }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        defaultValue={counties && counties[0]}
                        options={counties && counties}
                        className='bg-inherit'
                      />
                    )}
                  />
                </div>

                <div>
                  <label
                    for='subcounty'
                    className='mt-4 mb-2 block text-base font-medium'>
                    Subcounty
                  </label>
                  <Controller
                    name='subcounty'
                    control={control}
                    rules={{ validate: validateSelect }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        defaultValue={subcounties && subcounties[0]}
                        options={subcounties && subcounties}
                        className={'border-red-500'}
                      />
                    )}
                  />
                </div>
                <div>
                  <label
                    for='town'
                    className='mt-4 mb-2 block text-base font-medium'>
                    Town / Location
                  </label>
                  <div>
                    <input
                      type='text'
                      id='town'
                      name='town'
                      className={`w-full bg-inherit rounded-md border ${
                        errors.town?.type === 'required'
                          ? 'border-4 border-red-500'
                          : 'border-gray-200'
                      } px-4 py-3 pl-2 text-sm shadow-sm outline-none focus:z-10 ${
                        errors.town?.type === 'required'
                          ? 'focus:border-red-500 focus:ring-red-500'
                          : 'focus:border-blue-500 focus:ring-blue-500'
                      } `}
                      placeholder='ENTER YOUR TOWN'
                      {...register('town', { required: true })}
                    />
                  </div>
                </div>

                <div>
                  <label
                    for='center'
                    className='mt-4 mb-2 block text-base font-medium'>
                    Center/Village
                  </label>
                  <div>
                    <input
                      type='text'
                      id='center'
                      name='center'
                      className={`w-full bg-inherit rounded-md border ${
                        errors.center?.type === 'required'
                          ? 'border-4 border-red-500'
                          : 'border-gray-200'
                      } px-4 py-3 pl-2 text-sm shadow-sm outline-none focus:z-10 ${
                        errors.center?.type === 'required'
                          ? 'focus:border-red-500 focus:ring-red-500'
                          : 'focus:border-blue-500 focus:ring-blue-500'
                      } `}
                      placeholder='ENTER YOUR VILLAGE/CENTER'
                      {...register('center', { required: true })}
                    />
                  </div>
                </div>
                <div>
                  <label
                    for='houseno'
                    className='mt-4 mb-2 block text-base font-medium'>
                    House N0
                  </label>
                  <div>
                    <input
                      type='text'
                      id='house'
                      name='house'
                      className={`w-full bg-inherit rounded-md border ${
                        errors.house?.type === 'required'
                          ? 'border-4 border-red-500'
                          : 'border-gray-200'
                      } px-4 py-3 pl-2 text-sm shadow-sm outline-none focus:z-10 ${
                        errors.house?.type === 'required'
                          ? 'focus:border-red-500 focus:ring-red-500'
                          : 'focus:border-blue-500 focus:ring-blue-500'
                      } `}
                      placeholder='ENTER YOUR HOUSE N0'
                      {...register('house', { required: true })}
                    />
                  </div>
                </div>
                <div className='relative'>
                  <label
                    for='phone'
                    className='mt-4 mb-2 block text-base font-medium'>
                    Phone Number
                  </label>
                  <div>
                    <input
                      type='tel'
                      id='phone'
                      name='phone'
                      className={`w-full bg-inherit rounded-md border ${
                        errors.phone?.type === 'required'
                          ? 'border-4 border-red-500'
                          : 'border-gray-200'
                      } px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 ${
                        errors.phone?.type === 'required'
                          ? 'focus:border-red-500 focus:ring-red-500'
                          : 'focus:border-blue-500 focus:ring-blue-500'
                      } `}
                      placeholder='740455200'
                      {...register('phone', { required: true })}
                    />

                    <div className='mt-12 pointer-events-none text-black absolute inset-y-0 left-0 inline-flex items-center px-3'>
                      +254
                    </div>
                  </div>
                </div>
              </div>

              <div className='mt-6 border-t border-b py-2'>
                <div className='flex items-center justify-between'>
                  <p className='text-sm font-medium text-gray-900'>Subtotal</p>
                  <p className='font-semibold text-gray-900'>
                    {currency.format(
                      data && parseInt(data.price) * parseInt(quantity)
                    )}
                  </p>
                </div>
                <div className='flex items-center justify-between'>
                  <p className='text-sm font-medium text-gray-900'>Delivery</p>
                  <p className='font-semibold text-gray-900'>
                    To be determined
                  </p>
                </div>
              </div>
              <div className='mt-6 flex items-center justify-between'>
                <p className='text-sm font-medium text-gray-900'>Total</p>
                <p className='text-2xl font-semibold text-gray-900'>
                  {currency.format(
                    data && parseInt(data.price) * parseInt(quantity)
                  )}
                </p>
              </div>
            </div>
            {message && <Info message={message} />}
            <button
              type='submit'
              onClick={handleClick}
              id={0}
              disabled={btn1Disabled}
              className={`mt-4 mb-4 w-full rounded-md ${
                btn1Disabled ? 'bg-blue-200' : 'bg-yellowbg hover:bg-yellow'
              } ${
                btn1Disabled ? '' : ' active:bg-gray-500'
              } focus:outline-none focus:ring focus:ring-yellow px-6 py-3 font-medium text-slate-50`}>
              {btn1Text}
            </button>

            <button
              type='submit'
              onClick={handleClick}
              id={1}
              disabled={btn2Disabled}
              className={`mb-8 w-full rounded-md ${
                btn2Disabled ? 'bg-blue-200' : 'bg-yellowbg hover:bg-yellow'
              } ${
                btn2Disabled ? '' : ' active:bg-gray-500'
              } focus:outline-none focus:ring focus:ring-yellow px-6 py-3 font-medium text-black`}>
              {btn2Text}
            </button>

            <button
              type='button'
              className='mb-6 border-red-100'
              onClick={() => window.location.reload()}>
              Reload
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
