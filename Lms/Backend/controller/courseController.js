import uploadOnCloudinary from "../config/cloudinary.js";
import Course from "../model/courseModel.js";
import Lecture from "../model/lectureModel.js";

export const createCourse = async (req, res)=>{
    try {
        const {title, category} = req.body
        if(!title || !category){
            return res.status(400).json({message: "Title category is required"})
        }
        const course = await Course.create({
            title, 
            category, 
            creator: req.userId
        })
        return res.status(201).json(course)
    } catch (error) {
        return res.status(500).json({message: `create course error: ${error}`}); 
    }
}

export const getPublishedCourses = async(req, res)=>{
    try {
        const courses = await Course.find({isPublished:true}).populate("lectures")
        if(!courses){
            return res.status(400).json({message: "Courses not found"}); 
        }
         return res.status(200).json(courses)
    } catch (error) {
        return res.status(500).json({message: `Fail to get isPublished courses error: ${error}`}); 
    }
}

export const getCreatorCourses = async (req, res)=>{
    try {
        const userId = req.userId
        const courses = await Course.find({creator:userId})

        if(!courses){
            return res.status(400).json({message: "Courses not found"}); 
        }
         return res.status(200).json(courses)

    } catch (error) {
         return res.status(500).json({message: `Fail to get creator courses error: ${error}`}); 
    }
}

export const editCourse = async (req, res)=>{
    try {
        const {courseId} = req.params
        const {title, subTitle, description, category, level, isPublished, price} = req.body

        let thumbnail
        if(req.file){
            thumbnail = await uploadOnCloudinary(req.file.path)
        }
        let course = await Course.findById(courseId)
        if(!course){
            return res.status(400).json({message: "Courses not found"}); 
        }
        const updateData = {title, subTitle, description, category, level, isPublished, price, thumbnail}
        course = await Course.findByIdAndUpdate(courseId, updateData, {new:true})
        return res.status(200).json(course)
    } catch (error) {
           return res.status(500).json({message: `Fail to edit courses error: ${error}`}); 
    }
}

export const getCourceById = async(req, res)=>{
    try {
        const {courseId} = req.params;
        let course = await Course.findById(courseId)
        if(!course){
            return res.status(400).json({message: "Courses not found"}); 
        }
         return res.status(200).json(course)

    } catch (error) {
          return res.status(500).json({message: `Fail to get courses by id error: ${error}`}); 
    }
}

export const removeCource = async(req, res)=>{
    try {
        const {courseId} = req.params;
        let course = await Course.findById(courseId)
        if(!course){
            return res.status(400).json({message: "Courses not found"}); 
        }
        course = await Course.findByIdAndDelete(courseId, {new: true})
        return res.status(200).json({message: "Courses Removed"}); 
    } catch (error) {
         return res.status(500).json({message: `Fail to delete courses by id error: ${error}`}); 
    }
}


// for lecture ---------------

export const createLecture = async (req, res)=>{
    try {
        const {lectureTitle} = req.body;
        const {courseId} = req.params;
        if(!lectureTitle || !courseId){
            return res.status(400).json({message : "lectured is required"})
        }
        const lecture = await Lecture.create({lectureTitle})
        const course = await Course.findById(courseId)
        if(course){
            course.lectures.push(lecture._id)
        }
        await course.populate("lectures") 
        course.save()
        return res.status(201).json({lecture, course}); 
      
     } catch (error) {
             return res.status(500).json({message: `Fail to crerate lecture ${error}`}); 
    }
}

export const getCourseLecture = async (req, res) =>{
    try {
        const {courseId} = req.params;

        const course = await Course.findById(courseId)
        if(!course){
            return res.status(400).json({message : "course is not fouund"})
        }
        await course.populate("lectures")
        course.save()
        return res.status(200).json(course)
 
    } catch (error) {
        return res.status(500).json({message: `Fail to get lecture ${error}`}); 
    }
}


export const editLecture = async(req, res)=>{
    try {
        const {lectureId} = req.params;
        const {isPreviewFree, lectureTitle} = req.body
        const lecture = await Lecture.findById(lectureId)
        if(!lecture){
            return res.status(404).json({message: `lecture is not found ${error}`}); 
        }
        let videoUrl
        if(req.file){
            videoUrl = await uploadOnCloudinary(req.file.path)
            lecture.videoUrl = videoUrl
        }
        if(lectureTitle){
            lecture.lectureTitle = lectureTitle
        }
        lecture.isPreviewFree = isPreviewFree

        await lecture.save()
        return res.status(200).json(lecture)
    } catch (error) {
        return res.status(500).json({message: `Fail to edit lecture ${error}`}); 
    }
}


export const removeLecture = async(req, res)=>{
    try {
    const {lectureId} = req.params;
     const lecture = await Lecture.findByIdAndDelete(lectureId);
     if(!lecture){
        return res.status(404).json({message: `lecture is not found ${error}`}); 
     }
     await Course.updateOne(
        {lectures : lectureId},
        {$pull : {lectures:lectureId}},
     )
     return res.status(200).json({message : "Lecture remove success"})

    } catch (error) {
          return res.status(404).json({message: `failed to remove lecture ${error}`}); 
    }
}