import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const timeSlots = [
  '10:00 - 10:50', '10:50 - 11:40', '11:40 - 12:30', '12:30 - 1:20',
  '1:20 - 2:10 (Recess)', '2:10 - 3:00', '3:00 - 3:50', '3:50 - 4:40', '4:40 - 5:30'
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const SemesterTimetable = ({ semester }) => {
  const getBgColor = (semester) => {
    const colors = {
      1: 'from-blue-400 to-purple-500',
      2: 'from-green-400 to-blue-500',
      3: 'from-yellow-400 to-red-500',
      4: 'from-pink-400 to-purple-500',
      5: 'from-indigo-400 to-blue-500',
      6: 'from-red-400 to-yellow-500',
      7: 'from-purple-400 to-pink-500',
      8: 'from-green-400 to-yellow-500',
    };
    return colors[semester] || 'from-gray-400 to-gray-600';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-3xl font-bold text-white">Semester {semester} Timetable</h1>
          <div className="space-x-4">
            <Link
              to={`/semester/${semester}/add-subject`}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
            >
              Add Subject
            </Link>
            <Link
              to={`/semester/${semester}/create-timetable`}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300"
            >
              Create Timetable
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className={`bg-gradient-to-br ${getBgColor(semester)} bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-xl overflow-hidden`}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-white">Time / Day</th>
                  {days.map(day => (
                    <th key={day} className="px-4 py-2 text-white">{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((slot, index) => (
                  <tr key={slot} className={index % 2 === 0 ? 'bg-white bg-opacity-10' : ''}>
                    <td className="px-4 py-2 text-white font-medium">{slot}</td>
                    {days.map(day => (
                      <td key={`${day}-${slot}`} className="px-4 py-2 text-white text-center">
                        {/* This cell will be populated with subject data */}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SemesterTimetable;
