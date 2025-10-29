import { useEffect } from "react";
import axios from 'axios';
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const getCurrentUser = () => {
    const dispatch = useDispatch();
    useEffect(()=> {
       const fetchUser = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/user/getcurrentuser`, {withCredentials: true});
            dispatch(setUserData(result.data));
            console.log(result);
        } catch (error) {
            console.log(error);
            dispatch(setUserData(null));
        }
       }
       fetchUser();
    },[dispatch])
};

export default getCurrentUser;