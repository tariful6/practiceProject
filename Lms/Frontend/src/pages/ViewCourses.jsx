import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setSelectedCourse } from "../redux/courseSlice";
import { useEffect } from "react";

const ViewCourses = () => {
    const navigate = useNavigate()
    const {courseId} = useParams()
    const {courseData} = useSelector(state => state.course)
    const {selectedCourse} = useSelector(state => state.course)
    const dispatch = useDispatch()

    const fetchCourseData = async ()=>{
        courseData?.map((course) => {
            if(course._id === courseId){
                dispatch(setSelectedCourse(course))
                console.log(selectedCourse);
                return null
            }
        })
    }

    useEffect(()=>{
        fetchCourseData()
    },[courseData, courseId])
 
    return (
        <div className="  min-h-screen p-6">
            <div className=" max-w-6xl mx-auto bg-white shadow-2xl rounded-xl p-6 space-y-6 relative">
                {/* top section */}
                <div className=" flex flex-col md:flex-row gap-6">
                    {/* thumbnail  */}
                    <div className=" w-full md:w-1/22">
                        <button onClick={()=> navigate("/")} className=" p-3 bg-blue-300">Home</button>
                    </div>
                   

        
                </div>
                <div>
                    {selectedCourse?.thumbnail? <img className=" w-16" src={selectedCourse?.thumbnail} alt="" /> : "Nai"}

                    <h2>{selectedCourse?.subTitle}</h2>
                    <div>
                        <span>*</span>
                        <span>1200 Rview</span>
                        <p>{selectedCourse?.price} tk</p>
                        <p>{selectedCourse?.category}</p>
                        <button className="p-4 bg-green-200">Enroll now</button>
                    </div>

                </div>

            </div>
            
        </div>
    );
};

export default ViewCourses;