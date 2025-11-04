import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import getCurrentUser from './customHook/getCurrentUser.js';
import { useSelector } from 'react-redux';
import Profile from './pages/Profile';
import ForgetPassword from './pages/ForgetPassword';
import EditProfile from './pages/EditProfile.jsx';
import Dashboard from './pages/Educator/Dashboard.jsx';
import Courses from './pages/Educator/Courses.jsx';
import CreateCourses from './pages/Educator/CreateCourses';


export const serverUrl ='http://localhost:8000'

const App = () => {
    getCurrentUser()
    const {userData} = useSelector(state => state.user);
    console.log(userData);
    return (
        <>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={!userData ? <SignUp /> : <Navigate to={"/"}/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={userData ? <Profile /> : <Navigate to={"/signup"}/>}/>
            <Route path='/forget' element={userData ? <ForgetPassword /> : <Navigate to={"/signup"}/>}/>
            <Route path='/editprofile' element={userData ? <EditProfile /> : <Navigate to={"/signup"}/>}/>

             <Route path='/dashboard' element={userData?.role ==="educator"  ? <Dashboard /> : <Navigate to={"/signup"}/>}/> 
             
             <Route path='/courses' element={userData?.role ==="educator"  ? <Courses /> : <Navigate to={"/signup"}/>}/> 

             <Route path='/courses' element={userData?.role ==="educator"  ? <Courses /> : <Navigate to={"/signup"}/>}/> 
             

             <Route path='/createcourse' element={userData?.role ==="educator"  ? <CreateCourses /> : <Navigate to={"/signup"}/>}/> 
             


            {/* <Route path='/dashboard' element={!userData ? <Dashboard /> : <Navigate to={"/"}/>} /> */}
         


        </Routes>
            
        </>
    );
};

export default App;