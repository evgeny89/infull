import {useContext, useEffect} from "react";
import {Context} from "../Context";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {createNotification, routes} from "../../helpers";

const Me = () => {
    const [user, setUser] = useContext(Context);
    const navigate = useNavigate();

    const showErrors = (errors) => {
        for (const field in errors) {
            errors[field].forEach(error => {
                createNotification("error", error);
            })
        }
    }

    const logout = () => {
        axios.post(routes.logout)
            .then(response => {
                createNotification("info", response.data.message)
                setUser(null);
                localStorage.removeItem("token");
            })
            .catch(error => {
                if(error.response.data.errors) {
                    showErrors(error.response.data.errors)
                }
            })
    }

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [])

    return (
        <div>
            {user ?
                <div className="user-page">
                    <p>id: {user.id}</p>
                    <p>name: {user.name}</p>
                    <p>e-mail: {user.email}</p>
                    <hr/>
                    <div className="form__field">
                        <button onClick={logout}>logout</button>
                    </div>
                </div>
                : <div>Not Authorized</div>
            }
        </div>
    );
}

export default Me;
