import React from 'react';
import { Button, Result } from 'antd';

export class ErrorBoundaryPage extends React.Component {
    state = { error: false, errorMsg: "", errorStack: "" };

    static getDerivedStateFromError(error) {
        return { error: true };
    }

    componentDidCatch(error) {
        this.setState({ errorMsg: error.message, errorStack: error.stack });
    }

    render() {
        const { error, errorMsg, errorStack } = this.state;
        const { fallback = "The content you submitted has the following error:" } = this.props;

        return error ? (
            <Result
                status="error"
                title="Submission Failed"
                subTitle="Please check and modify the following information before resubmitting."
                extra={[
                    <Button type="primary" key="console">
                        Go Home
                    </Button>,
                ]}
            >
                <div className="desc">
                    <h3>{fallback}</h3>
                    <p>{JSON.stringify(errorMsg, null, 4)}</p>
                    <p>{JSON.stringify(errorStack, null, 4)}</p>
                </div>
            </Result>
        ) : (
            <>{this.props.children}</>
        );
    }
}