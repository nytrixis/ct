import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import html2canvas from 'html2canvas';

const timeSlots = [
  '10:00 - 10:50', '10:50 - 11:40', '11:40 - 12:30', '12:30 - 1:20',
  '1:20 - 2:10', '2:10 - 3:00', '3:00 - 3:50', '3:50 - 4:40', '4:40 - 5:30'
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];





const SemesterTT = () => {
  const navigate = useNavigate();
  const { semester, section } = useParams();
  const [timetableEntries, setTimetableEntries] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const cellClassName = `bg-white p-2 border-r-2 border-gray-400 ${
    isEditing ? 'hover:bg-blue-50 cursor-pointer' : ''
  }`;

  useEffect(() => {
    const fetchTimetableEntries = async () => {
      try {
        const [timetableRes, facultiesRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/timetable/${semester}`),
          axios.get('http://localhost:5000/api/teachers')
        ]);
        console.log('Fetched Timetable Entries:', timetableRes.data);
        console.log('Fetched Faculties:', facultiesRes.data);
        setTimetableEntries(timetableRes.data);
        setFaculties(facultiesRes.data);
      } catch (error) {
        console.error('Error fetching timetable entries:', error);
        setError('Error fetching timetable entries. Please try again.');
      }
    };

    fetchTimetableEntries();
  }, [semester]);

  const handleCellUpdate = (day, timeSlot, batch, subSection) => {
    const existingEntry = getEntryForCell(day, timeSlot, batch, subSection);
    navigate(`/semester/${semester}/create-timetable`, {
      state: {
        day,
        timeSlot,
        batch,
        subSection,
        existingEntry,
        isUpdate: true
      }
    });
  };

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

  // Add this function to handle printing
  const handlePrint = () => {
    const timetableElement = document.getElementById(`timetable-${semester}-${section}`);
    
    html2canvas(timetableElement).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const printWindow = window.open('', '', 'height=600,width=800');
      
      printWindow.document.write(`
        <html>
          <head>
            <title>Semester ${semester} Section ${section} Timetable</title>
            <style>
              body { margin: 0; display: flex; justify-content: center; }
              img { max-width: 100%; height: auto; }
            </style>
          </head>
          <body>
            <img src="${imgData}" alt="Timetable">
          </body>
        </html>
      `);
      
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => printWindow.print(), 500);
    });
  };
  


  const getEntryForCell = (day, timeSlot, batch, subSection) => {
    return timetableEntries.find(entry =>
      entry.day === day &&
      entry.timeSlot === timeSlot &&
      entry.batch === batch &&
      (entry.subSection === subSection || entry.subSection === 'both')
    );
  };

  const getFacultyShortForm = (facultyObj) => {
    return facultyObj.shortForm || 'N/A';
  };

  const renderCell = (day, timeSlot, batch, subSection) => {
    const entry = getEntryForCell(day, timeSlot, batch, subSection);
    const cellContent = !entry ? (
      <div className="text-xs"> </div>
    ) : (
      <div className="text-xs">
        <div className='font-semibold'>{entry.subject?.name || 'N/A'}</div>
        <div>{entry.subject?.code || 'N/A'}</div>
        <div>
          ({Array.isArray(entry.faculty) 
            ? entry.faculty.map(f => getFacultyShortForm(f)).join('+')
            : getFacultyShortForm(entry.faculty)}) 
          ({typeof entry.room === 'string' ? entry.room : entry.room?.name || 'N/A'})
        </div>
      </div>
    );

    return isEditing ? (
      <div 
        onClick={() => handleCellUpdate(day, timeSlot, batch, subSection)}
        className="cursor-pointer hover:bg-blue-100 transition-colors duration-200 p-1 rounded"
      >
        {cellContent}
      </div>
    ) : cellContent;
  };


  const getMergedCells = (day, batch, subSection) => {
    let mergedCells = [];
    let currentMerge = null;

    timeSlots.forEach((slot, index) => {
      const entry = getEntryForCell(day, slot, batch, subSection);
      if (!entry || entry.subject === 'Data not available') {
        if (currentMerge) {
          mergedCells.push(currentMerge);
          currentMerge = null;
        }
        mergedCells.push({ start: index, end: index, entry: null });
      } else {
        if (currentMerge &&
            currentMerge.entry.subject._id === entry.subject._id &&
            currentMerge.entry.faculty.toString() === entry.faculty.toString() &&
            currentMerge.entry.room === entry.room) {
          currentMerge.end = index;
        } else {
          if (currentMerge) {
            mergedCells.push(currentMerge);
          }
          currentMerge = { start: index, end: index, entry };
        }
      }
    });

    if (currentMerge) {
      mergedCells.push(currentMerge);
    }

    return mergedCells;
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
            <button
      onClick={() => setIsEditing(!isEditing)}
      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors duration-300"
    >
      {isEditing ? 'Cancel Edit' : 'Edit Timetable'}
    </button>
            <button
              onClick={handlePrint}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors duration-300"
            >
              Print Timetable
            </button>
          </div>
        </motion.div>

        <motion.div
          id={`timetable-${semester}-${section}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white rounded-lg shadow-xl overflow-hidden"
        >
          <div className="grid grid-cols-[auto,0.5fr,repeat(9,1fr)] gap-0.5 bg-gray-300 p-0.5">
            <div className="bg-blue-100 p-2 font-bold">Day</div>
            <div className="bg-blue-100 p-2 text-center font-bold">X / Y</div>
            {timeSlots.map(slot => (
  <div
    key={slot}
    className={`bg-blue-100 p-2 text-center font-semibold ${isLunchBreak(slot) ? 'bg-gray-300' : ''}`}
  >
    {isEditing ? (
      <div 
        onClick={() => handleCellUpdate(day, slot, batch, subSection)}
        className="cursor-pointer hover:bg-blue-200 transition-colors duration-200"
      >
        {slot}
      </div>
    ) : (
      slot
    )}
  </div>
))}
            {days.map(day => (
              <React.Fragment key={day}>
                <div className="bg-blue-100 p-2 font-bold text-center flex items-center justify-center h-full">
                  <div className="writing-vertical-lr transform">
                    {day.toUpperCase().split('').map((char, i) => (
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
                {getMergedCells(day, section, 'both').map((mergedCell, index) => (
    <div
      key={index}
      className={`${cellClassName} flex flex-col ${
        isLunchBreak(timeSlots[mergedCell.start]) ? 'bg-gray-200' : ''
      }`}
      style={{ gridColumn: `span ${mergedCell.end - mergedCell.start + 1}` }}
    >
      {mergedCell.entry ? (
        <div className="flex-1 flex-grow text-center flex items-center justify-center">
          {renderCell(day, timeSlots[mergedCell.start], section, 'both')}
        </div>
      ) : (
        <>
          <div className="flex-1 border-b border-gray-300 flex-grow text-center flex items-center justify-center">
            {renderCell(day, timeSlots[mergedCell.start], section, 'X')}
          </div>
          <div className="flex-1 flex-grow text-center flex items-center justify-center">
            {renderCell(day, timeSlots[mergedCell.start], section, 'Y')}
          </div>
        </>
      )}
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
