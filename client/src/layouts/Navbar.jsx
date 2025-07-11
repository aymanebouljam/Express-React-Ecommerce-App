import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCart from "../pages/ShoppingCart";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const items = useSelector((state) => state.cart.items);

  return (
    <>
      <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200">
        <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between p-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="https://www.svgrepo.com/show/415710/ecommerce-price-price-tag.svg"
              className="h-8"
              alt="Shopy Logo"
            />
            <span className="text-2xl font-semibold">Shopy</span>
          </Link>

          {/* Right section (cart + auth + hamburger) */}
          <div className="flex items-center space-x-4 md:order-2">
            {/* Cart Icon */}
            <div
              onClick={() => {
                setOpen(true);
                setTimeout(() => setMenuOpen(false), 200);
              }}
              className="relative cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7 text-gray-800 hover:text-blue-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 
                  1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 
                  1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 
                  1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 
                  10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 
                  0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {items.length}
                </span>
              )}
            </div>

            {/* Auth Buttons (desktop only) */}
            <div className="hidden md:flex items-center space-x-2">
              {token ? (
                <button
                  onClick={() => navigate("/logout")}
                  className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-4 py-2"
                >
                  Logout
                </button>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/login")}
                    className="text-blue-700 hover:text-blue-500 rounded-lg text-sm px-4 py-2"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate("/register")}
                    className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-4 py-2"
                  >
                    Register
                  </button>
                </>
              )}
            </div>

            {/* Hamburger menu icon (mobile only) */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden inline-flex items-center p-2 text-gray-500 rounded-lg hover:bg-gray-100"
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          {/* Menu section (nav links + auth mobile) */}
          <div
            className={`w-full md:flex md:w-auto md:order-1 ${
              menuOpen ? "block" : "hidden"
            }`}
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3 text-blue-700 hover:underline"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/orderHistory"
                  className="block py-2 px-3 text-gray-700 hover:text-blue-700"
                >
                  Orders
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-700 hover:text-blue-700"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-700 hover:text-blue-700"
                >
                  Contact
                </a>
              </li>

              {/* Mobile-only auth buttons */}
              <li className="block md:hidden mt-4 space-y-2">
                {token ? (
                  <button
                    onClick={() => navigate("/logout")}
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-4 py-2"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => navigate("/login")}
                      className="w-full text-blue-700 hover:text-blue-500 rounded-lg text-sm px-4 py-2"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => navigate("/register")}
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-4 py-2"
                    >
                      Register
                    </button>
                  </>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <ShoppingCart open={open} setOpen={setOpen} items={items} />
    </>
  );
};

export default Navbar;
