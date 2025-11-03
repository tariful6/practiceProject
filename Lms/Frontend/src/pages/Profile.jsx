import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const {userData} = useSelector(state => state.user)
    console.log(userData);
    const navigate = useNavigate()
    return (
        <div className="">
            
         <div>
                <button onClick={()=> navigate("/")} className=" cursor-pointer p-4 bg-green-200">Home</button>
        </div>
            <div className=" flex flex-col items-center justify-center">
            <img src={userData?.photoUrl} alt=""  className=" w-24 h-24"/>
            <h2 className=" text-2xl text-center">{userData?.name}</h2>
            <p className=" text-center">{userData.role}</p>
            </div>



            <div className=" flex flex-col items-center justify-center">
                <div>
                    <span>Email : </span>
                    <span>{userData?.email} </span>
                </div>
                <div>
                    <span>Bio : </span>
                    <span>{userData?.description} </span>
                </div>
                <div>
                    <span>Enroll Cources : </span>
                    <span>{userData?.enrolledCources?.length} </span>
                </div>
                <div>
                <button onClick={()=> navigate("/editprofile")} className=" p-4 bg-green-200 cursor-pointer">Edit Profile</button>
                </div>
            </div>

         

        </div>
    );
};

export default Profile;