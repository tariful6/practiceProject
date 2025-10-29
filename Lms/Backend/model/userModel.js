import mongoose from "mongoose";
const userScheme = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
    },
    role:{
        type:String,
        enum:['student','educator'],
        required:true,
    },
    photoUrl:{
        type:String,
        default:''
    },
    enrolledCources:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }]
}, {timestamps: true});

const User = mongoose.model('User', userScheme);
export default (User);