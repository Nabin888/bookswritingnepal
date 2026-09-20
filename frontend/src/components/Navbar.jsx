import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const ShopLinkClass =
  'transition-colors duration-200 border-b-2 border-transparent pb-1 hover:text-indigo-600 hover:border-indigo-600 align-middle';

const Navbar = ({ scrolled }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isAbout = location.pathname === '/about';

  // Navbar height to offset scroll (adjust if needed)
  const navbarHeight = 64;

  // Custom scroll function for smooth scroll with offset
  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -navbarHeight;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
  };

  // HashLinks or anchors for menu
  const HomeLink = !isHome ? (
    <HashLink
      smooth
      to="/#home"
      scroll={scrollWithOffset}
      className="transition-colors duration-200 border-b-2 border-transparent pb-1 hover:text-indigo-600 hover:border-indigo-600 align-middle"
    >
      Home
    </HashLink>
  ) : (
    <a
      href="#home"
      className="transition-colors duration-200 border-b-2 border-transparent pb-1 hover:text-indigo-600 hover:border-indigo-600 align-middle"
    >
      Home
    </a>
  );

  const VideoLink = !isHome ? (
    <HashLink
      smooth
      to="/#about"
      scroll={scrollWithOffset}
      className="transition-colors duration-200 border-b-2 border-transparent pb-1 hover:text-indigo-600 hover:border-indigo-600 align-middle"
    >
      Video
    </HashLink>
  ) : (
    <a
      href="#about"
      className="transition-colors duration-200 border-b-2 border-transparent pb-1 hover:text-indigo-600 hover:border-indigo-600 align-middle"
    >
      Video
    </a>
  );

  const BooksLink = !isHome ? (
    <HashLink
      smooth
      to="/#projects"
      scroll={scrollWithOffset}
      className="transition-colors duration-200 border-b-2 border-transparent pb-1 hover:text-indigo-600 hover:border-indigo-600 align-middle"
    >
      Books
    </HashLink>
  ) : (
    <a
      href="#projects"
      className="transition-colors duration-200 border-b-2 border-transparent pb-1 hover:text-indigo-600 hover:border-indigo-600 align-middle"
    >
      Books
    </a>
  );

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-white'
      }`}
    >
      <ul className="flex flex-wrap justify-end items-center gap-4 md:gap-6 py-3.5 font-semibold text-purple-900 max-w-7xl mx-auto px-4">
        <li>{HomeLink}</li>
        <li>{VideoLink}</li>
        <li>{BooksLink}</li>
        <li>
          <Link to="/shop" className={ShopLinkClass}>
            Shop
          </Link>
        </li>
        <li>
          <HashLink
            to="/contact#top"
            scroll={scrollWithOffset}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 text-white shadow transition-all duration-200 hover:scale-105 hover:from-indigo-600 hover:to-purple-600 text-base"
          >
            Register Now
            <span className="ml-1 text-lg">&#8594;</span>
          </HashLink>
        </li>
        <li>
          <Link
            to="/about"
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full font-semibold text-base transition-all duration-200 hover:scale-105 shadow-sm ${
              isAbout
                ? 'bg-purple-600 text-white ring-2 ring-purple-400/50'
                : 'border-2 border-purple-600 text-purple-700 hover:bg-purple-600 hover:text-white'
            }`}
          >
            About Us
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
