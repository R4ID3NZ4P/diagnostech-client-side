import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const AllUsers = () => {

    const axiosSecure = useAxiosSecure();
    const { data = [], refetch, isPending } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            console.log(res.data);
            return res.data;
        }
    });

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

    const handleAdmin = (email) => {
        axiosSecure.patch(`/users/admin/${email}`)
        .then(res => {
            console.log(res.data);
            if(res.data?.modifiedCount > 0) {
                refetch();
            }
        });
    };

    const handleStatus = (email, status) => {
        const updatedStatus = status === "active" ? "blocked" : "active";
        axiosSecure.patch(`/user/${email}`, {status: updatedStatus})
        .then(res => {
            console.log(res.data);
            if(res.data?.modifiedCount > 0) {
                refetch();
            }
        });
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-center my-12">All Users</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map(user => <tr key={user._id}>
                        <td>
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                    <img src={user.avatar} />
                                </div>
                                </div>
                                <div>
                                <div className="font-bold">{user.name}</div>
                                <div className="text-sm opacity-50">{user.email}</div>
                            </div>
                        </div>
                        </td>
                        <td>
                            {user.isAdmin ? "Admin" : "Not Admin"}
                            <br/>
                            <span className="badge badge-ghost badge-sm">{user.status}</span>
                        </td>
                        <td>
                            <button onClick={() => handleAdmin(user.email)} className="btn btn-error btn-xs" disabled={user.isAdmin}>Make Admin</button>
                        </td>
                        <td>
                            <button onClick={() => handleStatus(user.email, user.status)} className="btn btn-accent btn-xs">Change Status</button>
                        </td>
                        <th>
                            <button className="btn btn-warning btn-xs" onClick={()=>document.getElementById(`user-${user._id}`).showModal()}>See Info</button>
                        </th>
                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        <dialog id={`user-${user._id}`} className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">{user.name}</h3>
                            <p className="py-4"><span className="font-semibold">Email:</span> {user.email}</p>
                            <p className="py-4"><span className="font-semibold">Status:</span> {user.status}</p>
                            <p className="py-4"><span className="font-semibold">Blood Group:</span> {user.bg}</p>
                            <p className="py-4"><span className="font-semibold">District:</span> {user.district}</p>
                            <p className="py-4"><span className="font-semibold">Upazila:</span> {user.upazila}</p>
                            <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn">Close</button>
                            </form>
                            </div>
                        </div>
                        </dialog>
                    </tr>)}
                    
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;