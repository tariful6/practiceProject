import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../../App';
import axios from 'axios';
import { setCreatorCourseData } from '../../redux/courseSlice';
// import getCreatorCourse from '../../customHook/getCreatorCourse';

const Courses = () => {
    const navigate = useNavigate()
    const {userData} = useSelector(state => state.user)
    const {creatorCourseData} = useSelector(state => state.course)
    console.log(creatorCourseData);
   const dispatch = useDispatch()

        useEffect(()=>{
            const creatorCourses = async ()=>{
                try {
                    const result = await axios.get(`${serverUrl}/api/course/getcreator`, {withCredentials: true});
                    console.log(result.data);
                    dispatch(setCreatorCourseData(result.data))

                } catch (error) {
                    console.log(error);
                }
            }
            creatorCourses()
        },[userData, dispatch])

    return (
        <div>
            <button onClick={()=> navigate("/dashboard")} className=' p-4 bg-blue-400'>back to dashboard</button>
            <button onClick={()=> navigate("/createcourse")} className=' p-4 bg-red-400'>create cource</button>
            {/* use table > thead > > tr > th  thead ------- tbody > tr > td > tr tbody ---*/}
            <div className=' py-12 bg-amber-300'>Table Head</div>
            <div className=' py-16 bg-green-600'>Table Row</div>

            {
                creatorCourseData.map((course, index) => <div className=' p-12 border border-green-400' key={course._id}>
                    <h2>{course?.title}</h2>
                    <h2>{course?.price? course?.price: "200 tk"}</h2>
                    <div>
                        <img className=' w-24 h-24' src={course?.thumbnail} alt="" />
                    </div>
                    {/* course.isPublished -- use for bg color */}
                    <button className='p-4 bg-green-300'>{course?.isPublished? "Published":"Draft"}</button>
                    <br />
                    <button onClick={()=> navigate(`/editcourse/${course._id}`)} className=' p-4 bg-pink-400'>edit cource</button>
                </div>)
            }

          
               <br />
               

        </div>
    );
};

export default Courses;