import { useNavigate } from "react-router-dom";
import img from "../assets/SearchAi.png"
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import Card from "../component/Card";

const AllCourses = () => {
    const navigate = useNavigate()
    const {courseData} = useSelector(state => state.course)
    console.log(courseData);
    const [category, setCategory] = useState([])
    const [filterCourses, setFilterCourses] = useState([])

    const toogleCategory = (e)=>{
        if(category.includes(e.target.value)){
            setCategory(prev => prev.filter(c=> c !== e.target.value))
        }else{
            setCategory(prev => [...prev, e.target.value])
        }
    }


    const applyFilter = () =>{
        let courseCopy = courseData?.slice()
        if(category.length > 0){
            courseCopy = courseCopy.filter(c => category.includes(c.category))
        }
        setFilterCourses(courseCopy)
    }

    useEffect(()=>{
        setFilterCourses(courseData)
    },[courseData])

    useEffect(()=>{
        applyFilter()
    },[category])


    return (
        <div className=" flex min-h-screen bg-gray-50">
             {/* Sidebar  ------- */}
             <aside className=" w-[260px] h-screen overflow-y-auto bg-black fixed top-0 left-0 p-6 py-[130px] border-r border-gray-200 shadow-md transition-transform duration-300 z-5">

                <div className=" flex items-center gap-5">
                        <h4 className="p-1 bg-amber-300 my-3" onClick={()=> navigate("/")} >Back</h4>
                       <h2 className=" text-white my-2">Filter By Category</h2>
                </div>
               
                <form onSubmit={(e)=> e.preventDefault()} action="" className=" space-y-4 text-sm bg-gray-600 border-white text-white border p-[20px] rounded-2xl">
                    <button className=" p-[10px]  bg-black text-white rounded-[10px] text-[15px] font-light flex items-center justify-center gap-2">Search With AI <img className=" w-6" src={img} alt="" /></button>
                    
                    {/* App Development */}
                    <label className=" flex items-center gap-3">
                        <input value={"App Development"} onChange={toogleCategory} className=" w-4 h-4 rounded-md accent-black" type="checkbox" name="" id="" /> App Development
                    </label>
                    {/* AI/ML */}
                    <label className=" flex items-center gap-3">
                        <input  value={"AI/ML"} onChange={toogleCategory} className=" w-4 h-4 rounded-md accent-black" type="checkbox" name="" id="" /> AI/ML
                    </label>
                    {/* AI Tools */}
                    <label className=" flex items-center gap-3">
                        <input value={'AI Tools'} onChange={toogleCategory}  className=" w-4 h-4 rounded-md accent-black" type="checkbox" name="" id="" /> AI Tools
                    </label>
                    {/* Data Science */}
                    <label className=" flex items-center gap-3">
                        <input  value={'Data Science'} onChange={toogleCategory}  className=" w-4 h-4 rounded-md accent-black" type="checkbox" name="" id="" /> Data Science
                    </label>
                    {/* Data Anaylysis */}
                    <label className=" flex items-center gap-3">
                        <input  value={'Data Anaylysis'} onChange={toogleCategory}  className=" w-4 h-4 rounded-md accent-black" type="checkbox" name="" id="" /> Data Anaylysis
                    </label>
                    {/* Ethical Hacking */}
                    <label className=" flex items-center gap-3">
                        <input  value={'Ethical Hacking'} onChange={toogleCategory}  className=" w-4 h-4 rounded-md accent-black" type="checkbox" name="" id="" /> Ethical Hacking
                    </label>
                    {/* UX UI Designer */}
                    <label className=" flex items-center gap-3">
                        <input  value={'UX UI Designer'} onChange={toogleCategory}  className=" w-4 h-4 rounded-md accent-black" type="checkbox" name="" id="" /> UX UI Designer
                    </label>
                    {/*Web Developer */}
                    <label className=" flex items-center gap-3">
                        <input  value={'Web Development'} onChange={toogleCategory}  className=" w-4 h-4 rounded-md accent-black" type="checkbox" name="" id="" /> Web Development
                    </label>
                    {/*Others */}
                    <label className=" flex items-center gap-3">
                        <input  value={'Others'} onChange={toogleCategory}  className=" w-4 h-4 rounded-md accent-black" type="checkbox" name="" id="" /> Others
                    </label>
                </form>

 
             </aside>
                            {/* main --------------------- */}
                <main className=" w-full transition-all duration-300 py-[130] md:pl-[300px] flex items-center justify-center md:justify-start flex-wrap gap-6 px-[10px]">

                   
                    {
                        filterCourses?.map(course => <Card key={course._id} thumbnail={course.thumbnail} category={course.category} title={course.title} price={course.price} id={course._id}></Card>)
                    }

                </main>
        </div>
    );
};

export default AllCourses;