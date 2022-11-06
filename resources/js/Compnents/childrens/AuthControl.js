import {useContext, useEffect, useRef} from "react";
import {Context} from "../Context";
import {redirect, useNavigate} from "react-router-dom";
import {createNotification, routes} from "../../helpers";
import axios from "axios";

const AuthControl = ({type}) => {
    const [user, setUser]  = useContext(Context);
    const navigate = useNavigate();
    const form = useRef(null);

    const showErrors = (errors) => {
        for (const field in errors) {
            errors[field].forEach(error => {
                createNotification("error", error);
            })
        }
    }

    const getUser = () => {
        axios.post(routes.me)
            .then(response => {
                setUser(response.data)
                redirect("/");
            })
    }

    const sendForm = (e) => {
        e.preventDefault();

        axios[form.current.method](form.current.action, new FormData(form.current))
            .then(response => {
                localStorage.setItem("token", `${response.data.token_type} ${response.data.access_token}`)
                getUser();
            })
            .catch(error => {
                if(error.response.data.errors) {
                    showErrors(error.response.data.errors)
                }
            })
    }

    useEffect(() => {
        if (user) {
            navigate("/me");
        }
    }, [])

    return (
        <div className="modal">
            <form action={routes[type]} className="form" method="post" ref={form}>
                {type === 'register' &&
                    <div className="form__field">
                        <label className="form__label" htmlFor="name">Имя:</label>
                        <input type="text" id="name" name="name"/>
                    </div>
                }
                <div className="form__field">
                    <label className="form__label" htmlFor="email">E-mail:</label>
                    <input type="text" id="email" name="email"/>
                </div>
                <div className="form__field">
                    <label className="form__label" htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password"/>
                </div>
                {type === 'register' &&
                    <div className="form__field">
                        <label className="form__label" htmlFor="password_confirmation">Password confirm:</label>
                        <input type="password" id="password_confirmation" name="password_confirmation"/>
                    </div>
                }
                <div className="form__field">
                    <button onClick={sendForm}>{ type }</button>
                </div>
            </form>
        </div>
    )
}

export default AuthControl
