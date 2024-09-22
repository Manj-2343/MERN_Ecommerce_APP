import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaPinterest,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="grid grid-cols-2 gap-8 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Shop
                </h3>
                <ul className="mt-4 space-y-4">
                  {["New Arrivals", "Bestsellers", "Sale", "Collections"].map(
                    (item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="text-base text-gray-300 hover:text-white"
                        >
                          {item}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Support
                </h3>
                <ul className="mt-4 space-y-4">
                  {["FAQ", "Shipping", "Returns", "Contact Us"].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-base text-gray-300 hover:text-white"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Company
                </h3>
                <ul className="mt-4 space-y-4">
                  {["About Us", "Careers", "Press", "Affiliates"].map(
                    (item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="text-base text-gray-300 hover:text-white"
                        >
                          {item}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Legal
                </h3>
                <ul className="mt-4 space-y-4">
                  {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                    (item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="text-base text-gray-300 hover:text-white"
                        >
                          {item}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 xl:mt-0">
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Subscribe to our newsletter
            </h3>
            <p className="mt-4 text-base text-gray-300">
              Get the latest updates, sales & offers.
            </p>
            <form className="mt-4 sm:flex sm:max-w-md">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                name="email-address"
                id="email-address"
                autoComplete="email"
                required
                className="appearance-none min-w-0 w-full bg-white border border-transparent rounded-md py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white focus:border-white focus:placeholder-gray-400"
                placeholder="Enter your email"
              />
              <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-l from-orange-600 to-red-600 hover:bg-gradient-to-r from-orange-600 to-red-600 text-white transition-colors duration-300 text-white border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-base font-medium  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            {[FaFacebook, FaTwitter, FaInstagram, FaPinterest].map(
              (Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-gray-300"
                >
                  <span className="sr-only">Social Media</span>
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </a>
              )
            )}
          </div>
          <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
            &copy; 2024@NūtanaEmporium.All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
