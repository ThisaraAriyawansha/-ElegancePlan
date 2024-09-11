// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Homepage from './components/Homepage';
import StartDesign from './components/StartDesigning'
import Quiz from './components/Quiz';
import ContactUs from './components/ContactUs';

const App = () => {
    return (
        <div>
            <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/startDesign" element={<StartDesign />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/contact" element={<ContactUs />} />


            </Routes>
        </div>
    );
};

export default App;
