import React, { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import axios from 'axios';
import { FaUserCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import logo from '../assets/logo.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import { setUserData } from '../redux/userSlice';

const Navbar = () => {
    const {userData} = useSelector((state) => state.user);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [show, setShow] = useState(false)
    const [showHem, setShowHem] = useState(false)
    console.log(userData);

    const handleLoggedOut = async () => {
      try{
          const result = await axios.get(`${serverUrl}/api/auth/logout`, {withCredentials: true});

          dispatch(setUserData(null));
          alert("Logged out successfully");
      }
      catch(error){
        console.log(error.response.data.message);
      }
    }

    return (
        <div className=''>
            <div className='w-[100%] h-[70px] fixed top-0 px-[20px] py-[10px] flex items-center justify-between bg-[#00000047] z-10 '>
                <div className='lg:w-[20%] w-[40%] lg:pl-[50px]'>
                     <img className='w-[60px] rounded-[5px] border-2 border-white' src={logo} alt="" />
                </div>
                <div className=' w-[30%] lg:flex items-center justify-center gap-4 hidden'>
                 {
                    !userData &&  <FaUserCircle onClick={()=>{setShow(!show)}} className=' w-[50px] h-[50px] cursor-pointer fill-black'/>
                 }
                 {
                  userData?.photoUrl ? <img onClick={()=>{setShow(!show)}}  className='w-[50px] h-[50px] rounded-full text-white flex justify-center items-center text-[20px] border-2 border-white bg-black cursor-pointer' src={userData?.photoUrl}></img> : 
                    <div onClick={()=>{setShow(!show)}} className='w-[50px] h-[50px] rounded-full text-white flex justify-center items-center text-[20px] border-2 border-white bg-black cursor-pointer'>
                        {
                            userData?.name?.slice(0,1).toUpperCase()
                        }
                    </div>
                 }

                {
                    userData?.role === 'educator' &&  <div className='px-[20px] py-[10px] border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light  cursor-pointer' onClick={()=>navigate('/dashboard')}>Dashbooard</div>
                }
                 
                { !userData ? 
                  <span className='px-[20px] py-[10px] border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light  cursor-pointer' onClick={()=> navigate('/login')}>Login</span>
                    :
                  <span  className='px-[20px] py-[10px] border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light  cursor-pointer' onClick={handleLoggedOut}>logout</span> }

                  {
                    show && <div className=' absolute top-[110%] right-[15%] flex flex-col items-center justify-center gap-2 text-[16px] rounded-md bg-white px-[15px] py-[10px] border-2 border-black hover:border-white hover:text-white cursor-pointer hover:bg-black'>
                    <span className=' bg-black text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600' onClick={()=> navigate('/profile')}>My Profile</span>
                    <span className=' bg-black text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600'>My Cources</span>
                  </div>
                  }
                </div>
                <GiHamburgerMenu onClick={()=>{ setShowHem(!showHem)}} className=' w-[30px] h-[30px]  cursor-pointer text-black lg:hidden'/>
                
                <div className={`fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#000000d6] flex items-center justify-center flex-col gap-5 z-10 
                  ${showHem ? 'translate-x-[0] transition duration-600' : 'translate-x-[-100%] transition duration-600'}`}>
                  
                  <ImCross  onClick={()=>{ setShowHem(!showHem)}}  className=' w-[35px] h-[35px] fill-white absolute top-5 right-[5%]'/>
                               {
                    !userData &&  <FaUserCircle className=' w-[50px] h-[50px] cursor-pointer fill-black'/>
                 }
                 {userData?.photoUrl ? <img  className='w-[50px] h-[50px] rounded-full text-white flex justify-center items-center text-[20px] border-2 border-white bg-black cursor-pointer' src={userData?.photoUrl}></img> : 
                    <div className='w-[50px] h-[50px] rounded-full text-white flex justify-center items-center text-[20px] border-2 border-white bg-black cursor-pointer'>
                        {
                            userData?.name?.slice(0,1).toUpperCase()
                        }
                    </div>}
                    <div className='px-[20px] py-[10px] border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light  cursor-pointer' onClick={()=> navigate('/profile')}>My Profile</div>
                    <div className='px-[20px] py-[10px] border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light  cursor-pointer'>My Cources</div>
                    {
                    userData?.role === 'educator' &&  <div className='px-[20px] py-[10px] border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light  cursor-pointer' onClick={()=>navigate('/dashboard')}>Dashbooard</div>}
                    { !userData ? 
                     <span className='px-[20px] py-[10px] border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light  cursor-pointer' onClick={()=> navigate('/login')}>Login</span>
                    :
                    <span  className='px-[20px] py-[10px] border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light  cursor-pointer' onClick={handleLoggedOut}>logout</span> }
                </div>
            </div>
        </div> 
    );
}; 

export default Navbar;   