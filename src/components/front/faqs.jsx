import React, { useEffect } from 'react'
import { fetcher } from '../api/api_utils';
import useSWR from 'swr';
import { useAnimate, useInView, usePresence, stagger } from 'framer-motion';

function Faqs() {
    const { data } = useSWR(`/api/faqs?limit=6`, fetcher);
      const [isPresent, safeToRemove] = usePresence();
      const [scope, animate] = useAnimate();
      const isInView = useInView(scope);

      useEffect(() => {
        if (isInView && isPresent) {
          const enterAnimation = async () => {
            await animate(
              'img',
              { opacity: [0, 1] },
              { duration: 0.5, delay: stagger(0.6) }
            );
          };
          enterAnimation();
        }
      });
      useEffect(() => {
        if (isInView && isPresent) {
          const enterAnimation = async () => {
            await animate(
              '#answer',
              { opacity: [0, 1] },
              { duration: 0.5, delay: stagger(0.6) }
            );
          };
          enterAnimation();
        }
      });

  return (
    <section
      ref={scope}
      class='relative bg-black py-20 overflow-hidden'>
      <img
        class='absolute top-0 left-0 mt-44'
        src='saturn-assets/images/faq/light-blue-left.png'
        alt=''
      />
      <img
        class='absolute top-0 right-0 mt-10'
        src='saturn-assets/images/faq/star-right.svg'
        alt=''
      />
      <div class='relative container px-4 mx-auto'>
        <div class='max-w-5xl mx-auto'>
          <div class='text-center'>
            <span class='inline-block py-1 px-3 mb-4 text-lg font-semibold text-white bg-orange-50 rounded-full'>
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h1 class='font-heading text-2xl xs:text-4xl md:text-6xl font-semibold text-black mb-8'>
              <span className='text-yellowbg'> You ask, {' '}</span>
              <span class='font-serif text-white'>we answer</span>
            </h1>
          </div>
          <div class='pt-10 sm:pt-24 px-8 sm:px-20 pb-18 bg-black rounded-4xl shadow-lg'>
            {data &&
              data.docs.slice(0, 1).map((faq, index) => (
                <button
                  key={index}
                  class='flex mb-8 pb-8 group w-full items-start justify-between border-b border-gray-100 text-left'>
                  <div class='max-w-xl pr-5'>
                    <h3 class='text-xl font-semibold text-white mb-3'>
                      {faq.question}?
                    </h3>
                    <p class='text-lg text-yellowbg'>{faq.answer}</p>
                  </div>
                  <div class='pt-1'>
                    <span>
                      <svg
                        width='17'
                        height='3'
                        viewbox='0 0 17 3'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M15.4619 0.045166H1.46194C1.19673 0.045166 0.942374 0.150523 0.754838 0.338059C0.567302 0.525596 0.461945 0.77995 0.461945 1.04517C0.461945 1.31038 0.567302 1.56474 0.754838 1.75227C0.942374 1.93981 1.19673 2.04517 1.46194 2.04517H15.4619C15.7272 2.04517 15.9815 1.93981 16.1691 1.75227C16.3566 1.56474 16.4619 1.31038 16.4619 1.04517C16.4619 0.77995 16.3566 0.525596 16.1691 0.338059C15.9815 0.150523 15.7272 0.045166 15.4619 0.045166Z'
                          fill='#FF460C'></path>
                      </svg>
                    </span>
                  </div>
                </button>
              ))}

            {data &&
              data.docs.slice(1, 6).map((faq, index) => (
                <button
                  key={index}
                  id='answer'
                  class='flex mb-8 pb-8 group w-full items-start justify-between border-b border-gray-100 text-left'>
                  <div class='max-w-xl pr-5'>
                    <h3 class='text-xl font-semibold text-yellowbg group-hover:text-orange-900'>
                      {faq.question}?
                    </h3>
                    <p class='hidden group-hover:block mt-3 text-lg text-white'>
                      {faq.answer}
                    </p>
                  </div>
                  <div class='pt-1'>
                    <span class='hidden group-hover:block'>
                      <svg
                        width='17'
                        height='3'
                        viewbox='0 0 17 3'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M15.4619 0.045166H1.46194C1.19673 0.045166 0.942374 0.150523 0.754838 0.338059C0.567302 0.525596 0.461945 0.77995 0.461945 1.04517C0.461945 1.31038 0.567302 1.56474 0.754838 1.75227C0.942374 1.93981 1.19673 2.04517 1.46194 2.04517H15.4619C15.7272 2.04517 15.9815 1.93981 16.1691 1.75227C16.3566 1.56474 16.4619 1.31038 16.4619 1.04517C16.4619 0.77995 16.3566 0.525596 16.1691 0.338059C15.9815 0.150523 15.7272 0.045166 15.4619 0.045166Z'
                          fill='#FF460C'></path>
                      </svg>
                    </span>
                    <span class='block group-hover:hidden'>
                      <svg
                        width='17'
                        height='16'
                        viewbox='0 0 17 16'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M15.4619 7H9.46194V1C9.46194 0.734784 9.35659 0.48043 9.16905 0.292893C8.98151 0.105357 8.72716 0 8.46194 0C8.19673 0 7.94237 0.105357 7.75484 0.292893C7.5673 0.48043 7.46194 0.734784 7.46194 1V7H1.46194C1.19673 7 0.942374 7.10536 0.754838 7.29289C0.567302 7.48043 0.461945 7.73478 0.461945 8C0.461945 8.26522 0.567302 8.51957 0.754838 8.70711C0.942374 8.89464 1.19673 9 1.46194 9H7.46194V15C7.46194 15.2652 7.5673 15.5196 7.75484 15.7071C7.94237 15.8946 8.19673 16 8.46194 16C8.72716 16 8.98151 15.8946 9.16905 15.7071C9.35659 15.5196 9.46194 15.2652 9.46194 15V9H15.4619C15.7272 9 15.9815 8.89464 16.1691 8.70711C16.3566 8.51957 16.4619 8.26522 16.4619 8C16.4619 7.73478 16.3566 7.48043 16.1691 7.29289C15.9815 7.10536 15.7272 7 15.4619 7Z'
                          fill='black'></path>
                      </svg>
                    </span>
                  </div>
                </button>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Faqs