import React from "react";
import { createRoot } from 'react-dom/client';
import axios from "axios";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import {createNotification, router} from "./helpers"
import {RouterProvider} from "react-router-dom";

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = token;
    }

    if (!config.headers.ContentType) {
        config.headers.ContentType = `application/json; charset=UTF-8`;
    }

    config.headers.Accept = `application/json`;

    return config;
}, function (error) {
    createNotification("error", error.message);
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    createNotification("error", error.message);
    return Promise.reject(error);
});

document.addEventListener("DOMContentLoaded", () => {
    createNotification("info", "loaded");
})

const app = document.querySelector("#App");
createRoot(app).render(
    <>
        <RouterProvider router={router}/>
        <NotificationContainer/>
    </>
);
