// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Homepage from './components/Homepage';
import StartDesign from './components/StartDesigning'


const App = () => {
    return (
        <div>
            <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/startDesign" element={<StartDesign />} />

            </Routes>
        </div>
    );
};

export default App;
