import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../../App";
import { setLectureData } from "../../redux/lectureSlice";
import { ClipLoader } from "react-spinners";

const EditLecture = () => {
    const {courseId, lectureId} = useParams()
    // console.log(lectureId, courseId);
    const navigate = useNavigate()
    const {lectureData} = useSelector(state => state.lecture)
    const selectedLecture = lectureData.find(lecture => lecture._id === lectureId)
    const [lectureTitle, setLectureTitle] = useState(selectedLecture.lectureTitle)
    const [videoUrl, setVideoUrl] = useState("")
    const [isPreviewFree, setIsPreviewFree] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loading1, setLoading1] = useState(false)
    const dispatch = useDispatch()

    const formData = new FormData()
    formData.append("lectureTitle", lectureTitle)
    formData.append("videoUrl", videoUrl)
    formData.append("isPreviewFree", isPreviewFree)


    const handleEditLecture = async () =>{
        setLoading(true)
        try {
            const result = await axios.post(`${serverUrl}/api/course/editlecture/${lectureId}`,formData, {withCredentials: true});

            console.log(result.data);
            dispatch(setLectureData([...lectureData, result.data]))
            alert("update success")
            navigate("/courses")
            setLoading(false)

        } catch (error) {
            console.log(error.response.data.message);
             setLoading(false)
        }
    }

    const handleRemoveLecture = async () =>{
        setLoading1(true)
        try {
            const result = await axios.delete(`${serverUrl}/api/course/removelecture/${lectureId}`, {withCredentials: true});
            console.log(result.data);

            setLoading1(false)
            alert("remove successful")
            navigate(`/createLecture/${courseId}`)
        } catch (error) {
            setLoading(false)
             console.log(error.response.data.message);
             alert(error.response.data.message);
        }
    }
        
    return (
        <div>
            <div className="py-6 flex gap-6 items-center">
                <button onClick={()=> navigate(`/createlecture/${courseId}`)} className=" p-4 bg-amber-500">Back</button>
                <h2>Update course lacture</h2>
            </div>
            <button onClick={handleRemoveLecture} className=" p-4 bg-red-500">Remove lecture</button>

            <div className="py-6">
                <form action="" onSubmit={(e)=> e.preventDefault()}>
                    <div>
                        <label>Lecture title</label>
                        <input onChange={(e)=> setLectureTitle(e.target.value)} value={lectureTitle} className=" p-3 border border-black" type="text" name="" id="" required />
                    </div>
                    <div>
                        <label>Video</label>
                        <input onChange={(e)=> setVideoUrl(e.target.files[0])} className=" file:mr-2 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-gray-700 file:text-white" type="file" name="" id="" required accept="video/*"/>
                    </div>

                    <div className=" flex items-center gap-3">
                        <input onClick={()=>setIsPreviewFree(!isPreviewFree)} className=" accent-black h-4 w-4" type="checkbox" name="" id="" />
                        <label>IsFree</label>
                    </div>
                    <div className=" py-3">
                        <button onClick={handleEditLecture} className=" p-3 bg-red-300">{loading? <ClipLoader size={30} color="white"></ClipLoader>: "Update lecture"}</button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default EditLecture;