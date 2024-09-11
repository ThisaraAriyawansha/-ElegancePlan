// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Homepage from './components/Homepage';
import StartDesign from './components/StartDesigning'
import Quiz from './components/Quiz';

const App = () => {
    return (
        <div>
            <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/startDesign" element={<StartDesign />} />
            <Route path="/quiz" element={<Quiz />} />

            </Routes>
        </div>
    );
};

export default App;
