import { assets } from "@/utils/constant";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="">
      <div className="border-t bg-gradient-to-b from-black to-slate-800 border-t-gray-200 py-8">
        <div className="container max-w-7xl mx-auto  px-4">
          <div className="grid py-6 gap-4 md:gap-10 md:py-12 grid-cols-1 md:grid-cols-3">
            <div className="border-r border-slate-800">
              <div>
                <img className="invert-100" src={assets.logo} alt="logo" />
                <div className="my-4">
                  <h5 className="text-slate-400 font-semibold">Call Us</h5>
                  <a
                    href="tel:+91 8936811660"
                    className="text-sky-600 cursor-pointer "
                  >
                    +91 8936811660
                  </a>
                  <a href="js:void(0);" className="text-slate-400 block mt-2">
                    329 Queensberry Street, North Melbourne VIC 3051, Australia.
                  </a>
                  <a
                    href="mailto:sunnyrajkcb@gmail.com"
                    className="text-sky-600 block mt-2"
                  >
                    sunnyrajkcb@gmail.com
                  </a>
                </div>
              </div>
            </div>
            <div className="border-r border-slate-800 md:flex justify-center ">
              <div>
                <h5 className="text-slate-200 font-semibold text-2xl">
                  Quick Links
                </h5>
                <div className="mt-8 md:ml-4 ml-0">
                  <ul className="flex flex-col space-y-3">
                    <Link
                      to="/"
                      className="text-sky-300 hover:text-white  transition-all duration-300 "
                    >
                      Home
                    </Link>
                    <Link
                      to="js:void(0)"
                      className="text-sky-300 hover:text-white transition-all duration-300 "
                    >
                      About
                    </Link>
                    <Link
                      to="/"
                      className="text-sky-300 hover:text-white transition-all duration-300 "
                    >
                      Jobs
                    </Link>
                    <Link
                      to="/signup"
                      className="text-sky-300 hover:text-white transition-all duration-300 "
                    >
                      Signup
                    </Link>
                  </ul>
                </div>
              </div>
            </div>
            <div className=" md:flex justify-center ">
              <div>
                <h5 className="text-slate-200 font-semibold text-2xl">
                  Helpful Resources
                </h5>
                <div className="mt-8 ml-0 md:ml-4">
                  <ul className="flex flex-col space-y-3">
                    <Link
                      to="js:void(0)"
                      className="text-sky-300 hover:text-white  transition-all duration-300 "
                    >
                      Site Map
                    </Link>
                    <Link
                      to="js:void(0)"
                      className="text-sky-300 hover:text-white transition-all duration-300 "
                    >
                      Term Of Use
                    </Link>
                    <Link
                      to="js:void(0)"
                      className="text-sky-300 hover:text-white transition-all duration-300 "
                    >
                      Privacy Policy
                    </Link>
                    <Link
                      to="js:void(0)"
                      className="text-sky-300 hover:text-white transition-all duration-300 "
                    >
                      Security Center
                    </Link>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black py-3">
        <div>
          <p className="text-center text-slate-300">
            @Copyright reserved 2025 Superio
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
