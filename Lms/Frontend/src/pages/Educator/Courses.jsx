import React from 'react';
import { useNavigate } from 'react-router-dom';

const Courses = () => {
    const navigate = useNavigate()
    return (
        <div>
            <button onClick={()=> navigate("/dashboard")} className=' p-4 bg-blue-400'>back to dashboard</button>
            <button onClick={()=> navigate("/createcourse")} className=' p-4 bg-red-400'>create cource</button>
            {/* use table > thead > > tr > th  thead ------- tbody > tr > td > tr tbody ---*/}
            <div className=' py-12 bg-amber-300'>Table Head</div>
            <div className=' py-16 bg-green-600'>Table Row</div>

          
               <br />
               <button onClick={()=> navigate("/")} className=' p-4 bg-pink-400'>edit cource</button>

        </div>
    );
};

export default Courses;