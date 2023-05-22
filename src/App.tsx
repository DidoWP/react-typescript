import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import CreateRecipe from './pages/CreateRecipe';
import toast, { Toaster } from 'react-hot-toast';

const App: React.FC = () => {

  const logout = () => {
    const loggedUser = window.sessionStorage.getItem('user');
    if (loggedUser != null) {
      window.sessionStorage.removeItem('user');
      toast.success("Logged out");
    }
  }

  return (
    <Router>
      <nav className="w-full h-14 bg-gray-900">
        <ul className="h-14 w-60 ml-3 flex justify-between items-center list-none text-white">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        </ul>
      </nav>
      
      <div><Toaster /></div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createRecipe" element={<CreateRecipe />} />
      </Routes>
    </Router>
  );
};

export default App;
