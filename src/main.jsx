import React from 'react';
import ReactDOM from 'react-dom/client';
import { MotionConfig } from 'framer-motion';
import App from './App.jsx';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';

// Motion is on for everyone, except visitors whose device asks for reduced motion.
const reducedMotion = 'user';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MotionConfig reducedMotion={reducedMotion}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </MotionConfig>
  </React.StrictMode>,
);
