import React from 'react';
import MainLayout from "../../layout/MainLayoutPage/MainLayout";
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getRoutePath } from '../../routing/routes';
import { ROUTES_ID } from '../../routing/routes_id';
import './NotFound.css';

const NotFoundContainer = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(getRoutePath(ROUTES_ID.home));
    };

    return (
        <div className="fullscreen-container">
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button onClick={handleNavigate} type="primary">Back Home</Button>}
            />
        </div>
    );
};

function NotFound() {
    return (
        <div className="fullscreen-wrapper">
            <MainLayout content={<NotFoundContainer />} title={"Not Found Page"} />
        </div>
    );
}

export default NotFound;