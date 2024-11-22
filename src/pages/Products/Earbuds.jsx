import { useLocation } from "react-router-dom";
import "./style.css";
import MainLayout from "../../layout/MainLayoutPage/MainLayout";
import { getRouteTitle } from "../../routing/routes";
import Navbar from "../../components/navbar";
import CategoriesContainer from "../../components/Categories/CategoriesContainer";

function Earbuds() {
  const location = useLocation();
  const title = getRouteTitle(location.pathname);

  const categoryFilters = [
    { key: "buildQuality", label: "Build Quality" },
    { key: "soundQuality", label: "Sound Quality" },
    { key: "design", label: "Design" },
    { key: "comfort", label: "Comfort" },
    { key: "batteryLife", label: "Battery Life" }
  ];

  return (
    <MainLayout
      content={<CategoriesContainer title={title}  categoryFilters={categoryFilters}/>}
      header={<Navbar />}
      title={title}
    />
  );
}

export default Earbuds;
