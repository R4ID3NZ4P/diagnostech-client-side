import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import useDetails from "../../Hooks/useDetails";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";


const Reservations = () => {
    const axiosSecure = useAxiosSecure();
    const params = useParams();
    const {data: testData} = useDetails(params.id);
    const { data = [], refetch, isPending } = useQuery({
        queryKey: ['reservations', params.id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reservations/${params.id}`);
            return res.data;
        }
    });
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    if (isPending) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex justify-center items-center">
                    <div className="flex flex-col gap-4 w-96">
                        <div className="skeleton h-32 w-full"></div>
                        <div className="skeleton h-4 w-28"></div>
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-full"></div>
                    </div>
                </div>
            </div>
        );
    }

    const handleCancel = (id, email) => {
        Swal.fire({
            title: "Are you sure you want to cancel?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel appointment"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/reservations?service=${id}&email=${email}`)
                .then(res => {
                    if(res.data.deletedCount > 0) {
                        Swal.fire({
                            title: "Cancelled!",
                            text: "Your appointment has been cancelled.",
                            icon: "success"
                        });
                        refetch();
                    }
                })
            }
        });
    };

    const handleSubmit = (e, id) => {
        e.preventDefault();
        const result = e.target.result.value;
        const body = {
            result,
            status: "delivered"
        };
        axiosSecure.patch(`/reservations/${id}`, body)
        .then(res => {
            if(res.data.modifiedCount > 0) {
                Swal.fire({
                    title: "Result Delivered!",
                    text: "The result has been delivered",
                    icon: "success"
                });
                refetch();
            }
        });
    }

    const handleChange = e => {
        setSearch(e.target.value);
        console.log(search);
    }

    const handleSearch = () => {
        const filtered = data.filter(item => item.email.includes(search));
        if(filtered.length > 0) setFilteredData(filtered);
        else setFilteredData([]);
    }
    
    return (
        <div className="flex flex-col items-center w-full">
            <h1 className="text-3xl font-bold text-center my-12">Reservations of {testData.name}</h1>
            <div className="join">
            <div>
                <div>
                <input onChange={handleChange} className="input input-bordered join-item" placeholder="Search"/>
                </div>
            </div>
            <div className="indicator">
                <button onClick={handleSearch} className="btn join-item">Search</button>
            </div>
            </div>
            <div className="overflow-x-auto mb-6 w-full">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {console.log(filteredData)}
                        {filteredData.length === 0 && <tr><td className="text-center" colSpan={5}>No Reservations</td></tr>}
                        {filteredData.map((test, idx) => 
                            <tr key={test._id}>
                                <th>{(idx + 1)}</th>
                                <td>{test.name}</td>
                                <td>{test.email}</td>
                                <td><button onClick={() => handleCancel(test.service, test.email)} className="btn btn-sm btn-error">Cancel</button></td>
                                <td><button onClick={()=>document.getElementById(`submit-${test._id}`).showModal()} className="btn btn-sm btn-info" disabled={test.status === "delivered"}>Submit Result</button></td>
                                {/* Open the modal using document.getElementById('ID').showModal() method */}
                                <dialog id={`submit-${test._id}`} className="modal modal-bottom sm:modal-middle">
                                <div className="modal-box">
                                    <h3 className="font-bold text-lg">Submit Result</h3>
                                    <p className="py-4">Enter the result document link:</p>
                                    <form onSubmit={() => handleSubmit(event, test._id)}>
                                        <div className="join">
                                            <input name="result" className="input input-bordered join-item" placeholder="Link"/>
                                            <button onClick={()=>document.getElementById(`submit-${test._id}`).close()} className="btn join-item rounded-r-lg">Submit</button>
                                        </div>
                                    </form>
                                    <div className="modal-action">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn">Close</button>
                                    </form>
                                    </div>
                                </div>
                                </dialog>
                            </tr>)
                        }
                    
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Reservations;