import { useNavigate } from "react-router-dom";

const ExplorCources = () => {
    const navigate = useNavigate()
    return (
        <div className=" h-[400px] w-full bg-fuchsia-300 flex flex-col items-center justify-center">
            ExplorCources
            <button onClick={()=> navigate("/allcourses")} className="p-4 bg-green-300">Explor Cources</button>
        </div>
    );
};

export default ExplorCources;