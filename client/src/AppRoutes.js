import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Truck from './components/Truck';
import App from './App';
import NotFound from './components/NotFound'
import QuizGame from './components/QuizGame';
import Result from './components/Result';
import AppProvider from './components/AppContext';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/:id' element={<Truck />} />
      <Route path='*' element={<NotFound />} />
      <Route path='/:id/:id' element={<QuizGame />} />
      <Route path="/result" element={<AppProvider><Result />
      </AppProvider>} />
    </Routes>
  )
}

export default AppRoutes;



