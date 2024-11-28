import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';  // Import Routes and Route from react-router-dom
import Navbar from './Components/Navbar';
import News from './Components/News';  // Ensure the path is correct

const App = () => {
  const [mode, setMode] = useState('light'); // State for dark/light mode

  // Toggle function for dark/light mode
  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className={`container ${mode === 'dark' ? 'bg-dark text-white' : ''}`}>
      <Navbar mode={mode} toggleMode={toggleMode} />
      <Routes>
        {/* Home Route - Displays Trending News */}
        <Route path="/home" element={<News category="general" pageSize={10} country="US" />} />
        
        {/* Other routes for specific categories */}
        <Route path="/sports" element={<News category="sports" pageSize={10} country="US" />} />
        <Route path="/business" element={<News category="business" pageSize={10} country="US" />} />
        <Route path="/entertainment" element={<News category="entertainment" pageSize={10} country="US" />} />
      </Routes>
    </div>
  );
};

export default App;
