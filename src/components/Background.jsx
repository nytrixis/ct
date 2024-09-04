import React from 'react';
import bg from '../assets/bg.jpg';

const Background = ({ children }) => {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed" 
      style={{backgroundImage: `url(${bg})`}}
    >
      <div className="min-h-screen bg-black bg-opacity-50">
        {children}
      </div>
    </div>
  );
};

export default Background;
