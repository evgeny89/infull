import {NotificationManager} from "react-notifications";
import {createBrowserRouter} from "react-router-dom";
import App from "./Compnents/App";
import Error from "./Compnents/Error";
import Login from "./Compnents/childrens/Login";

export const createNotification = (type, message) => {
    switch (type) {
        case 'info':
            NotificationManager.info(message);
            break;
        case 'success':
            NotificationManager.success(message);
            break;
        case 'warning':
            NotificationManager.warning(message, null, 3000);
            break;
        case 'error':
            NotificationManager.error(message, 'error', 5000);
            break;
    }
};

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <Error/>,
        children: [
            {
                path: "login",
                element: <Login />,
            },
        ],
    },

]);
