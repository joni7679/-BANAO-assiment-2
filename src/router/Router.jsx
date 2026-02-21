import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ScreenTest from "../pages/ScreenTest";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/screen-test",
        element: <ScreenTest />
    }
])