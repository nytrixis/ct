import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Connect from './components/Connect';
import Banner from './components/Banner';
import Background from './components/Background';
import Carousel from './components/Carousel';
import Section from './components/Section';
import HowToUse from './components/HowToUse';
import Footer from './components/Footer';
import AddTeacher from './components/AddTeacher';
import AddRoom from './components/AddRoom';
import AddLab from './components/AddLab'; // Import the new AddLab component

function App() {
  return (
    <Router>
      <Background>
        <div className="App">
          <Banner />
          <Routes>
            <Route path="/" element={
              <>
                <Carousel />
                <Section />
                <HowToUse />
                <Connect />
              </>
            } />
            <Route path="/add-teacher" element={<AddTeacher />} />
            <Route path="/add-room" element={<AddRoom />} />
            <Route path="/add-lab" element={<AddLab />} /> {/* Add this new route */}
          </Routes>
          <Footer />
        </div>
      </Background>
    </Router>
  );
}

export default App;