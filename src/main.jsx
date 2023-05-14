import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './components/nav/nav';
import Footer from './components/footer/footer';
import Blog from './components/blog';
import SingleProduct from './components/purchase/singleproduct';
import Products from './components/purchase/products';
import Checkout from './components/purchase/checkout';
import About from './components/About/about';
import Contact from './components/contacts/contact';
import Login from './components/auth/login';
import Signup from './components/auth/signup';
import Services from './components/whatWeDoSection/do';
import Projects from './components/projects/projects';
import Review from './components/reviews/reviews';
import { AuthProvider } from 'react-auth-kit';
import SingleBlogPost from './components/blog/post';
import Studio from './components/studio/studio';
import OrderSuccess from './components/purchase/ordersuccess';
import { HelmetProvider } from 'react-helmet-async';
import ProjectDescription from './components/projects/ProjectDescription';
import ServiceDescription from './components/whatWeDoSection/servicesdescription';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider
      authType='cookie'
      authName='_auth'
      cookieDomain={window.location.hostname}
      cookieSecure={true}>
      <HelmetProvider>
        <BrowserRouter>
          <Routes>
            <Route
              exact
              path='/'
              element={<App />}
            />
            <Route
              exact
              path='/blog'
              element={
                <>
                  <Nav />
                  <Blog />
                </>
              }
            />
            <Route
              exact
              path='/blog/:slug'
              element={
                <>
                  <Nav />
                  <SingleBlogPost />
                </>
              }
            />
            <Route
              exact
              path='/login'
              element={
                <>
                  <Nav />
                  <Login />
                </>
              }
            />
            <Route
              exact
              path='/signup'
              element={
                <>
                  <Nav />
                  <Signup />
                </>
              }
            />
            <Route
              exact
              path='/services'
              element={
                <>
                  <Nav />
                  <Services />
                </>
              }
            />
            <Route
              exact
              path='/services/:slug'
              element={
                <>
                  <Nav />
                  <ServiceDescription />
                </>
              }
            />
            <Route
              exact
              path='/projects'
              element={
                <>
                  <Nav />
                  <Projects />
                </>
              }
            />
            <Route
              exact
              path='/projects/:slug'
              element={
                <>
                  <Nav />
                  <ProjectDescription />
                </>
              }
            />
            <Route
              exact
              path='/about'
              element={
                <>
                  <Nav />
                  <About />
                </>
              }
            />
            <Route
              exact
              path='/contact'
              element={
                <>
                  <Nav />
                  <Contact />
                </>
              }
            />
            <Route
              exact
              path='/products'
              element={
                <>
                  <Nav />
                  <Products />
                </>
              }
            />
            <Route
              exact
              path='/products/:pid'
              element={
                <>
                  <Nav />
                  <SingleProduct />
                </>
              }
            />
            <Route
              exact
              path='/products/:pid/:checkout'
              element={
                <>
                  <Nav />
                  <Checkout />
                </>
              }
            />
            <Route
              exact
              path='/products/:pid/:checkout/ordersuccess'
              element={
                <>
                  <Nav />
                  <OrderSuccess />
                </>
              }
            />
            <Route
              exact
              path='/review'
              element={
                <>
                  <Nav />
                  <Review />
                </>
              }
            />
            <Route
              exact
              path='/gallery'
              element={
                <>
                  <Nav />
                  <Studio />
                </>
              }
            />

            <Route
              exact
              path='/purchase/single'
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </HelmetProvider>
    </AuthProvider>
  </React.StrictMode>
);
