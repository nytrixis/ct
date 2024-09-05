import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const timeSlots = [
  '10:00 - 10:50', '10:50 - 11:40', '11:40 - 12:30', '12:30 - 1:20',
  '1:20 - 2:10', '2:10 - 3:00', '3:00 - 3:50', '3:50 - 4:40', '4:40 - 5:30'
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
      className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br ${getBgColor(semester)}`}
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
          className="bg-white rounded-lg shadow-xl overflow-hidden"
        >
          <div className="grid grid-cols-[auto,0.5fr,0.5fr,repeat(9,1fr)] gap-0.5 bg-gray-200 p-0.5">
            {/* Time Slots Header */}
            <div className="bg-gray-100 p-2 font-bold">Day</div>
            <div className="bg-gray-100 p-2 text-center font-bold">CSE</div>
            <div className="bg-gray-100 p-2 text-center font-bold">X/Y</div>
            {timeSlots.map((slot, index) => (
              <div
                key={slot}
                className={`p-2 text-center font-semibold ${index === 4 ? 'bg-gray-300 text-sm' : 'bg-gray-100'}`}
              >
                {slot}
              </div>
            ))}

            {/* Days with CSE and X/Y Split */}
            {days.map(day => (
              <React.Fragment key={day}>
                {/* Vertical Day Name */}
                <div className="bg-gray-100 p-2 font-bold text-center text-xs">
                  {day.split('').map((char, i) => (
                    <span key={i} className="block">{char}</span>
                  ))}
                </div>

                {/* CSE Column (CSE1 and CSE2) */}
                <div className="bg-white p-2 border-r-2 border-gray-400 flex flex-col justify-between items-center" style={{ minHeight: '140px' }}>
                  <div className="text-xs font-semibold">CSE1</div>
                  <hr className="w-full border-t border-gray-400" />
                  <div className="text-xs font-semibold">CSE2</div>
                </div>

                {/* X/Y Column for CSE1 and CSE2 */}
                <div className="bg-white p-2 border-r-2 border-gray-400 flex flex-col justify-between items-center" style={{ minHeight: '140px' }}>
                  <div className="text-xs text-center">X</div>
                  <div className="text-xs text-center">Y</div>
                  <div className="text-xs text-center">X</div>
                  <div className="text-xs text-center">Y</div>
                </div>

                {/* Time Slot Cells for CSE1-X, CSE1-Y, CSE2-X, CSE2-Y */}
                {timeSlots.map((_, index) => (
                  <div
                    key={index}
                    className={`bg-white p-2 border-r-2 border-gray-400 flex flex-col justify-between items-center`}
                    style={{ minHeight: '140px' }}
                  >
                    {/* CSE1-X */}
                    <div className="text-xs"></div>
                    <hr className="w-full border-t border-gray-400" />
                    {/* CSE2-Y */}
                    <div className="text-xs"></div>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SemesterTimetable;
