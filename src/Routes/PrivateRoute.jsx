import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useUser from "../Hooks/useUser";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";


const PrivateRoute = ({ children }) => {
    const { user, loading, logout } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [userData, setUserData] = useState({status: "active"});

    useEffect(() => {
        if(!user) return;
        axiosSecure.get(`/user/${user.email}`)
        .then(res => {
            setUserData(res.data);
        })
    }, [axiosSecure, user])

    console.log(userData.status, loading);
    const location = useLocation();

    if(loading){
        return <div className="min-h-screen flex items-center justify-center"><progress className="progress w-56"></progress></div>
    }

    if (user) {
        if (userData?.status === "active") return children;
        else {
            Swal.fire({
                position: "top",
                icon: "error",
                title: "Your account has been blocked. Please contact an admin.",
                showConfirmButton: false,
                timer: 1500
            });
            logout();
        }
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default PrivateRoute;