import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useTests from '../../Hooks/useTests';
import { useNavigate } from 'react-router-dom';

const Tests = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const {testData, refetch, isPending} = useTests();

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
                axiosSecure.delete(`/tests/${id}`)
                .then(res => {
                    if(res.data.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "The test has been deleted.",
                            icon: "success"
                        });
                        refetch();
                    }
                })
            }
        });
    };

    const handleUpdate = (id) => {
        navigate(`update/${id}`);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-center my-12">All Tests</h1>
            <div className="overflow-x-auto mb-6">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Date</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {testData.length === 0 && <tr><td className="text-center" colSpan={4}>No Tests</td></tr>}
                        {testData.map((test, idx) => 
                            <tr key={test._id}>
                                <th>{(idx + 1)}</th>
                                <td>{test.name}</td>
                                <td>{test.date}</td>
                                <td><button onClick={() => handleDelete(test._id)} className="btn btn-sm btn-error">Delete</button></td>
                                <td><button onClick={() => handleUpdate(test._id)} className="btn btn-sm btn-warning">Update</button></td>
                                <td><button className="btn btn-sm btn-info">Reservations</button></td>
                            </tr>)
                        }
                    
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Tests;