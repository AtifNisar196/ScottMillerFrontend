import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useLocation,
} from "react-router-dom";
import Home from "../Pages/Home/Home";
import Signup from "../Pages/Signup/Signup";
import Login from "../Pages/Login/Login";
import About from "../Pages/About/About";
import Books from "../Pages/Books/Books";
import Contact from "../Pages/Contact/Contact";
import Blogs from "../Pages/Blogs/Blogs";
import DashHome from "../Dashboard/Pages/DashHome/DashHome";
import { login } from "../../store/actions/authAction"; // Import the login function
import Checkout from "../Pages/Checkout/Checkout";
import Payment from "../Pages/Payment/Payment";
import Shipping from "../Pages/Shipping/Shipping";
import SingleProduct from "../Pages/SingleProduct/SingleProduct";
import Wishlist from "../Pages/Wishlist/Wishlist";
import Products from "../Dashboard/Pages/Products/Products";
import DashSingleProduct from "../Dashboard/Pages/DashSingleProduct/DashSingleProduct";
import Thankyou from "../Pages/Thankyou/Thankyou";
import DashOrder from "../Dashboard/Pages/DashOrder/DashOrder";
import AddProduct from "../Dashboard/Pages/AddProduct/AddProduct";
import DashCoupon from "../Dashboard/Pages/DashCoupon/DashCoupon";
import AddCoupon from "../Dashboard/Pages/AddCoupon/AddCoupon";
import DashUsers from "../Dashboard/Pages/DashUsers/DashUsers";
import DashInbox from "../Dashboard/Pages/DashInbox/DashInbox";
import Subscribers from "../Dashboard/Pages/Subscribers/Subscribers";
import DashBlog from "../Dashboard/Pages/DashBlog/DashBlog";
import AddBlog from "../Dashboard/Pages/AddBlog/AddBlog";
import Library from "../Dashboard/Pages/Library/Library";
import DashSingleLibrary from "../Dashboard/Pages/DashSingleLibrary/DashSingleLibrary";
import Collection from "../Dashboard/Pages/Collection/Collection";
import OrderHistory from "../Dashboard/Pages/OrderHistory/OrderHistory";
import SingleBlog from "../Pages/SingleBlog.jsx/SingleBlog";

const stripePromise = loadStripe(
    "pk_test_51PMWoBERKReXpvBzc4zIrVYQK1XUDsluMJ8Ov5PlOYJuQdoP40bwW8WVJtTQHhh0TjWUtiNFzA5lbmSz9QLK2GzI00tcY28u4q"
);

