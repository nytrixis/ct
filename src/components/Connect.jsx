import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Connect = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Replace with your API URL
    axios.get('http://localhost:5000')
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="connect">
      <h1>{message || "Fetching data..."}</h1>
    </div>
  );
}

export default Connect;
