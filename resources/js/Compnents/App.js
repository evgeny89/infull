import {useEffect, useState} from "react";
import {NavLink, Outlet} from "react-router-dom";

const App = () => {
    const [user, setUser] = useState(null);
    const [component, setComponent] = useState(null);

    useEffect(() => {

    }, []);

    return (
        <>
            <header className="header">
                <NavLink className="logo" to="/">InFull</NavLink>
                <menu className="menu">
                    <li className="menu__item">
                        {!user &&
                            <NavLink to="login"
                                className={({ isActive }) => isActive ? "menu__button active" : "menu__button" }
                            >login</NavLink>}
                    </li>
                    <li className="menu__item">
                        {user && <button className="menu__button">logout</button>}
                    </li>
                    <li className="menu__item">
                        {!user && <button className="menu__button">registration</button>}
                    </li>
                    <li className="menu__item">
                        {user && <button className="menu__button">me</button>}
                    </li>
                </menu>
            </header>
            <main>
                <div id="detail">
                    <Outlet />
                </div>
            </main>
        </>
    );
}

                                           export default App;
