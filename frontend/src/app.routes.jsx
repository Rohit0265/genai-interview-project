import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protector from "./features/auth/components/Protector.jsx";
import Home from "./features/features/pages/Home.jsx";

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
            <Home />
        </Protector>
    }
])