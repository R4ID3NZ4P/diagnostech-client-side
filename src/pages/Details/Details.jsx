import { useParams } from "react-router-dom";
import useDetails from "../../Hooks/useDetails";
import { FaArrowCircleRight } from "react-icons/fa";


const Details = () => {
    
    const params = useParams();
    console.log(params);
    const {data, refetch, isPending} = useDetails(params.id);
    console.log(data);
    const { booked, date, details, image, name, price, slots, _id } = data;
    
    return (
        <div className="min-h-screen py-12 px-5 lg:px-32 bg-gradient-to-r from-white to-[#038b9d7a] flex items-center justify-center">
            <div className="py-12">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20">
                    <div>
                        <img src={image} alt="" className="lg:w-[900px]" />
                    </div>
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl text-secondary font-bold mb-6">{name}</h1>
                        <p className="mb-6"><span className="text-secondary font-semibold">Booked Slots: </span>{booked}</p>
                        <p className="mb-6"><span className="text-secondary font-semibold">Available Slots: </span>{slots}</p>
                        <p className="mb-6"><span className="text-secondary font-semibold">Available Date: </span>{date}</p>
                        <button className="btn btn-primary px-8 rounded-badge text-white" disabled={slots === 0 ? true : false} >Book Now <FaArrowCircleRight className="text-2xl" /></button>
                    </div>
                </div>
                <div className="mt-12">
                    <div role="tablist" className="tabs tabs-lifted">
                        <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Details" checked />
                        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                            <h1 className="text-2xl font-bold mb-6 text-secondary">Details</h1>
                            {details}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;