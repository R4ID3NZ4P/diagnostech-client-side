import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UserHome = () => {
    const axiosSecure = useAxiosSecure();
    const { update, user } = useAuth();
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        axiosSecure.get(`/user/${user.email}`).then((res) => {
            setUserInfo(res.data);
        });
    }, [axiosSecure, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        update(name)
            .then(() => {
                axiosSecure.patch("/user", {email: user.email, name})
                    .then(res => {
                        if(res) {
                            Swal.fire({
                                position: "top",
                                icon: "success",
                                title: "Updated Successfully",
                                showConfirmButton: false,
                                timer: 1500
                              });
                        }
                    })
            })

    }

    return (
        <div className="mt-12 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center">
                <div className="avatar">
                    <div className="w-36 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={userInfo?.avatar} />
                    </div>
                </div>
                <div className="hero">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div className="card shrink-0 w-full max-w-sm shadow-2xl">
                            <form className="card-body" onSubmit={handleSubmit}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Email
                                        </span>
                                    </label>
                                    <input
                                        type="email"
                                        defaultValue={userInfo?.email}
                                        placeholder="email"
                                        className="input input-bordered"
                                        disabled
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Name
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        defaultValue={userInfo?.name}
                                        placeholder="Name"
                                        className="input input-bordered"
                                    />
                                </div>
                                
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary text-white">
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserHome;
