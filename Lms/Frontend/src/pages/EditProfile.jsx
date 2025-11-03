import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { ClipLoader } from "react-spinners";


const EditProfile = () => {
    const {userData} = useSelector(state => state.user)
    console.log(userData);
    const navigate = useNavigate()
    const [name, setName] = useState(userData.name || "")
    const [description, setDescription] = useState(userData.description || "")
    const [photoUrl, setPhotoUrl] = useState(null)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const formData = new FormData()
    formData.append("name", name)
    formData.append("description", description)
    formData.append("photoUrl", photoUrl)

    const handleEditProfile = async () => {
            setLoading(true)
            try {
                const result = await axios.post(`${serverUrl}/api/user/profile`,formData, {withCredentials: true});
                dispatch(setUserData(result.data));
                setLoading(false)
                navigate('/')
                alert("profile updated")
            } catch (error) {
                console.log(error);
                setLoading(false)
                alert(error.response.data.message)
            }
    }


    return (
        <div>
            <div>
                <button onClick={()=> navigate("/profile")} className=" cursor-pointer p-4 bg-green-200">profile</button>
            </div>
            <div className=" flex flex-col items-center justify-center">
                <img src={userData?.photoUrl} alt=""  className=" w-24 h-24"/>
                <h2 className=" text-2xl text-center">{userData?.name}</h2>
                <p className=" text-center">{userData.role}</p>
            </div>

            <form onSubmit={(e)=> e.preventDefault()}>
            {/* Photo file */}
             <div>
                <lebel htmlFor="image">Image</lebel>
                <input className="px-4 border-2 border-black " type="file" name="photoUrl" id="image" placeholder="photoUrl" accept="image/*" onChange={(e)=>setPhotoUrl(e.target.files[0])}/>
             </div>
            {/* user name */}
             <div>
                <lebel htmlFor="name">User Name</lebel>
                <input className="px-4 border-2 border-black " type="text" name="name" id="name" placeholder={userData?.name} onChange={(e)=>setName(e.target.value)} value={name}/>
             </div>
            {/* email file */}
             <div>
                 <lebel >Email</lebel>
                <input readOnly className="px-4 border-2 border-black " type="text" name="email" placeholder={userData?.email}/>
             </div>
            {/* email file */}
             <div>
                 <lebel >Description</lebel>
                <textarea rows={3} className="px-4 border-2 border-black " name="description" onChange={(e)=>setDescription(e.target.value)} value={description}/>
             </div>
             <button disabled={loading} onClick={handleEditProfile} className=" p-4 bg-green-300">{loading ? <ClipLoader size={30} color="white"></ClipLoader> : "save changes"} </button>

            </form>
            
        </div>
    );
};

export default EditProfile;