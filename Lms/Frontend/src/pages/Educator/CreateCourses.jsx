import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../../App';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

const CreateCourses = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [loading, setLoading] = useState(false)

    const handleCreateCourses = async () =>{
        setLoading(true)
        try {
            const result = await axios.post(`${serverUrl}/api/course/create`,{title, category}, {withCredentials: true});
            console.log(result.data);
            navigate("/courses")
            setLoading(false)
            alert("course created")
        } catch (error) {
            console.log(error);
             setLoading(false)
            alert(error.response.data.message)
        }
    }
    return (
        <div>
            <button onClick={()=> navigate("/courses")} className=' p-4 bg-green-700'>Courses</button>
           <br />
            CreateCourses

            <form onSubmit={(e)=> e.preventDefault()}>
                <div>
                    <label >Course title</label>
                    <input onChange={(e)=> setTitle(e.target.value)} value={title} className='px-4 border-2 border-amber-300' type="text" id='' />
                </div>
                <div>
                    <label>Category</label>
                    <select name="" id="" onChange={(e)=> setCategory(e.target.value)}>
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
                <button disabled={loading} className=' p-4 bg-yellow-300' onClick={handleCreateCourses}> {loading? <ClipLoader size={30} color='white'></ClipLoader> : "Create"}</button>

            </form>
        
        </div>
    );
};

export default CreateCourses;