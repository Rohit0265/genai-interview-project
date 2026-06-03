import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protector from "./features/auth/components/Protector.jsx";

export const router = createBrowserRouter([
    {
        path:"/login",
        element:<Login />
    },
    {
        path:"/register",
        element:<Register />
    },
    {
        path:"/",
        element:
        <Protector>
            <h1>Home Page</h1>
        </Protector>
    }
])