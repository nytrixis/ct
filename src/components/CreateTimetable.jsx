import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const CreateTimetable = () => {
  const [classType, setClassType] = useState('theory');
  const [batch, setBatch] = useState('CSE1');
  const [subSection, setSubSection] = useState('both');
  const [day, setDay] = useState('Monday');
  const [timeSlot, setTimeSlot] = useState('');
  const [subject, setSubject] = useState('');
  const [faculty1, setFaculty1] = useState('');
  const [faculty2, setFaculty2] = useState('N/A');
  const [room, setRoom] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [labs, setLabs] = useState([]);
  const [message, setMessage] = useState('');

  const { semester } = useParams();
  const navigate = useNavigate();

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = [
    '10:00 - 10:50', '10:50 - 11:40', '11:40 - 12:30', '12:30 - 1:20',
    '2:10 - 3:00', '3:00 - 3:50', '3:50 - 4:40', '4:40 - 5:30'
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subjectsRes, teachersRes, roomsRes, labsRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/subjects/${semester}`),
          axios.get('http://localhost:5000/api/teachers'),
          axios.get('http://localhost:5000/api/rooms'),
          axios.get('http://localhost:5000/api/labs')
        ]);
        console.log('Subjects:', subjectsRes.data);
        console.log('Teachers:', teachersRes.data);
        console.log('Rooms:', roomsRes.data);
        console.log('Labs:', labsRes.data);
        setSubjects(subjectsRes.data);
        setFaculties(teachersRes.data);
        setRooms(roomsRes.data);
        setLabs(labsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setMessage('Error fetching data. Please try again.');
      }
    };
    fetchData();
  }, [semester]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Selected Room ID:', room); // Log the selected room ID
      const selectedRoom = classType === 'lab' ? labs.find(lab => lab._id === room)?.labNo : rooms.find(r => r._id === room)?.roomNo;

      console.log('Selected Room:', selectedRoom); // Log the selected room

      if (!selectedRoom) {
        setMessage('Please select a valid room or lab.');
        return;
      }

      console.log('Selected Faculty1:', faculty1); // Log the selected faculty1
      console.log('Selected Faculty2:', faculty2); // Log the selected faculty2
      console.log('Faculties:', faculties); // Log the faculties list

      const faculty1Obj = faculties.find(fac => fac._id === faculty1);
      const faculty2Obj = faculty2 !== 'N/A' ? faculties.find(fac => fac._id === faculty2) : null;

      console.log('Faculty1 Object:', faculty1Obj); // Log the faculty1 object
      console.log('Faculty2 Object:', faculty2Obj); // Log the faculty2 object

      if (!faculty1Obj || (faculty2 !== 'N/A' && !faculty2Obj)) {
        setMessage('Please select valid faculties.');
        return;
      }

      const faculty = classType === 'lab' ? [faculty1Obj._id, faculty2Obj ? faculty2Obj._id : null].filter(Boolean) : [faculty1Obj._id];

      const payload = {
        semester: parseInt(semester),
        classType,
        batch,
        subSection,
        day,
        timeSlot,
        subject,
        faculty,
        room: selectedRoom
      };

      console.log('Payload:', payload); // Log the payload

      const response = await axios.post('http://localhost:5000/api/timetable', payload);
      setMessage('Timetable entry added successfully!');
      // Reset form fields
      setClassType('theory');
      setBatch('CSE1');
      setSubSection('both');
      setDay('Monday');
      setTimeSlot('');
      setSubject('');
      setFaculty1('');
      setFaculty2('N/A');
      setRoom('');
      setTimeout(() => navigate(`/semester/${semester}`), 2000);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Error adding timetable entry. Please try again.');
      }
      console.error('Error adding timetable entry:', error);
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
          Create Timetable for Semester {semester}
        </motion.h1>
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2">Class Type</label>
              <select
                value={classType}
                onChange={(e) => setClassType(e.target.value)}
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="theory">Theory</option>
                <option value="lab">Lab</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2">Batch</label>
              <select
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="CSE1">CSE1</option>
                <option value="CSE2">CSE2</option>
                <option value="CSE3">CSE3</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2">Sub Section</label>
              <select
                value={subSection}
                onChange={(e) => setSubSection(e.target.value)}
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="X">X</option>
                <option value="Y">Y</option>
                <option value="both">Both</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2">Day</label>
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              >
                {days.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2">Time Slot</label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Time Slot</option>
                {timeSlots.map(slot => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2">Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Subject</option>
                {subjects.map(sub => (
                  <option key={sub._id} value={sub._id}>{sub.name} ({sub.code})</option>
                ))}
              </select>
            </div>
            {classType === 'lab' ? (
              <>
                <div className="mb-4">
                  <label className="block text-white text-sm font-bold mb-2">Faculty 1</label>
                  <select
                    value={faculty1}
                    onChange={(e) => setFaculty1(e.target.value)}
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select Faculty</option>
                    {faculties.map(fac => (
                      <option key={fac._id} value={fac._id}>{fac.name}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-white text-sm font-bold mb-2">Faculty 2</label>
                  <select
                    value={faculty2}
                    onChange={(e) => setFaculty2(e.target.value)}
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="N/A">N/A</option>
                    {faculties.map(fac => (
                      <option key={fac._id} value={fac._id}>{fac.name}</option>
                    ))}
                  </select>
                </div>
              </>
            ) : (
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2">Faculty</label>
                <select
                  value={faculty1}
                  onChange={(e) => setFaculty1(e.target.value)}
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select Faculty</option>
                  {faculties.map(fac => (
                    <option key={fac._id} value={fac._id}>{fac.name}</option>
                  ))}
                </select>
              </div>
            )}
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2">
                {classType === 'lab' ? 'Lab' : 'Room'}
              </label>
              <select
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="">Select {classType === 'lab' ? 'Lab' : 'Room'}</option>
                {(classType === 'lab' ? labs : rooms).map(r => (
                  <option key={r._id} value={r._id}>{classType === 'lab' ? r.labNo : r.roomNo}</option>
                ))}
              </select>
            </div>
          </div>
          <motion.button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration:300 mt-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add to Timetable
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

export default CreateTimetable;