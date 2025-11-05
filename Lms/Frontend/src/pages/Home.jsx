import Navbar from "../component/Navbar";
import home1 from "../assets/home1.jpg"
import Logos from "../component/Logos";
import ExplorCources from "../component/ExplorCources";
import CardPage from "../component/CardPage";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate()
    return (
        <div className={`w-[100%] overflow-hidden  bg-amber-200`}>
            <Navbar></Navbar>
            <div className=" w-6/12 h-[100vh] mx-auto flex justify-center items-center gap-3 ">
                {/* <img className=" object-cover md:object-fill w-[100%] md:h-[100%] h-[50vh]" src={home1} alt="" /> */}
                <div className=" w-6/12 h-[50vh] mx-auto flex justify-center items-center gap-3">
                <button onClick={()=> navigate("/allcourses")} className="p-4 bg-green-200 rounded-xl">All cources</button>
                <button className="p-4 bg-green-200 rounded-xl">Search with ai</button>
                </div>
            </div>
            <Logos></Logos>
            <ExplorCources></ExplorCources>
            <CardPage></CardPage>
        </div>
    );
};

export default Home;