import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Banner = () => {
  const [oddSemesterOpen, setOddSemesterOpen] = useState(false);
  const [evenSemesterOpen, setEvenSemesterOpen] = useState(false);
  const dropdownRef = useRef(null);

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOddSemesterOpen(false);
        setEvenSemesterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <motion.div
      className="relative bg-black bg-opacity-10 top-0 backdrop-filter backdrop-blur-md py-0 px-6 flex flex-col items-start font-montserrat z-30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center">
        <img
          src={logo}
          alt="College Logo"
          className="w-[200px] h-[200px] mr-10"
        />
        <div className="text-gray-100 flex flex-col justify-center">
          <motion.h1
            className="text-3xl font-bold leading-tight"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            DR. B.C. ROY ENGINEERING COLLEGE, DURGAPUR
          </motion.h1>
          <motion.p
            className="text-xl font-semibold mt-1"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            DEDICATED TO "QUALITY EDUCATION"
          </motion.p>
          <motion.p
            className="text-lg mt-1"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            AFFILIATED TO MAKAUT | APPROVED BY AICTE | *NBA ACCREDITED | NAAC ACCREDITED
          </motion.p>
          <motion.p
            className="text-lg mt-1 mb-0"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            An Autonomous Institute Affiliated to MAKAUT, WEST BENGAL
          </motion.p>
        </div>
      </div>
      
      <div className="flex justify-between items-center w-full mb-3" ref={dropdownRef}>
        <div className="flex space-x-2.5 z-30">
          <motion.div className="relative" variants={buttonVariants} initial="hidden" animate="visible">
            <button
              onClick={() => {
                setOddSemesterOpen(!oddSemesterOpen);
                setEvenSemesterOpen(false);
              }}
              className="bg-gray-100 text-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-gray-100 transition-colors duration-300"
            >
              Odd Semester
            </button>
            {oddSemesterOpen && (
              <motion.div 
                className="absolute top-full left-0 mt-1 bg-white shadow-md rounded"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {['1st', '3rd', '5th', '7th'].map((sem, index) => (
                  <Link 
                    key={sem} 
                    to={`/semester/${2 * index + 1}`} 
                    className="block px-4 py-2 text-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    {sem} Semester
                  </Link>
                ))}

              </motion.div>
            )}
          </motion.div>
          <motion.div className="relative" variants={buttonVariants} initial="hidden" animate="visible">
            <button
              onClick={() => {
                setEvenSemesterOpen(!evenSemesterOpen);
                setOddSemesterOpen(false);
              }}
              className="bg-gray-100 z-30 text-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-gray-100 transition-colors duration-300"
            >
              Even Semester
            </button>
            {evenSemesterOpen && (
              <motion.div 
                className="absolute top-full left-0 mt-1 bg-white shadow-md rounded z-30"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {['2nd', '4th', '6th', '8th'].map((sem, index) => (
                  <Link 
                    key={sem} 
                    to={`/semester/${2 * index + 2}`} 
                    className="block px-4 py-2 text-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    {sem} Semester
                  </Link>
                ))}

              </motion.div>
            )}
          </motion.div>
          <motion.div variants={buttonVariants} initial="hidden" animate="visible">
            <Link to="/add-teacher" className="bg-gray-100 text-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-gray-100 transition-colors duration-300 inline-block">
              Add Teacher
            </Link>
          </motion.div>
          <motion.div variants={buttonVariants} initial="hidden" animate="visible">
            <Link to="/add-room" className="bg-gray-100 text-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-gray-100 transition-colors duration-300 inline-block">
              Add Room
            </Link>
          </motion.div>
          <motion.div variants={buttonVariants} initial="hidden" animate="visible">
            <Link to="/add-lab" className="bg-gray-100 text-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-gray-100 transition-colors duration-300 inline-block">
              Add Lab
            </Link>
          </motion.div>
        </div>
        <div className="flex space-x-2.5">
          <Link to="/auth">
          <motion.button
            className="bg-green-500 text-gray-100 px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
          >
            Sign Up
          </motion.button>
          </Link>
          <Link to="/auth">
          <motion.button
            className="bg-green-500 text-gray-100 px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
          >
            Log In
          </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Banner;