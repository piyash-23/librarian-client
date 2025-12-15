import React from "react";
import { BsGithub } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { LiaLinkedin } from "react-icons/lia";
import Logo from "../Logo/Logo";
import { Link } from "react-router";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-800">
        {/* Main Footer Content */}
        <div className="relative overflow-hidden">
          {/* Diagonal Background Element */}
          <div className="absolute inset-0 bg-gray-900 transform origin-top-left -skew-y-2"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
              {/* Brand Section */}
              <div className="sm:col-span-2 lg:col-span-1">
                <Logo></Logo>
                <p className="text-sm text-gray-400 mb-6 max-w-xs">
                  A well known bookstore around Bangladesh, trusted and
                  experienced
                </p>
                <button className="bg-white text-gray-900 font-semibold px-6 py-2.5 rounded hover:bg-gray-100 transition-colors duration-200 w-full sm:w-auto">
                  Get started
                </button>
              </div>

              {/* Product */}
              <div>
                <h3 className="text-white font-semibold text-lg mb-4">
                  Company
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link className="text-gray-400 hover:text-white transition-colors duration-200">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link className="text-gray-400 hover:text-white transition-colors duration-200">
                      Our Story
                    </Link>
                  </li>
                  <li>
                    <Link className="text-gray-400 hover:text-white transition-colors duration-200">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link className="text-gray-400 hover:text-white transition-colors duration-200">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link className="text-gray-400 hover:text-white transition-colors duration-200">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Shops */}
              <div>
                <h3 className="text-white font-semibold text-lg mb-4">Shop</h3>
                <ul className="space-y-3">
                  <li>
                    <Link className="text-gray-400 hover:text-white transition-colors duration-200">
                      All Books
                    </Link>
                  </li>
                  <li>
                    <Link className="text-gray-400 hover:text-white transition-colors duration-200">
                      New Arrivals
                    </Link>
                  </li>
                  <li>
                    <Link className="text-gray-400 hover:text-white transition-colors duration-200">
                      Best Sellers
                    </Link>
                  </li>
                  <li>
                    <Link className="text-gray-400 hover:text-white transition-colors duration-200">
                      Categories
                    </Link>
                  </li>
                  <li>
                    <Link className="text-gray-400 hover:text-white transition-colors duration-200">
                      Gift Cards
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h3 className="text-white font-semibold text-lg mb-4">
                  Support
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link className="text-gray-400 hover:text-white transition-colors duration-200">
                      Customer Support
                    </Link>
                  </li>
                  <li>
                    <Link className="text-gray-400 hover:text-white transition-colors duration-200">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link className="text-gray-400 hover:text-white transition-colors duration-200">
                      Shipping Info
                    </Link>
                  </li>
                  <li>
                    <Link className="text-gray-400 hover:text-white transition-colors duration-200">
                      Return & Refunds
                    </Link>
                  </li>
                  <li>
                    <Link className="text-gray-400 hover:text-white transition-colors duration-200">
                      Track Order
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex justify-center lg:justify-end space-x-4 mt-8 lg:mt-0 lg:-mt-8">
              <a
                href="#"
                className="bg-gray-700 p-2.5 rounded hover:bg-gray-600 transition-colors duration-200"
              >
                <FaFacebook className="w-5 h-5 text-white" />
              </a>
              <a
                href="#"
                className="bg-gray-700 p-2.5 rounded hover:bg-gray-600 transition-colors duration-200"
              >
                <BsGithub className="w-5 h-5 text-white" />
              </a>
              <a
                href="#"
                className="bg-gray-700 p-2.5 rounded hover:bg-gray-600 transition-colors duration-200"
              >
                <LiaLinkedin className="w-5 h-5 text-white" />
              </a>
              <a
                href="#"
                className="bg-gray-700 p-2.5 rounded hover:bg-gray-600 transition-colors duration-200"
              >
                <FaXTwitter className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-500 text-sm">
                © 2025 All Rights Reserved
              </p>
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
                <a className="text-gray-400 hover:text-white transition-colors duration-200">
                  Privacy Policy
                </a>
                <a className="text-gray-400 hover:text-white transition-colors duration-200">
                  Terms of Use
                </a>
                <a className="text-gray-400 hover:text-white transition-colors duration-200">
                  Sales and Refunds
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Legal
                </a>
                <a className="text-gray-400 hover:text-white transition-colors duration-200">
                  Site Map
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
