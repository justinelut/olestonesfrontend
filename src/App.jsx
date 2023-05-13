import React, { createContext, useState, useContext } from 'react';
// import { Link } from 'react-router-dom';
import './App.css';
// import About from './components/About/about';
// import Nav from './components/nav/nav';
import { Outlet } from 'react-router-dom';

// import Project from './components/projects/projects';
// import Blog from './components/blogSection/blog';
// import Studio from './components/studio/studio';
import Reviews from './components/testimonials/reviews';
// import Footer from './components/footer/footer';
// import bg2 from './Rectangle25.png';
import Contact from './components/contacts/contact';
// import { Featured } from './components/front/features';
// import { Whatwedo } from './components/front/whatwedo';
import Projects from './components/front/projects';
import { Gallery } from './components/front/gallery';
import Featured2 from './components/front/feature2';
import Aboutus from './components/front/aboutus';
// import Services from './components/front/projects';
import Blogs from './components/front/blog';
import Faqs from './components/front/faqs';
export const DataContext = createContext();

function App() {
  // const [shouldAnimate, setShouldAnimate] = useState(0);

  // window.addEventListener('scroll', handleScroll);

  // function handleScroll() {
  //   const scrollPos = window.scrollY;
  //   setShouldAnimate(scrollPos);
  //   window.removeEventListener('scroll', handleScroll);
  // }

  return (
    <>
      <Outlet />
      {/* <About /> */}
      <Featured2 />
      <Aboutus />
      <Projects />
      {/* <Featured />
      <Whatwedo />
      <Projects />
      <Gallery /> */}
      <div
      // style={{ backgroundImage: `url(${bg2})` }}
      // className='bg-cover  bg-no-repeat bg-center'
      >
        <Blogs />
        <Gallery />
      </div>
      <Faqs />
      <Reviews />
      <Contact />
    </>
  );
}

export default App;
