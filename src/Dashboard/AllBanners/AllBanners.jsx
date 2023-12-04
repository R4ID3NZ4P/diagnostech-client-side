import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AllBanners = () => {
    const axiosSecure = useAxiosSecure();
    const { data: banners = [], refetch, isPending } = useQuery({
        queryKey: ['banners'],
        queryFn: async () => {
            const res = await axiosSecure.get("/banners");
            console.log(res.data);
            return res.data;
        }
    });

    const handleActive = (id) => {
        axiosSecure.patch(`/banners/${id}`).then(res => {
            if(res.data.modifiedCount > 0) refetch();
        });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure you want to delete?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/banners/${id}`)
                .then(res => {
                    if(res.data.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "The banner has been deleted.",
                            icon: "success"
                        });
                        refetch();
                    }
                })
            }
        });
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-center my-12">All Banners</h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Coupon</th>
                        <th>Status</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {banners.length === 0 && <tr><td className="text-center" colSpan={4}>No Appointments</td></tr>}
                        {banners.map((banner, idx) => 
                            <tr key={banner._id}>
                                <th>{(idx + 1)}</th>
                                <td>{banner.title}</td>
                                <td>{banner.coupon}</td>
                                <td>{banner.isActive ? "Active" : "Inactive"}</td>
                                <td><button onClick={() => handleActive(banner._id)} className="btn btn-sm btn-success" disabled={banner.isActive}>Make Active</button></td>
                                <td><button onClick={() => handleDelete(banner._id)} className="btn btn-sm btn-error">Delete</button></td>
                            </tr>)
                        }
                    
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllBanners;