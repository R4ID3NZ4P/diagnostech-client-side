import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";


const Appointments = () => {

    const {user, loading} = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: tests = [], refetch, isPending } = useQuery({
        queryKey: ['appointments'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings/${user.email}`);
            console.log(res.data);
            return res.data;
        }
    });

    const handleDelete = id => {
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
                axiosSecure.delete(`/bookings/${id}`)
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
    }

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

    return (
        <div>
            <h1 className="text-3xl font-bold text-center my-12">Appointments</h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Date</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {tests.length === 0 && <tr><td className="text-center" colSpan={4}>No Appointments</td></tr>}
                        {tests.map((test, idx) => 
                            <tr key={test._id}>
                                <th>{(idx + 1)}</th>
                                <td>{test.name}</td>
                                <td>{test.date}</td>
                                <td><button onClick={() => handleDelete(test._id)} className="btn btn-sm btn-error">Cancel</button></td>
                            </tr>)
                        }
                    
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Appointments;