export default function Navigation() {
    const [userRole, setUserRole] = useState(localStorage.getItem("role") || "");

    useEffect(() => {
        const handleStorageChange = () => {
            const role = localStorage.getItem("role");
            setUserRole(role);
        };
        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const isLoggedIn = () => {
        const user_found = localStorage.getItem("token");
        return !!user_found;
    };

    const isRouteAllowed = (role, path) => {
        const roleRoutes = {
            customer: [
                "/login",
                "/signup",
                "/",
                "/about",
                "/blogs",
                "/books",
                "/contact",
                "/product",
                "/product/:id",
                "/library/:id",
                "/checkout",
                "/payment",
                "/shipping",
                "/wishlist",
                "/thankyou",
                "/library",
                "/dashboard",
                "/collection",
                "/orderhistory"
            ],
            admin: [
                "/login",
                "/signup",
                "/dashboard",
                "/inbox",
                "/subscribers",
                "/orders",
                "/blog",
                "/addblog/new",
                "/coupon",
                "/addcoupon/new",
                "/users",
                "/setting",
                "/dashproduct",
                "/dashproduct/:id",
                "/addproduct/new",
            ],
        };

        return roleRoutes[role] && roleRoutes[role].includes(path);
    };

    const ProtectedRoute = ({ element, path }) => {
        const location = useLocation();
        return isLoggedIn() && isRouteAllowed(userRole, path) ? (
            element
        ) : (
            <Navigate to="/login" replace state={{ from: location }} />
        );
    };

    const RedirectIfLoggedIn = ({ element }) => {
        const loggedIn = isLoggedIn();
        return loggedIn ? (
            ( userRole === "admin") ? (
                <Navigate to="/dashboard" replace />
            ) : (
                <Navigate to="/" replace />
            )
        ) : (
            element
        );
    };

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<RedirectIfLoggedIn element={<Login />} />} />
                <Route
                    path="/signup"
                    element={<RedirectIfLoggedIn element={<Signup />} />}
                />
                <Route
                    path="/"
                    element={<Home />}
                />
                <Route
                    path="/about"
                    element={<About />}
                />
                <Route
                    path="/books"
                    element={<Books />}
                />
                <Route
                    path="/product/:id"
                    element={<SingleProduct />}
                />
                <Route path="/blogs/:id" element={<SingleBlog />} />
                <Route
                    path="/wishlist"
                    element={<ProtectedRoute element={<Wishlist />} path="/wishlist" />}
                />
                  <Route
                    path="/blogs"
                    element={<Blogs />}
                />
                <Route
                    path="/contact"
                    element={<Contact />}
                />
                <Route
                    path="/checkout"
                    element={<ProtectedRoute element={<Checkout />} path="/checkout" />}
                />
                <Route
                    path="/library"
                    element={<ProtectedRoute element={<Library />} path="/library" />}
                />
                <Route
                    path="/thankyou"
                    element={<ProtectedRoute element={<Thankyou />} path="/thankyou" />}
                />
                <Route
                    path="/payment"
                    element={<ProtectedRoute element={<Payment />} path="/payment" />}
                />
                <Route
                    path="/shipping"
                    element={<ProtectedRoute element={<Shipping />} path="/shipping" />}
                />
                <Route
                    path="/dashboard"
                    element={<ProtectedRoute element={<DashHome />} path="/dashboard" />}
                />
                 <Route
                    path="/collection"
                    element={<ProtectedRoute element={<Collection />} path="/collection" />}
                />
                <Route
                    path="/orderhistory"
                    element={<ProtectedRoute element={<OrderHistory />} path="/orderhistory" />}
                />
                <Route
                    path="/orders"
                    element={<ProtectedRoute element={<DashOrder />} path="/orders" />}
                />
                <Route
                    path="/blog"
                    element={<ProtectedRoute element={<DashBlog />} path="/blog" />}
                />
                <Route path="/addblog/new"
                    element={
                        <ProtectedRoute
                            element={<AddBlog />}
                            path="/addblog/new"
                        />
                    }
                />
                <Route
                    path="/coupon"
                    element={<ProtectedRoute element={<DashCoupon />} path="/coupon" />}
                />
                <Route
                    path="/addcoupon/new"
                    element={
                        <ProtectedRoute
                            element={<AddCoupon />}
                            path="/addcoupon/new"
                        />
                    }
                />
                <Route
                    path="/users"
                    element={
                        <ProtectedRoute
                            element={<DashUsers />}
                            path="/users"
                        />
                    }
                />
                <Route
                    path="/inbox"
                    element={<ProtectedRoute element={<DashInbox />} path="/inbox" />}
                />
                 <Route
                    path="/subscribers"
                    element={<ProtectedRoute element={<Subscribers />} path="/subscribers" />}
                />

                <Route
                    path="/dashproduct"
                    element={
                        <ProtectedRoute element={<Products />} path="/dashproduct" />
                    }
                />
                <Route
                    path="/dashproduct/:id"
                    element={
                        <ProtectedRoute
                            element={<DashSingleProduct />}
                            path="/dashproduct/:id"
                        />
                    }
                />
                <Route
                    path="/library/:id"
                    element={
                        <ProtectedRoute
                            element={<DashSingleLibrary />}
                            path="/library/:id"
                        />
                    }
                />
                <Route
                    path="/addproduct/new"
                    element={
                        <ProtectedRoute
                            element={<AddProduct />}
                            path="/addproduct/new"
                        />
                    }
                />
                <Route
                    path="/setting"
                    element={<ProtectedRoute element={<DashHome />} path="/setting" />}
                />
                {/* <Route
          path="/accounts"
          element={<ProtectedRoute element={<AccountsPage />} path="/accounts" />}
        /> */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}
