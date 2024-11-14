import { Badge, notification, Space } from "antd";
import { Link } from "react-router-dom";
import { getRoutePath } from "../routing/routes";
import { ROUTES_ID } from "../routing/routes_id";
import "./Navbar.css";
import { RxAvatar } from "react-icons/rx";
import { useAuth } from "../utils/AuthContext";
import { FaShoppingBasket } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { HiLogin } from "react-icons/hi";
import { useCart, useFavori } from "../utils/CartContext";
import { categories } from "../mock/categories";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const { cartItems } = useCart();
  const { favoriItems } = useFavori();

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      notification.success({
        message: "Logged out",
        description: "You have been successfully logged out.",
        placement: "topRight",
        duration: 3,
      });
    } else {
      notification.error({
        message: "Logout failed",
        placement: "topRight",
        duration: 3,
      });
    }
  };

  return (
    <>
    <div className="navbar-container">
      <div className="header-logo">
        <img src="logo.png" alt="" width={150}/>
      </div>
      <Space className="space header-text">
        <Link to={getRoutePath(ROUTES_ID.home)}>Home</Link>
        <Link to={getRoutePath(ROUTES_ID.contact)}>Contact</Link>
        <Badge
          color="wheat"
          count={favoriItems.length}
          overflowCount={99}
          className="custom-badge"
        >
          <Link
            className="favorites"
            style={{ marginRight: "10px" }}
            to={getRoutePath(ROUTES_ID.favorite)}
          >
            Favorites
          </Link>
        </Badge>
        <div className="category-dropdown">
          <Link className="category" style={{ marginLeft: "20px" }}>
            Categories
          </Link>
          <div className="category-dropdown-content">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={getRoutePath(ROUTES_ID.categories).replace(
                  ":id",
                  category.id
                )}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </Space>
      <Space>
        <Link to={getRoutePath(ROUTES_ID.skep)}>
          <Badge
            color="wheat"
            count={cartItems.length}
            overflowCount={99}
            className="custom-badge"
          >
            <FaShoppingBasket className="icon" />
          </Badge>
        </Link>
        {isAuthenticated && (
          <>
            <Link to={getRoutePath(ROUTES_ID.profile)}>
              <RxAvatar className="icon" />
            </Link>
            <Link onClick={handleLogout}>
              <IoLogOut className="icon" />
            </Link>
          </>
        )}
        {!isAuthenticated && (
          <Link to={getRoutePath(ROUTES_ID.login)}>
            <HiLogin className="icon" />
          </Link>
        )}
      </Space>
    </div>
      </>
  );
}

export default Navbar;
