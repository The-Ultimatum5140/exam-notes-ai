import React from 'react'
import { Routes , Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Pricing from './pages/Pricing'
import History from './pages/History'
import Notes from './pages/Notes'
import ScrollToTop from './components/ScrollToTop.jsx'
import { useEffect } from 'react'
import { getCurrentUser } from './services/api.js'
import { useDispatch, useSelector } from 'react-redux'
export const serverUrl = import.meta.env.VITE_BACKEND_URL ||  "http://localhost:8000";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getCurrentUser(dispatch);
  }, [dispatch]);

  const { userData, loading } = useSelector((state) => state.user);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* <ScrollToTop/> */}
        <Route path="/" element={userData ? <Home /> : <Navigate to="/auth" />} />
        <Route path="/auth" element={userData ? <Navigate to="/" /> : <Auth />} />
        <Route path="/history" element={userData ? <History /> : <Navigate to="/auth" />} />
        <Route path="/notes" element={userData ? <Notes /> : <Navigate to="/auth" />} />
        <Route path="/pricing" element={userData ? <Pricing /> : <Navigate to="/auth" />} />
      </Routes>
    </>
  );
};

export default App