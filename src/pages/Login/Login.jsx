import { Link, useLocation, useNavigate } from "react-router-dom";
import loginImage from "../../assets/login.jpg";
import GoogleLogin from "../Shared/GoogleLogin/GoogleLogin";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const Login = () => {

    const {login} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    
    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;


        login(email, password)
        .then((res) => {
            Swal.fire({
                position: "top",
                icon: "success",
                title: `${res.user?.displayName} Logged In Successfully`,
                showConfirmButton: false,
                timer: 1500
              });
              if(location.state?.from) navigate(location.state?.from)
                else navigate("/");
        }).catch((error) => {
            if(error.code === "auth/invalid-login-credentials" || error.code === "auth/invalid-credential") {
                Swal.fire({
                    position: "top",
                    icon: "error",
                    title: "Invalid Email or Password",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
            // console.log(error);
        });
    }

    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row lg:items-end gap-0">
                <div className="text-center lg:text-left">
                    <h1 className="text-3xl font-bold mb-4 text-primary">Login</h1>
                    <img src={loginImage} alt="" />
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl rounded-none h-[486px]">
                    <form className="card-body" onSubmit={handleLogin}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Your email"
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Your Password"
                                className="input input-bordered"
                                required
                            />
                            <label className="label">
                                <a
                                    href="#"
                                    className="label-text-alt link link-hover"
                                >
                                    Forgot password?
                                </a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input type="submit" value={"Login"} className="btn btn-primary text-white"></input>
                        </div>
                        <GoogleLogin location={location}></GoogleLogin>
                        <label className="label">
                                <p
                                    className="label-text-alt"
                                >
                                    New here?
                                   <Link to={"/register"} className="link link-hover ml-1 text-primary">Register now!</Link>  
                                </p>
                            </label>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
