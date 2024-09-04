import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const AddTeacher = () => {
  const [name, setName] = useState('');
  const [shortForm, setShortForm] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/teachers', { name, shortForm });
      setMessage('Faculty details added successfully!');
      setName('');
      setShortForm('');
    } catch (error) {
      setMessage('Error adding details. Please try again.');
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-black bg-opacity-30 backdrop-filter backdrop-blur-md py-12 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-2xl mx-auto">
        <motion.h1
          className="text-3xl font-bold text-white mb-8 text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Add Faculty Details
        </motion.h1>
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="mb-6">
            <label htmlFor="name" className="block text-white text-sm font-bold mb-2">
              Faculty's Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="shortForm" className="block text-white text-sm font-bold mb-2">
              Short Form
            </label>
            <input
              type="text"
              id="shortForm"
              value={shortForm}
              onChange={(e) => setShortForm(e.target.value)}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <motion.button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add Faculty
          </motion.button>
        </motion.form>
        {message && (
          <motion.p
            className="mt-4 text-center text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {message}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default AddTeacher;
