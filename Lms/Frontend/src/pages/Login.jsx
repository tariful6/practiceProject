import React from 'react';
import { useState } from "react";
import logo from "../assets/logo.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../App';
import { ClipLoader } from 'react-spinners';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice.js';
const Login = () => {
    const [show, setShow] = useState(false)
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()

    
    const handleLogin = async () => {
        setLoading(true);
        try{
            const result = await axios.post(`${serverUrl}/api/auth/login`, {email, password}, {withCredentials: true});
           dispatch(setUserData(result.data));
            setLoading(false);
            navigate('/')
            alert("login Successful")
            // toast.success("Signup Successful")
        }
        catch(error){
            console.log(error);
            setLoading(false);
            alert(error.response.data.message)
        }
    }


    return (
     <div className="bg-[#dddbdb] h-[100vh] w-[100vw] flex items-center justify-center">
           <form onSubmit={(e) => e.preventDefault()} className="w-[90%] md:w-200 h-150 bg-white shadow-xl rounded-2xl flex">
             {/* left div ------ */}
             <div className="md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3">
                <div>
                    <h1 className=" font-semibold text-black text-2xl ">Welcome Back</h1>
                    <h2 className=" text-[#999797] text-[18px ]">Login Your Accound</h2>
                </div>
        
                {/* Email --------- */}
                <div className=" flex flex-col gap-1 w-[80%] items-start justify-center px-3">
                    <label >Email</label>
                    <input type="email" name="email" className="border-2 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]" placeholder="Email"  onChange={(e)=> setEmail(e.target.value) } value={email} />
                </div>
                {/* Password --------- */}
                <div className=" flex flex-col gap-1 w-[80%] items-start justify-center px-3 relative">
                    <label htmlFor="password">Password</label>
                    <input type={show ? "text" : "password"} name="password" id="email" className="border-2 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]" placeholder="Password"  onChange={(e)=> setPassword(e.target.value) } value={password} />
                    {
                      show ?  <FaEye className=" absolute w-[20px] h-[20px] cursor-pointer right-[25px] bottom-[10%]" onClick={()=> setShow(!show)}/>
                      :
                     <FaEyeSlash className=" absolute w-[20px] h-[20px]  cursor-pointer right-[25px] bottom-[10%]"  onClick={()=> setShow(!show)}/>
                    }
          
                </div>
         
                {/* signin button --------- */}
                <button disabled={loading} onClick={handleLogin} type="submit" className="w-[80%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px]">{loading ? <ClipLoader size={30} color='white'/> : "Login"}</button>
             
                {/* Forget password--------- */}
                <span className=' text-[13px] cursor-pointer text-[#585757]' onClick={()=> navigate('/forget')}>Forget your Password</span>


                {/* divider -------------- */}
                <div className=" w-[80%] flex items-center gap-2">
                    <div className=" w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
                    <div className=" w-[50%] text-[15px] text-[#6f6f6f] flex items-center justify-center">Or Continue</div>
                    <div className=" w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
                </div>

                {/* google signin-------------- */}
                <div className=" w-[80%] h-[40px] border-2 border-black rounded-[5px] flex items-center justify-center">Google</div>

                {/* Create accound-------------- */}
                 <div className="text-[#6f6f6f6]">Create a new accound ? <span className=" underline  underline-offset-1 text-black cursor-pointer" onClick={()=> navigate('/signup')}>Signin</span>
                </div>
 
             </div>

             {/* right div ----- */}
             <div className="w-[50%] h-[100%] rounded-r-2xl bg-black md:flex items-center justify-center flex-col hidden">
                <img src={logo} alt="" className=" w-30 shadow-2xl"/>
                <span className=" text-2xl text-white">Online Cources</span>
             </div>
           </form>
        </div>
    );
};

export default Login;