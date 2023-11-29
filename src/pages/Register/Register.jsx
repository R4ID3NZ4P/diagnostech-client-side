import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import GoogleLogin from "../Shared/GoogleLogin/GoogleLogin";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Register = () => {
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm();

    const { user, register: signUp, update, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);

    //load districts and upazilas
    useEffect(() => {
        fetch("/districts.json")
            .then((res) => res.json())
            .then((data) => setDistricts(data[2].data));
        fetch("/upazilas.json")
            .then((res) => res.json())
            .then((data) => setUpazilas(data[2].data));
    }, []);

    if(user) return (<Navigate to={"/"}></Navigate>);

    const imgKey = import.meta.env.VITE_imageAPI;
    const imgbb = `https://api.imgbb.com/1/upload?key=${imgKey}`;
    const onSubmit = async (data) => {
        console.log(data);
        const image = { image: data?.avatar[0] };
        const res = await axiosPublic.post(imgbb, image, {
            headers: {
                "content-type": "multipart/form-data",
            },
        });
        let avatar = "https://i.ibb.co/FVwc5P9/usericon.png";
        console.log(res);
        if (res.data.success) {
            avatar = res.data?.data?.display_url;
            // console.log(avatar);
        }
        const userData = {
            email: data.email,
            name: data.name,
            bg: data.bg,
            avatar: avatar,
            district: data.district,
            upazila: data.upazila,
            status: "active",
            isAdmin: false,
        };
        console.log(userData);

        signUp(data.email, data.password)
        .then(res => {
            console.log(res);
            update(userData.name, userData.avatar)
            .then(() => {
                axiosPublic.post("/users", userData)
                .then(res => {
                    console.log(res.data);
                    if(res.data.insertedId) {
                        Swal.fire({
                            position: "top",
                            icon: "success",
                            title: "Successfully registered! Please sign in with your credentials",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        logout()
                        .then(() => {
                            navigate("/login", {state: location?.state});
                        }); 
                    }
                })
            })
        })
    };

    return (
        <div className="hero min-h-screen bg-gradient-to-r from-white to-[#038b9d7a]">
            <div className="hero-content flex-col">
                <h1 className="text-3xl mb-6 font-bold text-primary">Register</h1>
                <div className="card shrink-0 shadow-2xl bg-base-100">
                    <form
                        className="card-body"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Email"
                                className="input input-bordered"
                                {...register("email", {
                                    required: true,
                                })}
                            />
                            {errors?.email?.type === "required" && <p className="text-red-500 text-xs mt-1">
                                This field is required
                            </p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Name"
                                className="input input-bordered"
                                {...register("name", {
                                    required: true,
                                })}
                            />
                            {errors?.name?.type === "required" && <p className="text-red-500 text-xs mt-1">
                                This field is required
                            </p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Avatar</span>
                            </label>
                            <input
                                type="file"
                                className="file-input file-input-bordered w-full max-w-xs file-input-primary"
                                {...register("avatar", {
                                    required: true,
                                })}
                            />
                            {errors?.avatar?.type === "required" && <p className="text-red-500 text-xs mt-1">
                                Please provide an image
                            </p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Blood Group</span>
                            </label>
                            <select
                                name="bg"
                                defaultValue={"default"}
                                className="select select-bordered w-full max-w-xs"
                                {...register("bg", {
                                    required: true,
                                    validate: value => value !== "default" || "Please select a valid option"
                                })}
                            >
                                <option disabled value={"default"}>
                                    ---Blood Group---
                                </option>
                                <option value={"A+"}>A+</option>
                                <option value={"A-"}>A-</option>
                                <option value={"B+"}>B+</option>
                                <option value={"B-"}>B-</option>
                                <option value={"O+"}>O+</option>
                                <option value={"O-"}>O-</option>
                                <option value={"AB+"}>AB+</option>
                                <option value={"AB-"}>AB-</option>
                            </select>
                            {errors?.bg && <p className="text-red-500 text-xs mt-1">
                                {errors?.bg?.message}
                            </p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">District</span>
                            </label>
                            <select
                                name="district"
                                defaultValue={"default"}
                                className="select select-bordered w-full max-w-xs"
                                {...register("district", {
                                    required: true,
                                    validate: value => value !== "default" || "Please select a valid option"
                                })}
                            >
                                <option disabled value={"default"}>
                                    ---District---
                                </option>
                                {districts.map((data) => (
                                    <option key={data.id} value={data.name}>
                                        {data.name}
                                    </option>
                                ))}
                            </select>
                            {errors?.district && <p className="text-red-500 text-xs mt-1">
                                {errors?.district?.message}
                            </p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Upazila</span>
                            </label>
                            <select
                                name="upazila"
                                defaultValue={"default"}
                                className="select select-bordered w-full max-w-xs"
                                {...register("upazila", {
                                    required: true,
                                    validate: value => value !== "default" || "Please select a valid option"
                                })}
                            >
                                <option disabled value={"default"}>
                                    ---Upazila---
                                </option>
                                {upazilas.map((data) => (
                                    <option key={data.id} value={data.name}>
                                        {data.name}
                                    </option>
                                ))}
                            </select>
                            {errors?.upazila && <p className="text-red-500 text-xs mt-1">
                                {errors?.upazila?.message}
                            </p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="password"
                                className="input input-bordered"
                                {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern:
                                        /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                                })}
                            />
                            {errors.password?.type === "required" && (
                                <p className="text-red-500 text-xs mt-1">
                                    Password is required
                                </p>
                            )}
                            {errors.password?.type === "minLength" && (
                                <p className="text-red-500 text-xs mt-1">
                                    Password must be at least 6 characters long
                                </p>
                            )}
                            {errors.password?.type === "maxLength" && (
                                <p className="text-red-500 text-xs mt-1">
                                    Password must be less than 20 characters
                                </p>
                            )}
                            {errors.password?.type === "pattern" && (
                                <p className="text-red-500 text-xs mt-1">
                                    Password must have an uppercase letter, a number and a special character.
                                </p>
                            )}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">
                                    Confirm Password
                                </span>
                            </label>
                            <input
                                type="password"
                                placeholder="Confirm password"
                                className="input input-bordered"
                                {...register("confirm", {
                                    required: true,
                                    validate: value =>
                                    value === getValues("password") || "The passwords do not match"
                                })}
                            />
                            {errors?.confirm?.type === "validate" && <p className="text-red-500 text-xs mt-1">
                                {errors?.confirm?.message}
                            </p>}
                            {errors?.confirm?.type === "required" && <p className="text-red-500 text-xs mt-1">
                                Please retype your password
                            </p>}
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary text-white">
                                Register
                            </button>
                        </div>
                        <GoogleLogin location={location}></GoogleLogin>
                        <label className="label">
                            <p className="label-text-alt">
                                Already have an account?
                                <Link
                                    to={"/login"}
                                    className="link link-hover ml-1 text-primary"
                                >
                                    Login
                                </Link>
                            </p>
                        </label>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
