import {  useParams } from "react-router-dom";
import "./style.css";
import MainLayout from "../../layout/MainLayoutPage/MainLayout";
import Navbar from "../../components/navbar";
import CategoriesContainer from "../../components/Categories/CategoriesContainer";
import { earbuds } from "../../mock/earbuds";
import { monitor } from "../../mock/monitor";
import { keyboard } from "../../mock/keyboard";
import { mouse } from "../../mock/mouse";

const categories = {
  earbuds,
  monitor,
  keyboard,
  mouse
}
function Categories() {
  const {category} = useParams();
  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <MainLayout
      content={<CategoriesContainer title={categoryTitle} products={categories[category]} />}
      header={<Navbar />}
      title={categoryTitle}
    />
  );
}

export default Categories;
