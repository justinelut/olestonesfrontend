import { useState } from 'react';
import { useAuthUser, useIsAuthenticated, useSignOut } from 'react-auth-kit';
import { Link } from 'react-router-dom';
import UserAccountDetails from './UserAccountDetails';

const Nav = () => {
  const [navbar, setNavbar] = useState(false);
  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser();
  const signOut = useSignOut();

  return (
    <div className=''>
      <nav className='w-full shadow bg-yellowbg'>
        <div className='justify-between px-4 mx-auto md:items-center md:flex'>
          <div>
            <div className='flex items-center justify-between py-3 mr-2 md:py-5 md:block'>
              <Link to='/'>
                <h1 className='font-semibold text-base'>
                  Ole Stones <span className='text-white'>Builders & Logistics</span>
                </h1>
              </Link>
              <div className='md:hidden'>
                <button
                  className='p-2 text-black rounded-md outline-none focus:border-white focus:border'
                  onClick={() => setNavbar(!navbar)}>
                  {navbar ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-6 h-6 text-black'
                      viewBox='0 0 20 20'
                      fill='currentColor'>
                      <path
                        fillRule='evenodd'
                        d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                        clipRule='evenodd'
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-6 h-6 text-black'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth={2}>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M4 6h16M4 12h16M4 18h16'
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? 'block' : 'hidden'
              }`}>
              <ul className='items-center justify-center max-md:space-y-4 space-y-4 md:flex md:space-x-8 md:space-y-0 max-md:flex max-md:flex-col'>
                <li className='text-black font-medium text-sm tracking-wider transition border-yellowbg  hover:border-b hover:scale-110 duration-150'>
                  <Link to='/about'>About</Link>
                </li>
                <li className='text-black font-medium text-sm tracking-wider transition border-yellowbg  hover:border-b hover:scale-110 duration-150'>
                  <Link to='/services'>Services</Link>
                </li>
                <li className='text-black font-medium text-sm tracking-wider transition border-yellowbg  hover:border-b hover:scale-110 duration-150'>
                  <Link to='/projects'>Projects</Link>
                </li>
                <li className='text-black font-medium text-sm tracking-wider transition border-yellowbg  hover:border-b hover:scale-110 duration-150'>
                  <Link to='/blog'>Blog</Link>
                </li>
                <li className='text-black font-medium text-sm tracking-wider transition border-yellowbg  hover:border-b hover:scale-110 duration-150'>
                  <Link to='/products'>Products</Link>
                </li>
                <li className='text-black font-medium text-sm tracking-wider transition border-yellowbg  hover:border-b hover:scale-110 duration-150'>
                  <Link to='/gallery'>Gallery</Link>
                </li>
                {/* <li className='text-charcoal font-medium text-lg tracking-wider transition border-[#eab308]  hover:border-b hover:scale-110 duration-150'>
                  <Link to='/studio'>Gallery</Link>
                </li> */}
                <li className='text-black font-medium text-sm tracking-wider transition border-yellowbg  hover:border-b hover:scale-110 duration-150'>
                  <Link to='/contact'>Contact Us</Link>
                </li>
              </ul>
              <div className='mt-6 mb-3 md:hidden lg:hidden xl:hidden'>
                {isAuthenticated() ? (
                  <button
                    onClick={signOut}
                    className='tracking-wide text-center rounded-md border-2 border-white px-8 mx-2 py-2 text-base font-medium text-black transition hover:bg-charcoal hover:text-white focus:outline-none focus:ring'>
                    Logout
                  </button>
                ) : (
                  <>
                    <Link
                      to='/login'
                      className='text-center rounded-md border-2 border-white px-8 mx-2 py-2 text-base font-medium text-white transition hover:bg-black hover:text-white focus:outline-none focus:ring'>
                      Login
                    </Link>
                    <Link
                      to='/signup'
                      className='text-center rounded-md border-2 border-white px-8 mx-2 py-2 text-base font-medium text-white transition hover:bg-black hover:text-white focus:outline-none focus:ring'>
                      SignUp
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className='hidden space-x-1 md:flex'>
            {isAuthenticated() ? (
              <button
                onClick={signOut}
                className='tracking-wide text-center rounded-md border-2 border-white px-8 mx-2 py-2 text-base font-medium text-white transition hover:bg-black hover:text-white focus:outline-none focus:ring'>
                Logout
              </button>
            ) : (
              <>
                <Link
                  to='/login'
                  className='text-center rounded-md border-2 border-white px-8 mx-2 py-2 text-base font-medium text-white transition hover:bg-black hover:text-white focus:outline-none focus:ring'>
                  Login
                </Link>
                <Link
                  to='/signup'
                  className='text-center rounded-md border-2 border-white px-8 mx-2 py-2 text-base font-medium text-white transition hover:bg-black hover:text-white focus:outline-none focus:ring'>
                  SignUp
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      {isAuthenticated() ? <UserAccountDetails user={auth()} /> : ''}
    </div>
  );
};

export default Nav;
