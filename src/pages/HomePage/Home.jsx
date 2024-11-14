import MainLayout from "../../layout/MainLayoutPage/MainLayout";
import Navbar from "../../components/navbar";
import { Outlet, useLocation } from "react-router-dom";
import { getRouteTitle } from "../../routing/routes";

function Home() {
  const location = useLocation();
  const title = getRouteTitle(location.pathname);

  return (
    <>
      <MainLayout content={<Outlet />} header={<Navbar />} title={title} />
    </>
  );
}

export default Home;
