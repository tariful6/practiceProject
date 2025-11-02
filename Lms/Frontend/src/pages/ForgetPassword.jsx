import { useState } from "react";
import { useNavigate } from "react-router-dom";
import  axios from 'axios';
import { serverUrl } from './../App';
import { ClipLoader } from "react-spinners";

const ForgetPassword = () => {
    const [step, setStep] = useState(1)
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [conPassword, setConPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    // step one ---------------------------
    const sendOtp = async () => {
          setLoading(true)
        try{
            const result = await axios.post(`${serverUrl}/api/auth/sendotp`, {email}, {withCredentials: true});
            console.log(result.data);
            setLoading(false)
            setStep(2)
            alert(result.data.message)
        }
        catch(error){
            console.log(error);
            alert(error.response.data.message)
            setLoading(false)
        }
    }

    
    // step two ---------------------------

    const verifyOTP = async () =>{
        setLoading(true)
        try{
            const result = await axios.post(`${serverUrl}/api/auth/verifyotp`, {email, otp}, {withCredentials: true});
            console.log(result.data);
            setLoading(false)
            setStep(3)
            alert(result.data.message)
        }
        catch(error){
            console.log(error);
            alert(error.response.data.message)
            setLoading(false)
        }
    }
    // step three ---------------------------
      const resetPassword = async () =>{
        setLoading(true)
        try{
        if(newPassword !== conPassword){
            return alert("password not mached")
        }
        const result = await axios.post(`${serverUrl}/api/auth/resetpassword`, {email, password:newPassword}, {withCredentials: true});
            console.log(result.data); 
            setLoading(false)
            navigate('/login')
            alert(result.data.message)
        }
        
        catch(error){
            console.log(error);
            alert(error.response.data.message)
            setLoading(false)
        }
      }

    return (
        <div className=" min-h-screen flex items-center justify-center bg-gray-100 px-4">
            {/* step one ------------ */}
            {
                step == 1 && <div className=" bg-white shadow-md rounded-xl p-8  max-w-md w-full">
                    <h2 className=" text-2xl mb-6 text-center text-gray-800  font-bold">Forget Your Password</h2>
                    <form onSubmit={(e)=> e.preventDefault()} className=" space-y-4">
                        <div>
                            <label htmlFor="email">Enter your email address</label>
                            <input type="email" name="email" id="email" placeholder="E-mail" className=" mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black" required onChange={(e)=> setEmail(e.target.value)} value={email}/>

                            <button disabled={loading} className=" w-full bg-black hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md font-medium cursor-pointer my-4" onClick={sendOtp}> {loading? <ClipLoader/> : "Send OTP"} </button>
                        </div>
                    </form>
                    <div className=" text-sm text-center mt-4 cursor-pointer" onClick={()=> navigate('/login')}>Back to login</div>
                </div>
            }
            {/* step two ------------ */}
            {
                step == 2 && <div className=" bg-white shadow-md rounded-xl p-8  max-w-md w-full">
                    <h2 className=" text-2xl mb-6 text-center text-gray-800  font-bold">Enter OTP</h2>
                    <form onSubmit={(e)=> e.preventDefault()} className=" space-y-4">
                        <div>
                            <label htmlFor="otp">Please enter four digit code</label>
                            <input type="text" name="otp" id="otp" placeholder="* * * *" className=" mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black" required onChange={(e)=> setOtp(e.target.value)} value={otp}/>
                            <button disabled={loading} className=" w-full bg-black hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md font-medium cursor-pointer my-4" onClick={verifyOTP}>{loading? <ClipLoader/> : "Verify OTP"}</button>
                        </div>
                    </form>
                    <div className=" text-sm text-center mt-4 cursor-pointer" onClick={()=> navigate('/login')}>Back to login</div>
                </div>
            }
            {/* step three ------------ */}
            {
                step == 3 && <div className=" bg-white shadow-md rounded-xl p-8  max-w-md w-full">
                    <h2 className=" text-2xl mb-6 text-center text-gray-800  font-bold">Reset your Passwors</h2>
                    <form onSubmit={(e)=> e.preventDefault()} className=" space-y-4">
                        <div>
                            <label htmlFor="password">New Password</label>
                            <input type="password" name="password" id="password" placeholder="* * * *" className=" mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black" required onChange={(e)=> setNewPassword(e.target.value)} value={newPassword} />
                        </div>
                        <div>
                            <label htmlFor="conpassword">Confirm Password</label>
                            <input type="password" name="conpassword" id="conpassword" placeholder="* * * *" className=" mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black" required onChange={(e)=> setConPassword(e.target.value)} value={conPassword}/>
                            <button disabled={loading} className=" w-full bg-black hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md font-medium cursor-pointer my-4" onClick={resetPassword} > {loading? <ClipLoader/> : "Reset Password"}</button>
                        </div>
                    </form>
                    <div className=" text-sm text-center mt-4 cursor-pointer" onClick={()=> navigate('/login')}>Back to login</div>
                </div>
            }
            
        </div>
    );
};

export default ForgetPassword;