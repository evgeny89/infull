import {NotificationManager} from "react-notifications";
import {createBrowserRouter} from "react-router-dom";

import App from "./Compnents/App";
import Error from "./Compnents/Error";
import Me from "./Compnents/childrens/Me";
import AuthControl from "./Compnents/childrens/AuthControl";
import Index from "./Compnents/childrens/Index";

export const createNotification = (type, message, titleNotify = null) => {
    const title = titleNotify || type;

    switch (type) {
        case 'info':
            NotificationManager.info(message);
            break;
        case 'success':
            NotificationManager.success(message);
            break;
        case 'warning':
            NotificationManager.warning(message, title, 3000);
            break;
        case 'error':
            NotificationManager.error(message, title, 5000);
            break;
    }
};

export const routes = {
    login: "api/auth/login",
    logout: "api/auth/logout",
    register: "api/auth/register",
    refresh: "api/auth/refresh",
    me: "api/auth/me",
}

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <Error/>,
        children: [
            {
                path: "/",
                element: <Index/>
            },
            {
                path: "login",
                element: <AuthControl type="login" />,
            },
            {
                path: "register",
                element: <AuthControl type="register" />,
            },
            {
                path: "me",
                element: <Me />,
            },
        ],
    },

]);
