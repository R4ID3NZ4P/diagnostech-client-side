import { Link, NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";

const Dashboard = () => {
    const { isAdmin } = useAdmin();

    const navLinks = isAdmin ? (
        <>
            <li>
                <NavLink to={"/dashboard/allUsers"}>All Users</NavLink>
            </li>

            <li>
                <NavLink to={"/dashboard/addTest"}>Add A Test</NavLink>
            </li>

            <li>
                <NavLink to={"/dashboard/allTests"}>All Tests</NavLink>
            </li>

            <li>
                <NavLink to={"/dashboard/reservations"}>Reservations</NavLink>
            </li>

            <li>
                <NavLink to={"/dashboard/addBanner"}>Add A Banner</NavLink>
            </li>

            <li>  
                <NavLink to={"/dashboard/allBanners"}>All Banners</NavLink>
            </li>
        </>
    ) : (
        <>
            <li>
                <NavLink to={"/dashboard/userHome"}>
                    My Profile
                </NavLink>
            </li>
            <li>
                <NavLink to={"/dashboard/userAppointments"}>
                    Upcoming Appointments
                </NavLink>
            </li>
            <li>
                <NavLink to={"/dashboard/userResults"}>
                    Test Results
                </NavLink>
            </li>
        </>
    );

    return (
        <div>
            <div className="navbar bg-[#FFCF56] px-5 lg:px-32">
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
                        <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><Link to={"/"}>
                                Home
                            </Link></li>
                            {navLinks}
                        </ul>
                    </div>
                    <Link
                        to={"/"}
                        className="text-primary text-2xl font-semibold"
                    >
                        DiagnosTech
                    </Link>
                </div>
                <div className="navbar-end hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                            <li><Link to={"/"}>
                                Home
                            </Link></li>
                        {navLinks}
                    </ul>
                </div>
            </div>
            <div className=" px-5 lg:px-32">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;
