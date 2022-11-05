const Login = () => {

    return (
        <div className="modal">
            <form action="api/login" className="form">
                <div className="form__field">
                    <label className="form__label" htmlFor="email">E-mail:</label>
                    <input type="text" id="email" name="email"/>
                </div>
                <div className="form__field">
                    <label className="form__label" htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password"/>
                </div>
                <div className="form__field">
                    <button>login</button>
                </div>
            </form>
        </div>
    )
}

export default Login;
