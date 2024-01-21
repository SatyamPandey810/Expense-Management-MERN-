import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';

const App = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<RenderedRoute><Home /></RenderedRoute>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}
export function RenderedRoute (props) {
  if (localStorage.getItem('user')) {
    return props.children;
  } else {
    return <Navigate to="/login" />
  }
}

export default App;
