import React from 'react';
import { Button, notification as antdNotification, Space } from 'antd';
import { RadiusUprightOutlined } from '@ant-design/icons';

const Notifications = ({ message, description, placement }) => {
    const [api, contextHolder] = antdNotification.useNotification();

    const openNotification = () => {
        api.info({
            message: message || 'Notification Title',
            description: description || 'This is the content of the notification.',
            placement: placement || 'topRight',
        });
    };

    return (
        <>
            {contextHolder}
            <Space>
                <Button
                    type="primary"
                    onClick={openNotification}
                    icon={<RadiusUprightOutlined />}
                >
                    Open Notification
                </Button>
            </Space>
        </>
    );
};

export default Notifications;