import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const SemesterPage = () => {
  const { semester } = useParams(); // Ensure useParams is correctly used
  console.log('Current semester:', semester);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 py-12 px-4 flex items-center justify-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="max-w-4xl w-full bg-white rounded-lg shadow-2xl p-8" variants={itemVariants}>
        <motion.h1 className="text-4xl font-bold mb-6 text-center text-gray-800" variants={itemVariants}>
          Semester {semester}
        </motion.h1>
        <motion.div className="flex flex-wrap justify-center space-x-4 mb-8" variants={itemVariants}>
          <Link to={`/semester/${semester}/add-subject`} className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors duration-300 shadow-md">
            Add Subject
          </Link>
          <Link to={`/semester/${semester}/create-timetable`} className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-colors duration-300 shadow-md">
            Create Timetable
          </Link>
        </motion.div>
        <motion.div variants={itemVariants}>
        <label className="block text-lg font-medium text-gray-700 mb-2">Select Section</label>
        <div className="relative">
          <select
            className="block w-full mt-1 rounded-lg border-2 border-gray-300 bg-white px-4 py-3 pr-8 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-lg"
            onChange={(e) => {
              if (e.target.value) {
                window.location.href = `/semester/${semester}/timetable/${e.target.value}`;
              }
            }}
          >
              <option value="">Select a section</option>
              <option value="CSE1">CSE1</option>
              <option value="CSE2">CSE2</option>
              <option value="CSE3">CSE3</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SemesterPage;