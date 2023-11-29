import { useState } from "react";


const AllTests = () => {

    const [tests, setTests] = useState([]);

    return (
        <div className="min-h-screen px-5 lg:px-32 bg-gradient-to-r from-white to-[#038b9d7a]">
            <h1>All Tests</h1>
            <input type="date" className="w-full max-w-xs" />
        </div>
    );
};

export default AllTests;