import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

export const serverUrl ='http://localhost:8000'

const App = () => {
    return (
        <>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
        </Routes>
            
        </>
    );
};

export default App;