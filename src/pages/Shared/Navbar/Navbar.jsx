import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import useAdmin from "../../../Hooks/useAdmin";


const Navbar = () => {

    const {user, loading, logout} = useAuth();
    const { isAdmin } = useAdmin();

    const navLinks = 
    <>
        <li><NavLink to={"/"}>Home</NavLink></li>
        <li><NavLink to={"/tests"}>All Tests</NavLink></li>
        {user ? (isAdmin ?
            <li><NavLink to={"/dashboard/adminHome"}>Admin Dashboard</NavLink></li> : 
            <li><NavLink to={"/dashboard/userHome"}>Dashboard</NavLink></li>) : 
            <></>
        }
    </>

    return (
        <div className="navbar px-5 lg:px-32 bg-gradient-to-r from-white to-[#038b9d7a]">
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
            {/* <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-secondary font-semibold">
                    {navLinks}
                </ul>
            </div> */}
            <div className="navbar-end">
                <div className="mr-12 hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-secondary font-semibold">
                        {navLinks}
                    </ul>
                </div>
                {user ? <>
                    <div className="tooltip tooltip-bottom mr-6 flex justify-center items-center" data-tip={user?.displayName}>
                        <div className="avatar">
                            <div className="w-12 rounded-full">
                            <img src={user?.photoURL} />
                            </div>
                        </div>
                    </div> 
                    <button onClick={logout} className="btn btn-md px-6 rounded-badge btn-primary text-white">Logout</button> 
                    </>
                : 
                        <Link to={"/login"} className="btn btn-md px-6 rounded-badge btn-primary text-white">Login</Link>
                }
            </div>
        </div>
    );
};

export default Navbar;
