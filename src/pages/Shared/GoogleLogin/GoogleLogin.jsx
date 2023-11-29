import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";


const GoogleLogin = ({location}) => {

    const {googleLogin} = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const handleGoogleLogin = () => {
        googleLogin()
        .then(res => {
            console.log(res);
            const userData = {
                email: res.user?.email,
                name: res.user?.displayName,
                bg: null,
                avatar: res.user?.photoURL,
                district: null,
                upazila: null,
                status: "active",
                isAdmin: false,
            };
            axiosPublic.post("/users", userData)
                .then((result) => {
                    console.log(result);
                    Swal.fire({
                        position: "top",
                        icon: "success",
                        title: `${res.user?.displayName} Logged In Successfully`,
                        showConfirmButton: false,
                        timer: 1500
                      });
                      if(location.state?.from) navigate(location.state?.from)
                        else navigate("/");
                });
        })
    }

    return (
        <div>
           <div className="divider">Or</div>
           <button type="button" onClick={handleGoogleLogin} className="btn btn-outline btn-primary btn-block">
                <FcGoogle className="text-3xl"></FcGoogle>
                Google
           </button> 
        </div>
    );
};

export default GoogleLogin;