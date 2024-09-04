import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="w-full bg-black bg-opacity-60 backdrop-filter backdrop-blur-md text-white py-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <motion.div
            className="w-full md:w-1/3 mb-6 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h3 className="text-xl font-bold mb-2">DR. B.C. ROY ENGINEERING COLLEGE</h3>
            <p className="text-sm">Durgapur, West Bengal, India</p>
          </motion.div>
          
          <motion.div
            className="w-full md:w-1/3 mb-6 md:mb-0"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="text-sm">
              <li><a href="#" className="hover:text-blue-300 transition-colors duration-300">Home</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors duration-300">About Us</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors duration-300">Academics</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors duration-300">Contact</a></li>
            </ul>
          </motion.div>
          
          <motion.div
            className="w-full md:w-1/3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h4 className="text-lg font-semibold mb-2">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-2xl hover:text-blue-300 transition-colors duration-300"><FaFacebook /></a>
              <a href="#" className="text-2xl hover:text-blue-300 transition-colors duration-300"><FaTwitter /></a>
              <a href="#" className="text-2xl hover:text-blue-300 transition-colors duration-300"><FaInstagram /></a>
              <a href="#" className="text-2xl hover:text-blue-300 transition-colors duration-300"><FaLinkedin /></a>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          className="mt-8 pt-8 border-t border-gray-600 text-center text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p>&copy; {currentYear} DR. B.C. ROY ENGINEERING COLLEGE. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
