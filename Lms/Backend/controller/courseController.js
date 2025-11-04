import uploadOnCloudinary from "../config/cloudinary.js";
import Course from "../model/courseModel.js";

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
        const courses = await Course.find({isPublished:true})
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