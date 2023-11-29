import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";


const Navbar = () => {

    const {user, loading} = useAuth();

    const navLinks = 
    <>
        <li><NavLink to={"/"}>Home</NavLink></li>
        <li><NavLink to={"/all"}>All Tests</NavLink></li>
        <li><NavLink to={"/login"}>Login</NavLink></li>
        <li><NavLink to={"/userDashboard"}>Dashboard</NavLink></li>
        <li><NavLink to={"/adminDashboard"}>Admin Dashboard</NavLink></li>
    </>

    return (
        <div className="navbar px-5 lg:px-32">
            <div className="navbar-start">
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost lg:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-secondary font-semibold">
                        {navLinks}
                    </ul>
                </div>
                <Link to={"/"} className="text-primary text-2xl font-semibold">DiagnosTech</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-secondary font-semibold">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn btn-md btn-primary text-white">Button</a>
            </div>
        </div>
    );
};

export default Navbar;
