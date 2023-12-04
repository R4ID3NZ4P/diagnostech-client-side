import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../pages/Home/Home";
import AllTests from "../pages/AllTests/AllTests";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Error from "../pages/Error/Error";
import Details from "../pages/Details/Details";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layouts/Dashboard";
import UserHome from "../Dashboard/UserHome/UserHome";
import Appointments from "../Dashboard/Appointments/Appointments";
import Results from "../Dashboard/Results/Results";
import AllUsers from "../Dashboard/AllUsers/AllUsers";
import AdminRoute from "./AdminRoute";
import AddATest from "../Dashboard/AddATest/AddATest";
import Tests from "../Dashboard/Tests/Tests";
import Reservations from "../Dashboard/Reservations/Reservations";
import AddABanner from "../Dashboard/AddABanner/AddABanner";
import AllBanners from "../Dashboard/AllBanners/AllBanners";
import UpdateTest from "../Dashboard/UpdateTest/UpdateTest";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <Error></Error>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
              path: "/tests",
              element: <AllTests></AllTests>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "/tests/:id",
                element: <PrivateRoute><Details></Details></PrivateRoute>
            }
        ],
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        errorElement: <Error></Error>,
        children: [
            {
                path: "userHome",
                element: <UserHome></UserHome>
            },
            {
                path: "userAppointments",
                element: <Appointments></Appointments>
            },
            {
                path: "userResults",
                element: <Results></Results>
            },
            {
                path: "allUsers",
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: "addTest",
                element: <AdminRoute><AddATest></AddATest></AdminRoute>
            },
            {
                path: "allTests",
                element: <AdminRoute><Tests></Tests></AdminRoute>
            },
            {
                path: "addBanner",
                element: <AdminRoute><AddABanner></AddABanner></AdminRoute>
            },
            {
                path: "allBanners",
                element: <AdminRoute><AllBanners></AllBanners></AdminRoute>
            },
            {
                path: "allTests/update/:id",
                element: <AdminRoute><UpdateTest></UpdateTest></AdminRoute>
            },
            {
                path: "allTests/reservations/:id",
                element: <AdminRoute><Reservations></Reservations></AdminRoute>
            },
        ]
    }
]);
