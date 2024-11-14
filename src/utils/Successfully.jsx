import { useNavigate } from "react-router-dom";
import { getRoutePath } from "../routing/routes";
import { ROUTES_ID } from "../routing/routes_id";
import { Button } from "antd";
import '../pages/ForgotPasswordPage/ForgotPassword.css';

function Successfully() {
    const navigate = useNavigate();
    const handleBackSuccesfuly = () => {
        navigate(getRoutePath(ROUTES_ID.login));
    };
    return (
        <div style={{ flexDirection: "column", display: "flex", alignItems: "center" }}>
            <h2 className="success-text">Password has been successfully reset!</h2>
            <Button className="back-button" onClick={handleBackSuccesfuly}>
                Go Login
            </Button>
        </div>
    );
}

export default Successfully