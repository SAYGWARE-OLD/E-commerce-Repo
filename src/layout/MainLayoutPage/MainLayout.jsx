import { Layout } from "antd";
import { Helmet } from "react-helmet";
import "./MainLayout.css";

const { Header, Footer, Content } = Layout;
const MainLayout = ({ header, content, footer, title }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>
      <Layout className="layout">
        <Header
          style={{ backgroundColor: header ? "yourColor" : "transparent" }}
        >
          {header}
        </Header>
        <Content className="layout">{content}</Content>
        <Footer style={{ backgroundColor: "black" }}>{footer}</Footer>
      </Layout>
    </>
  );
};

export default MainLayout;
