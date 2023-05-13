import React from 'react'
import useSWR from 'swr';
import { fetcher } from '../api/api_utils';

function Team() {
  const { data } = useSWR('/api/olestonesTeam', fetcher);
 
  return (
    <section class='relative py-20 md:py-32 overflow-hidden bg-slate-800'>
      <div class='container px-4 mx-auto'>
        <div class='max-w-7xl mx-auto'>
          <div class='max-w-2xl mx-auto mb-18 text-center'>
            <h1 class='font-heading text-5xl xs:text-6xl md:text-7xl font-bold text-white mb-8'>
              <span>Amazing </span>
              <span class='font-serif italic'>Team</span>
            </h1>
            <p class='text-lg text-yellowbg'>
              We're a Team of fully-certified Professional Builders & Movers,
              Who Tackle everything from complex large projects to smaller-scale
              jobs. Fueled by our commitment to excellence, we go the extra mile
              to make sure clients are completely satisfied with our work. We
              are committed to providing our Customers with exceptional services
              while offering our employees the best training and an excellent
              working environment in which they can excel. 'Ole Stones Builders
              & Logistics' commits itself to quality and excellence in terms of
              its workmanship and performance.
            </p>
          </div>

          {data &&
            data.docs.map((team, index) => (
              <div
                key={index}
                class='flex flex-wrap -mx-4 -mb-8 mt-10'>
                <div class='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-8'>
                  <div class='max-w-xs md:max-w-none mx-auto h-full pt-3 px-3 pb-5 bg-white'>
                    <img
                      class='block w-full mb-4 h-64 object-cover'
                      src={team.image.url}
                      alt=''
                    />
                    <div class='text-center'>
                      <h5 class='text-xl font-bold'>{team.fullnames}</h5>
                      <span class='text-sm font-bold text-gray-400'>
                        {team.title}
                      </span>
                      <p>{team.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default Team