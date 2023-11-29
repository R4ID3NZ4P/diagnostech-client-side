import { useEffect, useState } from "react";
import useTests from "../../Hooks/useTests";
import TestCard from "./TestCard";

const AllTests = () => {
    // const [tests, setTests] = useState([]);
    const { testData, refetch, isPending } = useTests();
    const [data, setData] = useState([]);

    useEffect(() => {
        const temp = testData.filter(item => {
            return new Date(item.date) > new Date(Date.now());
        });
        setData(temp);
    }, [testData])

    if (isPending) {
        return (
            <div className="min-h-screen px-5 lg:px-32 bg-gradient-to-r from-white to-[#038b9d7a] flex items-center justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="flex flex-col gap-4 w-96">
                        <div className="skeleton h-32 w-full"></div>
                        <div className="skeleton h-4 w-28"></div>
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-full"></div>
                    </div>
                    <div className="flex flex-col gap-4 w-96">
                        <div className="skeleton h-32 w-full"></div>
                        <div className="skeleton h-4 w-28"></div>
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-full"></div>
                    </div>
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
    console.log(testData);


    return (
        <div className="min-h-screen py-12 px-5 lg:px-32 bg-gradient-to-r from-white to-[#038b9d7a] flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold text-center py-6">All Tests</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((test) => (
                    <TestCard key={test._id} data={test}></TestCard>
                ))}
            </div>
        </div>
    );
};

export default AllTests;
