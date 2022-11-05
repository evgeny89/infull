import {useRouteError} from "react-router-dom";

const Error = () => {
    const error = useRouteError();
    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    )
}

export default Error;
