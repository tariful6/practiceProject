import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import getCurrentUser from './customHook/getCurrentUser';
import { useSelector } from 'react-redux';
import Profile from './pages/Profile';

export const serverUrl ='http://localhost:8000'

const App = () => {
    getCurrentUser()
    const {userData} = useSelector(state => state.user);
    return (
        <>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={!userData ? <SignUp /> : <Navigate to={"/"}/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={userData ? <Profile /> : <Navigate to={"/signup"}/>}/>
        </Routes>
            
        </>
    );
};

export default App;