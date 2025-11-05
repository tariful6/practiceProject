import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import emptyJpg from "../../assets/empty.jpg"
import { serverUrl } from '../../App';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';
import { setCourseData } from '../../redux/courseSlice';
const EditCourse = () => {
    const navigate = useNavigate()
    const thumb = useRef()
    const {courseId} = useParams()


    const [isPublished, setPublished] = useState(false)
    const [selectedCourse, setSelectedCourse] = useState(null)
    const [title, setTitle] = useState("")
    const [subTitle, setSubTitle] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [level, setLevel] = useState("")
    const [price, setPrice] = useState("")
    const [frontendImage, setFrontendImage] = useState(emptyJpg)
    const [backendImage, setBackendImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [loading1, setLoading1] = useState(false)
    const dispatch = useDispatch()
    const {courseData} = useSelector(state => state.course)

    const handleThumbnail = (e) => {
        const file = e.target.files[0]
        setBackendImage(file)
        setFrontendImage(URL.createObjectURL(file))
    }

    const getCourseById = async ()=>{
        try {
            const result = await axios.get(`${serverUrl}/api/course/getcourse/${courseId}`, {withCredentials: true});
            setSelectedCourse(result.data)
            console.log(result.data);
            // dispatch(setCreatorCourseData(result.data))

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        if(selectedCourse){
            setTitle(selectedCourse.title || "")
            setSubTitle(selectedCourse.subTitle || "")
            setDescription(selectedCourse.description || "")
            setCategory(selectedCourse.category || "")
            setLevel(selectedCourse.level || "")
            setPrice(selectedCourse.price || "")
            setFrontendImage(selectedCourse.thumbnail || emptyJpg )
            setPublished(selectedCourse?.isPublished)
        }

    },[selectedCourse])

    useEffect(()=>{
        getCourseById()
    },[])

    const handleEditCourse = async ()=>{
        const formData = new FormData()
        formData.append("title", title)
        formData.append("subTitle", subTitle)
        formData.append("description", description)
        formData.append("category", category)
        formData.append("level", level)
        formData.append("price", price)
        formData.append("thumbnail", backendImage)
        formData.append("isPublished", isPublished)
        
        try {
            setLoading(true)
            const result = await axios.post(`${serverUrl}/api/course/editcourse/${courseId}`, 
            formData, {withCredentials: true});
            console.log(result.data);

            const updateData = result.data
            if(updateData.isPublished){
                const updateCourses = courseData.map(course => course._id === courseId ? updateData : course)
                if(!courseData.some(c => c._id === courseId)){
                    updateCourses.push(updateData)
                }
                dispatch(setCourseData(updateCourses))
            }
            else{
                const filterCourses = courseData.filter(course => course._id !== courseId)
                dispatch(setCourseData(filterCourses))
            }
            setLoading(false)
            navigate("/courses")
            alert("course Updated")
             // dispatch(setCreatorCourseData(result.data))
            
        } catch (error) {
            console.log(error);
            setLoading(false)
            alert(error.response.data.message)
        }
    }


    const handleRemoveCourse = async ()=>{
        setLoading1(true)
        const result = await axios.delete(`${serverUrl}/api/course/remove/${courseId}`, {withCredentials: true});
        console.log(result.data);
        const filterCourses = courseData.filter(course => course._id !== courseId)
        dispatch(setCourseData(filterCourses))
        setLoading1(false)
        alert("remove successfful")
        navigate("/courses")

        try {
            //
        } catch (error) {
            setLoading1(false)
            console.log(error.response.data.message);
        }
    }
    return (
        <div className=' py-16'>
            <button onClick={()=> navigate('/courses')} className=' p-4 bg-green-400'>Back to course </button>
            <button onClick={()=> navigate('/')} className=' p-4 bg-blue-400'>go to lecture page</button>
            <div className=' py-9'>
                <h2>Course information</h2>

                {
                    !isPublished?  <button className='p-3 bg-blue-300' onClick={()=> setPublished(!isPublished)}>Click to publish</button> :
                     <button className='p-3 bg-blue-300' onClick={()=> setPublished(!isPublished)}>Click to UnPublish</button>
                }
               
                <button onClick={handleRemoveCourse} className='p-3 bg-red-300'>Remove course</button>

            </div>
            <div>
                <form onSubmit={(e)=> e.preventDefault()}>
                    <div>
                        <label>Title</label>
                        <input onChange={(e)=> setTitle(e.target.value)} value={title} className=' p-2  border border-amber-200' type="text" name="" id="" placeholder='course title'/>
                    </div>
                    <div>
                        <label>Subtitle</label>
                        <input  onChange={(e)=> setSubTitle(e.target.value)} value={subTitle} className=' p-2  border border-amber-200' type="text" name="" id="" placeholder='course Subtitle'/>
                    </div>
                    <div>
                       <label>Description</label>
                       <textarea  onChange={(e)=> setDescription(e.target.value)} value={description} className=' p-2  border border-amber-200'  rows={3} name="" id="" placeholder='Description'></textarea>
                    </div>
                     <div>
                        {/* onChange={(e)=> setCategory(e.target.value)} */}
                    <label>Category</label>
                    <select  onChange={(e)=> setCategory(e.target.value)} value={category} className=' p-2  border border-amber-200'  name="" id="" >
                        <option value="">Select Category</option>
                        <option value="App Development">App Development</option>
                        <option value="AI/ML">AI/ML</option>
                        <option value="AI Tools">AI Tools</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Data Analytics">Data Analytics</option>
                        <option value="Ethical Hacking">Ethical Hacking</option>
                        <option value="UI UX Designing">UI UX Designing</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Others">Others</option>
                    </select>
                </div>

                <div>
                        {/* onChange={(e)=> setCategory(e.target.value)} */}
                    <label>Course Levels</label>
                    <select  onChange={(e)=> setLevel(e.target.value)} value={level} className=' p-2  border border-amber-200'  name="" id="" >
                        <option value="">Select Levels</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                </div>

                   <div>
                        <label>Price</label>
                        <input  onChange={(e)=> setPrice(e.target.value)} value={price} className=' p-2  border border-amber-200' type="number" name="" id="" placeholder='course Price'/>
                    </div>
                   <div>
                        <label>Course Thumbnail</label>
                        <input onChange={handleThumbnail} className=' p-2  border border-amber-200' hidden ref={thumb} type="file" name="" id="" placeholder='course Price' accept='image/*'/>
                    </div>
                    <div>
                        <img className=' w-16 h-16 border border-green-400' src={frontendImage} alt="" onClick={()=> thumb.current.click()} />
                    </div>
                    <div>
                        <button className=' p-3 bg-red-400' onClick={()=>navigate('/courses')}> cancle</button>
                        <button disabled={loading} onClick={handleEditCourse} className=' p-3 bg-green-400' > {loading? <ClipLoader size={30} color='white'></ClipLoader> : "Save & update"}</button>
                        
                    </div>
                </form>
            </div>
            
        </div>
    );
};

export default EditCourse;