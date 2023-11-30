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
            }
        ]
    }
]);
