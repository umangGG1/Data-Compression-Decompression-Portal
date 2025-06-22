import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Algorithms from './pages/Algorithms';
import About from './pages/About';
import { ToastProvider } from './contexts/ToastContext';
import Toast from './components/Toast';
import './index.css';

function App() {
  return (
    <ToastProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/algorithms" element={<Algorithms />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
          <Footer />
          <Toast />
        </div>
      </Router>
    </ToastProvider>
  );
}

export default App; 