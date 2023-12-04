import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const Home = () => {
    const axiosPublic = useAxiosPublic();
    const [banner, setBanner] = useState({});

    useEffect(() => {
        axiosPublic.get("/banner")
        .then(res => {
            setBanner(res.data);
        });
    }, [axiosPublic])

    return (
        <div className="py-6 px-5 lg:px-32 bg-gradient-to-r from-white to-[#038b9d7a]">
            <div className="hero lg:h-[75vh] mb-6" style={{backgroundImage: `url(${banner.image})`}}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-xl">
                    <h1 className="mb-5 text-5xl font-bold">{banner.title}</h1>
                    <p className="mb-5">{banner.description}</p>
                    <p className="mb-5">Start your journey with us with this special coupon <span className="font-semibold">{banner.coupon}</span> granting you a discount of <span className="font-semibold">{banner.rate}%</span> on all medical tests!</p>

                    <Link to={"/tests"} className="btn btn-primary text-white">Book an Appointment Now</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;