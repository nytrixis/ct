import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  { title: "Select Semester", description: "Choose between Odd and Even semesters from the dropdown menu." },
  { title: "Add Teachers", description: "Input teacher details including name, subject, and availability." },
  { title: "Add Rooms", description: "Enter room numbers and their seating capacity." },
  { title: "Add Labs", description: "Include lab details such as name, capacity, and equipment." },
  { title: "Generate Timetable", description: "Click on 'Generate' to create your optimized timetable." },
  { title: "Review and Adjust", description: "Check the generated timetable and make any necessary adjustments." }
];

const HowToUse = () => {
  return (
    <motion.div
      className="w-full py-12 bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold text-white mb-8 text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          How to Use the Timetable Generator
        </motion.h2>
        <div className="space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-white bg-opacity-10 p-6 rounded-lg"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold text-white mb-2">
                Step {index + 1}: {step.title}
              </h3>
              <p className="text-gray-200">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default HowToUse;
