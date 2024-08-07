import React, { useState, useEffect } from "react";
import "./sidebar.scss";
import { Link } from "react-router-dom";

const Sidebar = () => {
    const [activeLink, setActiveLink] = useState("/dashboard");
    const [sidebarData, setSidebarData] = useState([]);

    useEffect(() => {
        const userRole = localStorage.getItem("role");

        let data = [];
        if (userRole === "admin") {
            data = [
                {
                    title: "Dashboard",
                    icon: "fa fa-dashboard",
                    link: "/dashboard",
                },
                {
                    title: "Products",
                    icon: "fa fa-shopping-bag",
                    link: "/dashproduct",
                },
                {
                    title: "Coupon",
                    icon: "fa fa-bookmark",
                    link: "/coupon",
                },
                {
                    title: "Users",
                    icon: "fa fa-users",
                    link: "/users",
                },
                {
                    title: "Inbox",
                    icon: "fa fa-envelope",
                    link: "/inbox",
                },
                {
                    title: "Subscribers",
                    icon: "fa fa-tag",
                    link: "/subscribers",
                },
                {
                    title: "Orders",
                    icon: "fa fa-user-circle",
                    link: "/orders",
                },
                {
                    title: "Blog",
                    icon: "fa fa-book",
                    link: "/blog",
                },
                // {
                //     title: "Profile",
                //     icon: "fa fa-user",
                //     link: "/profile",
                // },
            ];
        }
        else if (userRole === "customer") {
            data = [
                {
                    title: "Dashboard",
                    icon: "fa fa-dashboard",
                    link: "/dashboard",
                },
                {
                    title: "My Collection",
                    icon: "fa fa-shopping-bag",
                    link: "/collection",
                },
                {
                    title: "Order History",
                    icon: "fa fa-shopping-bag",
                    link: "/orderhistory",
                },
                
            ];
        }
        setSidebarData(data);
    }, []);

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };
    return (
        <div className="sidebar-wrapper">
            <div>
                <ul className="sidebar-links-wrapper">
                    {sidebarData.map((item, index) => {
                        return (
                            <li
                                key={index}
                                className={`sidebar-link ${activeLink === item.link ? "activeLink" : ""
                                    }`}
                            >
                                <Link to={item.link} onClick={() => handleLinkClick(item.link)}>
                                    <i className={item.icon} aria-hidden="true"></i>
                                    {"\u00A0"}
                                    <p className="sidebar-title">{item.title}</p>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
