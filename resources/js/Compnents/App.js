import {useEffect, useState} from "react";
import {NavLink, Outlet, useNavigate} from "react-router-dom";
import {Context} from "./Context";
import axios from "axios";
import {createNotification, routes} from "../helpers";

const App = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const loaded = () => {
        if (localStorage.getItem("token")) {
            axios.post(routes.refresh)
                .then(response => {
                    localStorage.setItem("token", `${response.data.token_type} ${response.data.access_token}`)
                    getUserData();
                })
        }
    }

    const getUserData = () => {
        if (localStorage.getItem("token")) {
            axios.post(routes.me)
                .then(response => {
                    setUser(response.data)
                })
                .catch(error => {
                    createNotification("error", error.response.data.error)
                })
        }
    }

    useEffect(() => {
        loaded();
    }, []);

    useEffect(() => {
        user ? navigate("/me") : navigate("/");
    }, [user])


    return (
        <>
            <header className="header">
                <NavLink className="logo" to="/">InFull</NavLink>
                <menu className="menu">
                    <li className="menu__item">
                        {!user &&
                            <NavLink to="login"
                                     className={({isActive}) => isActive ? "menu__button active" : "menu__button"}
                            >login</NavLink>}
                    </li>
                    <li className="menu__item">
                        {!user &&
                            <NavLink to="register"
                                     className={({isActive}) => isActive ? "menu__button active" : "menu__button"}
                            >registration</NavLink>}
                    </li>
                    <li className="menu__item">
                        {user &&
                            <NavLink to="me"
                                     className={({isActive}) => isActive ? "menu__button active" : "menu__button"}
                            >me</NavLink>}
                    </li>
                </menu>
            </header>
            <Context.Provider value={[user, setUser]}>
                <main>
                    <div id="detail">
                        <Outlet/>
                    </div>
                </main>
            </Context.Provider>
        </>
    );
}

export default App;
