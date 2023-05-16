import React from 'react';
import { fetcher } from '../api/api_utils';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { useAnimate, useInView, } from 'framer-motion';
import './projects.css'


const ProjectDescription = () => {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);
  const { slug } = useParams();
  const { data } = useSWR(`/api/projects?where[slug][equals]=${slug}`, fetcher);

  return (
    <section
      ref={scope}
      class='py-24 bg-gray-900 bg-blueGray-50 overflow-hidden'>
      <div class='container px-4 mx-auto'>
        <h2 class='mb-5 text-4xl md:text-5xl text-yellowbg xl:text-6xl text-center font-bold font-heading font-heading tracking-px-n leading-none'>
          {data && data.docs[0].title}
        </h2>
        <p class='mb-16 text-lg text-white text-center font-medium leading-normal md:max-w-lg mx-auto'>
          {data && data.docs[0].description}
        </p>
      </div>
      <div
        id='gallery'
        class='w-full px-10 mx-auto'>
        {data &&
          data.docs[0].descriptor.map((image, index) => (
            <>
            {/* <div className={`text-3xl text-white py-${index+1}`}>{image.description}</div> */}
              <img
                id='photos'
                key={index}
                src={image.image.url}
                alt=''
                className='w-full'
              />
            </>
          ))}
      </div>
    </section>
  );
};

export default ProjectDescription;
