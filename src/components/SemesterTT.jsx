import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const timeSlots = [
  '10:00 - 10:50', '10:50 - 11:40', '11:40 - 12:30', '12:30 - 1:20',
  '1:20 - 2:10', '2:10 - 3:00', '3:00 - 3:50', '3:50 - 4:40', '4:40 - 5:30'
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const SemesterTT = () => {
  const { semester, section } = useParams();
  const [timetableEntries, setTimetableEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTimetableEntries = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/timetable/${semester}`);
        console.log('Fetched Timetable Entries:', response.data);
        setTimetableEntries(response.data);
      } catch (error) {
        console.error('Error fetching timetable entries:', error);
        setError('Error fetching timetable entries. Please try again.');
      }
    };

    fetchTimetableEntries();
  }, [semester]);

  const isLunchBreak = (slot) => slot === '1:20 - 2:10';

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

  const getEntryForCell = (day, timeSlot, batch, subSection) => {
    return timetableEntries.find(entry =>
      entry.day === day &&
      entry.timeSlot === timeSlot &&
      entry.batch === batch &&
      (entry.subSection === subSection || entry.subSection === 'both')
    );
  };

  const renderCell = (day, timeSlot, batch, subSection) => {
    const entry = getEntryForCell(day, timeSlot, batch, subSection);
    if (!entry) return <div className="text-xs">Data not available</div>;

    const { subject, faculty, room } = entry;
    return (
      <div className="text-xs">
        <div>{subject?.name || 'N/A'}</div>
        <div>{subject?.code || 'N/A'}</div>
        <div>{faculty?.shortForm || 'N/A'}</div>
        <div>{typeof room === 'string' ? room : room?.name || 'N/A'}</div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br ${getBgColor(semester)}`}
    >
      <h1 className="text-3xl font-bold ml-20 mb-6 text-white">Timetable for Semester {semester} - Section {section}</h1>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex justify-between items-center mb-8"
        >
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
          <div className="grid grid-cols-[auto,0.5fr,repeat(9,1fr)] gap-0.5 bg-gray-200 p-0.5">
            <div className="bg-gray-100 p-2 font-bold">Day</div>
            <div className="bg-gray-100 p-2 text-center font-bold">X / Y</div>
            {timeSlots.map(slot => (
              <div 
                key={slot} 
                className={`bg-gray-100 p-2 text-center font-semibold ${isLunchBreak(slot) ? 'bg-gray-300' : ''}`}
              >
                {slot}
              </div>
            ))}
            {days.map(day => (
              <React.Fragment key={day}>
                <div className="bg-gray-100 p-2 font-bold text-center flex items-center justify-center h-full">
                <div className="writing-vertical-lr transform">
                  {day.split('').map((char, i) => (
                    <span key={i} className="block">{char}</span>
                  ))}
                  </div>
                </div>
                <div className="bg-white p-2 border-r-2 border-gray-400 h-[235px] flex flex-col">
                  <div className="border-b-2 border-gray-300 p-1 flex-grow text-center flex items-center justify-center">
                    <div className="text-xs font-semibold">X</div>
                  </div>
                  <div className="p-1 flex-grow text-center flex items-center justify-center">
                    <div className="text-xs font-semibold">Y</div>
                  </div>
                </div>
                {timeSlots.map((slot) => (
                  <div
                    key={slot}
                    className={`bg-white p-2 border-r-2 border-gray-400 h-[235px] flex flex-col ${
                      isLunchBreak(slot) ? 'bg-gray-300' : ''
                    }`}
                  >
                    <div className="flex-1 border-b border-gray-300">
                      {renderCell(day, slot, section, 'X')}
                    </div>
                    <div className="flex-1">
                      {renderCell(day, slot, section, 'Y')}
                    </div>
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

export default SemesterTT;