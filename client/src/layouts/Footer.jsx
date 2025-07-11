import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white rounded-lg shadow-sm mx-4 mb-4 mt-auto">
      <div className="w-full max-w-screen-xl mx-auto px-4 py-6 md:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center justify-center sm:justify-start space-x-2"
          >
            <img
              src="https://www.svgrepo.com/show/477280/shopping-cart-17.svg"
              className="h-8"
              alt="Shopy Logo"
            />
            <span className="text-2xl font-semibold">Shopy</span>
          </Link>

          {/* Footer Links */}
          <ul className="flex flex-wrap justify-center sm:justify-end items-center gap-4 text-sm font-medium text-gray-500">
            <li>
              <a href="#" className="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />

        <span className="block text-sm text-gray-500 text-center">
          © 2025{" "}
          <a href="#" className="hover:underline">
            Shopy™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
