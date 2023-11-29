import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleLogin from "../Shared/GoogleLogin/GoogleLogin";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Register = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const { register: signUp, update } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);

    useEffect(() => {
        fetch("/districts.json")
        .then(res => res.json())
        .then(data => setDistricts(data[2].data));
        fetch("/upazilas.json")
        .then(res => res.json())
        .then(data => setUpazilas(data[2].data));

    }, []);

    const imgKey = import.meta.env.VITE_imageAPI;
    const imgbb = `https://api.imgbb.com/1/upload?key=${imgKey}`;
    const onSubmit = async (data) => {
        console.log(data);
        const image = {image: data?.avatar[0]};
        const res = await axiosPublic.post(imgbb, image, {
            headers: {
                'content-type': 'multipart/form-data',
              }
        });
        let avatar;
        console.log(res);
        if(res.data.success) {
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
            isAdmin: false
        };
        console.log(userData);

        // signUp(userData.email, userData.)
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut
                        assumenda excepturi exercitationem quasi. In deleniti
                        eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Email"
                                className="input input-bordered"
                                {...register("email")}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Name"
                                className="input input-bordered"
                                {...register("name")}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Avatar</span>
                            </label>
                            <input
                                type="file"
                                className="file-input file-input-bordered w-full max-w-xs file-input-primary"
                                {...register("avatar")}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Blood Group</span>
                            </label>
                            <select name="bg" className="select select-bordered w-full max-w-xs" {...register("bg")} required>
                                <option disabled selected>
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
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">District</span>
                            </label>
                            <select name="district" className="select select-bordered w-full max-w-xs" {...register("district")} required>
                                <option disabled selected>
                                    ---District---
                                </option>
                                {districts.map(data => <option key={data.id} value={data.name}>{data.name}</option>)}
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Upazila</span>
                            </label>
                            <select name="upazila" className="select select-bordered w-full max-w-xs" {...register("upazila")} required>
                                <option disabled selected>
                                    ---Upazila---
                                </option>
                                {upazilas.map(data => <option key={data.id} value={data.name}>{data.name}</option>)}
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="password"
                                className="input input-bordered"
                                {...register("password")}
                                required
                            />
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
                                {...register("confirm")}
                                required
                            />
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
