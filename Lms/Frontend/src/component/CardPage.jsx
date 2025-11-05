import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Card from './Card';

const CardPage = () => {
    const {courseData} = useSelector(state => state.course)
    const [popularCourses, setPopularCourses] = useState([])

    // useEffect(()=>{
    //     setPopularCourses(courseData.slice(0, 6));
    // },[courseData])

    useEffect(() => {
        if (courseData && courseData.length > 0) {
          setPopularCourses(courseData.slice(0, 6));
       }
  }, [courseData]);


    return (
        <div >

            <div className=' text-center py-9'>
                <h2>Popular cources</h2>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus enim qui perferendis quidem ipsa eum iure officiis nulla exercitationem nihil?</p>
            </div>

            <div className=' p-9 border border-r-red-300 grid grid-cols-3 gap-6'>
                {
                    popularCourses?.map(course => <Card key={course._id} thumbnail={course.thumbnail} category={course.category} title={course.title} price={course.price} id={course._id}></Card>)
                }
            </div>
            
        </div>
    );
};

export default CardPage;