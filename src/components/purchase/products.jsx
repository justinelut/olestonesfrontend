import React from 'react';
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import { fetcher } from '../api/api_utils';
import { currency } from '../utils/currencyFormater';

export default function Products() {
  const { data } = useSWR('/api/products', fetcher);
  return (
    <section className='mx-4 bg-inherit flex'>
      <div
        className='mx-auto py-8 sm:px-6 sm:py-12 lg:px-8'
        style={{ display: 'grid', justifyItems: 'center' }}>
        <header className='grid'>
          <h2 className='mx-auto text-xl font-semibold sm:text-3xl'>
            Product Collection
          </h2>
          <p className='mx-auto mt-4 text-center text-black max-w-md'>
            Welcome to our products section! Shop now for products that reflect
            your unique style.
          </p>
        </header>
        <ul
          className='mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5'
          style={{ gridAutoRows: '1fr' }}>
          {data &&
            data.docs.map((product) => (
              <li className='my-2'>
                <Link
                  to={`/products/${product.id}`}
                  className='group block overflow-hidden rounded-md border'>
                  <img
                    src={product.images[0].image.sizes.card.url}
                    alt=''
                    className='h-full w-full object-cover transition duration-500 group-hover:scale-100 sm:h-[250px]'
                  />
                  <div className='relative bg-white py-5 px-5'>
                    <h3 className='text-base font-semibold text-black'>
                      {product.title}
                    </h3>
                    <p className='mt-2 font-semibold'>
                      <span className='sr-only'> Regular Price </span>

                      <span className='tracking-wider text-black font-semibold'>
                        {currency.format(product.price)}
                      </span>
                    </p>
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}
