import { lazy } from "react";
import { ROUTES_ID } from "./routes_id.js";

const Contact = lazy(() => import("../pages/ContactPage/Contact.jsx"));
const Home = lazy(() => import("../pages/HomePage/Home.jsx"));
const Category = lazy(() => import("../pages/CategoryPage/Category.jsx"));
const Login = lazy(() => import("../pages/LoginPage/Login.jsx"));
const Skep = lazy(() => import("../pages/SkepPage/Skep.jsx"));
const Favorite = lazy(() => import("../pages/FavoritePage/Favorite.jsx"));
const NotFound = lazy(() => import("../pages/NotFoundPage/NotFound.jsx"));
const Register = lazy(() => import("../pages/RegisterPage/Register.jsx"));
const ForgotPassword = lazy(() =>
  import("../pages/ForgotPasswordPage/ForgotPassword.jsx")
);
const Profile = lazy(() => import("../pages/ProfilePage/Profile.jsx"));
const Payment = lazy(() => import("../pages/PaymentPage/Payment.jsx"));
const UpdatePassword = lazy(() =>
  import("../pages/UpdatePassword/UpdatePassword.jsx")
);
const DetailPage = lazy(() =>
  import("../pages/HomePage/DetailPage/DetailPage.jsx")
);
const MyOrders = lazy(() => import("../pages/myOrdersPage/myOrders.jsx"));
const HomeForm = lazy(() =>
  import("../pages/HomePage/pageComponents/HomeForm/HomeForm.jsx")
);
const Earbuds = lazy(() => import("../pages/Products/Earbuds.jsx"));

export const routes = [
  {
    id: ROUTES_ID.home,
    path: "/",
    element: <Home />,
    title: "Home",
    children: [
      {
        id: ROUTES_ID.detail,
        path: "detail/:id",
        element: <DetailPage />,
        title: "Detail Page",
      },
      {
        id: ROUTES_ID.homeForm,
        index: true,
        element: <HomeForm />,
        title: "Home",
      },
    ],
  },
  {
    id: ROUTES_ID.contact,
    path: "/contact",
    element: <Contact />,
    title: "Contact",
  },
  {
    id: ROUTES_ID.category,
    path: "/category",
    element: <Category />,
    title: "Category",
  },
  {
    id: ROUTES_ID.login,
    path: "/login",
    element: <Login />,
    title: "Login",
    isPrivate: true,
  },
  {
    id: ROUTES_ID.skep,
    path: "/skep",
    element: <Skep />,
    title: "Skep",
  },
  {
    id: ROUTES_ID.favorite,
    path: "/favorite",
    element: <Favorite />,
    title: "Favorite",
  },
  {
    id: ROUTES_ID.notfound,
    path: "*",
    element: <NotFound />,
    title: "NotFound",
  },
  {
    id: ROUTES_ID.register,
    path: "/register",
    element: <Register />,
    title: "Register",
    isPrivate: true,
  },
  {
    id: ROUTES_ID.forgotpassword,
    path: "/forgotpassword",
    element: <ForgotPassword />,
    title: "Forgot Password",
    isPrivate: true,
  },
  {
    id: ROUTES_ID.profile,
    path: "/profile",
    element: <Profile />,
    title: "Profile",
    isPrivate: true,
  },
  {
    id: ROUTES_ID.payment,
    path: "/payment",
    element: <Payment />,
    title: "Payment",
    isPrivate: true,
  },
  {
    id: ROUTES_ID.updatepassword,
    path: "/updatepassword",
    element: <UpdatePassword />,
    title: "Update Password",
    isPrivate: true,
  },
  {
    id: ROUTES_ID.myOrders,
    path: "/myOrders",
    element: <MyOrders />,
    title: "My orders",
    isPrivate: true,
  },
  {
    id: `categories/earbuds`,
    path: `/categories/earbuds`,
    element: <Earbuds />,
    title: "Earbuds",
  },
];

export const getRoutePath = (id) => {
  const route = routes.find((route) => route.id === id);
  return route ? route.path : "/";
};

export const getRouteTitle = (pathname) => {
  const route = routes.find((route) => route.path === pathname);
  return route ? route.title : "Not Found";
};
