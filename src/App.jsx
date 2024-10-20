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
import AddLab from './components/AddLab';
import SemesterPage from './components/SemesterPage';
import SemesterTT from './components/SemesterTT';
import AddSubject from './components/AddSubject';
import CreateTimetable from './components/CreateTimetable';
import AuthPage from './components/AuthPage';

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
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/add-teacher" element={<AddTeacher />} />
            <Route path="/add-room" element={<AddRoom />} />
            <Route path="/add-lab" element={<AddLab />} />
            {/* {[1, 2, 3, 4, 5, 6, 7, 8].map(semester => (
              <Route
                key={semester}
                path={`/semester/${semester}`}
                element={<SemesterPage />}
              />
            ))} */}
            <Route
              path="/semester/:semester"
              element={<SemesterPage />}
            />
            <Route path="/semester/:semester/timetable/:section" element={<SemesterTT />} />
            <Route path="/semester/:semester/add-subject" element={<AddSubject />} />
            <Route path="/semester/:semester/create-timetable" element={<CreateTimetable />} />
          </Routes>
          <Footer />
        </div>
      </Background>
    </Router>
  );
}

export default App;