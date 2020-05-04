import React from "react";
import { Route, Redirect } from "react-router-dom";

import axios from 'axios';

export const axiosWithAuth = () => {
    const token = localStorage.getItem("token");

    return axios.create({
        baseURL: "http://localhost:5000/api",
        headers: {
            Authorization: token
        }
    });
};

export const PrivateRoute = ({ component: Component }) => {
    return (
        <Route
            render={props =>
                localStorage.getItem("token") ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/" />
                )
            }
        />
    );
};

export default PrivateRoute;
