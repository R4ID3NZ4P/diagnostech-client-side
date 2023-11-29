import { Link } from "react-router-dom";
import errorImage from "../../assets/error.png";

const Error = () => {
    return (
        <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-14">
            <div className="text-center">
                <h6 className="text-9xl font-bold">404</h6>
                <p className="text-teal-800">Oops! The page was not found</p>
                <Link className="text-primary underline">Go To Homepage?</Link>
            </div>
            <div>
                <img src={errorImage} alt="" />
            </div>
        </div>
    );
};

export default Error;