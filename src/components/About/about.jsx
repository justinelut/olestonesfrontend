import React from 'react';
import Section from '../section/section';
import Interior from '../interiors/interior';
import Another from '../another/another';
import Do from '../whatWeDoSection/do';
import useSWR from 'swr';
import { fetcher } from '../api/api_utils';
import Team from './Team';

const About = () => {
  const { data } = useSWR('/api/globals/featured', fetcher);
  return (
    <>
      <Section data={data} />
      <Team />
      <Do />
    
      {/* <Another /> */}
      {/* <Interior /> */}
      {/* <div
        className='bg-contain bg-no-repeat bg-center'
        >
      </div> */}
    </>
  );
};

export default About;
