import { useLocation } from "react-router-dom";
import "./style.css";
import MainLayout from "../../layout/MainLayoutPage/MainLayout";
import { getRouteTitle } from "../../routing/routes";
import Navbar from "../../components/navbar";
import CategoriesContainer from "../../components/Categories/CategoriesContainer";
import { earbuds } from "../../mock/earbuds";

function Earbuds() {
  const location = useLocation();
  const title = getRouteTitle(location.pathname);

  return (
    <MainLayout
      content={<CategoriesContainer title={title} products={earbuds} />}
      header={<Navbar />}
      title={title}
    />
  );
}

export default Earbuds;
