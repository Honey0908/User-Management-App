import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignupPage from './Pages/signUp/signUp';
import HomePage from './Pages/Home/HomePage';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import Login from './Pages/Login/Login';

const App: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  return (
    <Router>
       <Routes>

          <Route
            path="/"
            element={isLoggedIn ? <HomePage /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/login"
            element={!isLoggedIn ? <Login /> : <Navigate to="/" replace />}
          />
          <Route
            path="/signup"
            element={
              !isLoggedIn ? <SignupPage /> : <Navigate to="/" replace />
            }
          />
        </Routes>
    </Router>
    

   
  );
};

export default App;

