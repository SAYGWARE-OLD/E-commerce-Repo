import React from "react";
import { Layout } from "antd";
import { Helmet } from "react-helmet";

const { Header, Footer, Sider, Content } = Layout;

const ProfileLayout = ({ header, content, footer, title, sider }) => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{title}</title>
            </Helmet>
            <Layout className="layout">
                <Header style={{ backgroundColor: header ? 'yourColor' : 'transparent' }}>
                    {header}
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        {sider}
                    </Sider>
                    <Layout style={{ padding: '0 24px', minHeight: 280 }}>
                        <Content>
                            {content}
                        </Content>
                    </Layout>
                </Layout>
                <Footer>
                    {footer}
                </Footer>
            </Layout>
        </>
    );
};

export default ProfileLayout;
