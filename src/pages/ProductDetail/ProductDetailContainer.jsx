import "./style.css";
import MainLayout from "../../layout/MainLayoutPage/MainLayout";
import Navbar from "../../components/navbar";
import ProductDetail from "./ProductDetail";


function ProductDetailContainer() {

  return (
    <MainLayout
      content={<ProductDetail  />}
      header={<Navbar />}
    />
  );
}

export default ProductDetailContainer;