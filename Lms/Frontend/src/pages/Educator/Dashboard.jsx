import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const {userData} = useSelector(state => state.user)
    const navigate = useNavigate()

    return (
        <div className=' py-24 w-11/12 flex  flex-col items-center justify-center gap-8'>
                <button className=' p-4 bg-green-300' onClick={()=> navigate("/")}>Home</button>
            {/* upper section  ----- */}
            <div>
                <img className='w-32 h-32' src={userData?.photoUrl} alt="" />
                <h2>name : {userData?.name}</h2>
                <h2>Total Earning : 0</h2>
                <p>{userData?.description || "Start createing courses"}</p>
                <button className=' p-4 bg-green-300' onClick={()=> navigate("/courses")}>Create Courses</button>
            </div>

            {/* graph section  ----- */}
            <div>
                Graph section
            </div>
        </div>
    );
};

export default Dashboard;