import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Results = () => {
    const {user, loading} = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: results = [], isPending } = useQuery({
        queryKey: ['results'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/results/${user.email}`);
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


    return (
        <div>
            <h1 className="text-3xl font-bold text-center my-12">Test Results</h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Transaction ID</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                        {results.length === 0 && <tr><td className="text-center" colSpan={4}>No Booked Tests</td></tr>}
                        {results.map((test, idx) => 
                            <tr key={test._id}>
                                <th>{(idx + 1)}</th>
                                <td>{test.name}</td>
                                <td>{test.transactionId}</td>
                                {test.status === "pending" ? <td><button className="btn btn-sm btn-warning">Pending</button></td> :
                                    <td><a href={test.result} className="btn btn-sm btn-success" download={`${test.name}_result.pdf`}>Download Result</a></td>
                                }
                            </tr>)
                        }
                    
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Results;