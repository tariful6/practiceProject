import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { serverUrl } from '../../App';
import { setLectureData } from '../../redux/lectureSlice';

const CreateLecture = () => {
    const navigate = useNavigate()
    const {courseId} = useParams()
    const [lectureTitle, setLectureTitle] = useState("")
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const {lectureData} = useSelector(state => state.lecture)

    const handleCreateLecture = async() =>{
    console.log({lectureTitle});
        try {
            const result = await axios.post(`${serverUrl}/api/course/createlecture/${courseId}`, {lectureTitle},{withCredentials: true});
            console.log(result.data);
            dispatch(setLectureData([...lectureData, result.data.lecture]))
            setLoading(false)
            alert("Lecture Added")
            setLectureTitle("")

        } catch (error) {
            console.log(error);
            setLoading(false)
             alert(error.response.data.message)
        }
    }

    useEffect(()=>{
        const getCourseLecture = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/course/courselecture/${courseId}`,{withCredentials: true});
                console.log(result.data);

                dispatch(setLectureData(result.data.lectures))

            } catch (error) {
                console.log(error.response.data.message);
            }
        }
        getCourseLecture()
    },[])


    return (
        <div>

            <form onSubmit={(e)=> e.preventDefault()} action="">
                <div className='px-4 py-4'>
                <input onChange={(e)=> setLectureTitle(e.target.value)} value={lectureTitle} className=' border border-red-300 p-2' type="text" placeholder='Interoduction' />

                </div>
            </form>
            <div className=' flex gap-6 py-6'>
                <button onClick={()=> navigate(`/editcourse/${courseId}`)} className=' p-4 bg-green-200'>Back To Course</button>
                <button disabled={loading} onClick={handleCreateLecture} className=' p-4 bg-red-300'>Create Course</button>
            </div>
            {/* lecture list  ----------- */}
            <div>
                {
                    lectureData?.map((lecture, index) => <div key={index} className=''>
                        <span className=' p-3 my-3 border border-black block'>{index + 1} { lecture.lectureTitle} <span className='flex justify-end bg-amber-50' onClick={()=>navigate(`/editlecture/${courseId}/${lecture._id}`)}>Edit</span></span>
                    </div>)
                }

            </div>
        </div>
    );
};

export default CreateLecture;