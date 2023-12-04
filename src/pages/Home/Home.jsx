import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import useTests from "../../Hooks/useTests";
import TestCard from "../AllTests/TestCard";
import { register } from 'swiper/element/bundle';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';
// register Swiper custom elements
register();

const Home = () => {
    const axiosPublic = useAxiosPublic();
    const [banner, setBanner] = useState({});
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        axiosPublic.get("/banner")
        .then(res => {
            setBanner(res.data);
        });

        axiosPublic.get("/recommendations")
        .then(res => {
            setRecommendations(res.data);
        });
    }, [axiosPublic]);

    const {testData} = useTests();
    const [featured, setFeatured] = useState([]);

    useEffect(() => {
        const sorted = testData.sort((a, b) => b.booked - a.booked);
        const filtered = sorted.slice(0, 6);
        setFeatured(filtered);
    }, [testData])

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

            <h1 className="text-3xl font-bold text-center my-12">Featured Tests and Promotions</h1> 
            <div className="flex flex-col items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featured.map((test) => (
                        <TestCard key={test._id} data={test}></TestCard>
                    ))}
                </div>
            </div>

            <h1 className="text-3xl font-bold text-center my-12">Recommendations</h1> 
            <div className="items-center w-full lg:w-9/12 mx-auto">
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                    {recommendations.map(item => <SwiperSlide key={item._id}>
                        <div className="text-center">
                            <h1 className="font-semibold">{item.tip}</h1>
                            <p>{item.description}</p>
                        </div>
                    </SwiperSlide>)}
                </Swiper>
            </div>
        </div>
    );
};

export default Home;