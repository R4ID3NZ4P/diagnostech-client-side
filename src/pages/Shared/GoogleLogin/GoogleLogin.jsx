import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";


const GoogleLogin = ({location}) => {

    const {googleLogin} = useAuth();
    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        googleLogin()
        .then(res => {
            console.log(res);
            Swal.fire({
                position: "top",
                icon: "success",
                title: `${res.user?.displayName} Logged In Successfully`,
                showConfirmButton: false,
                timer: 1500
              });
              if(location.state?.from) navigate(location.state?.from)
                else navigate("/");
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