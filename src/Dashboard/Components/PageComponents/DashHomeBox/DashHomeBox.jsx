import React, { useState, useEffect } from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import InventoryIcon from "@mui/icons-material/Inventory";
import MailIcon from "@mui/icons-material/Mail";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SellIcon from "@mui/icons-material/Sell";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SignpostIcon from "@mui/icons-material/Signpost";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import baseurl from "../../../../Config/config";
import "./dashhomebox.scss";
import axios from "axios";
import { Link } from "react-router-dom";

const DashHomeBox = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [contact, setContact] = useState([]);
  const [Coupon, setAllCoupon] = useState([]);
  const [Orders, setOrders] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [subscribers, setSubscribers] = useState([]);

  // All Products APi
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `${baseurl.BASE_URL}api/admin/products/getAll`,
          config
        );
        setAllProducts(response.data.data);
        console.log("Data", response.data.data);
      } catch (error) {
        setError(error.message);
      }
    };
    const fetchContactData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `${baseurl.BASE_URL}api/frontend/contact/getAll`,
          config
        );
        setContact(response.data.data);
        console.log("Data", response.data.data);
      } catch (error) {
        setError(error.message);
      }
    };
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `${baseurl.BASE_URL}api/admin/orders/getAll`,
          config
        );
        const items = response.data.data;
        setOrders(items);
      } catch (error) {
        setError(error.message);
      }
      // finally {
      //     SetLoading(false)
      // }
    };

    fetchOrders();
    fetchContactData();
    fetchProducts();
  }, []);

  // All Coupon Api
  useEffect(() => {
    const fetchAllCoupon = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `${baseurl.BASE_URL}api/admin/coupons/getAll`,
          config
        );
        setAllCoupon(response.data.data);
        console.log("Data", response.data.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchAllCoupon();
  }, []);

  //All Blogs Api
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `${baseurl.BASE_URL}api/admin/blog/getAll`,
          config
        );
        setBlogs(response.data.data);
        console.log("Data", response.data.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchBlogs();
  }, []);

  //All Users Api
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `${baseurl.BASE_URL}api/admin/users/getAll`,
          config
        );
        setUsers(response.data.data);
        console.log("Data", response.data.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUsers();
  }, []);

  //All Subscribe Api
  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `${baseurl.BASE_URL}api/frontend/email-subscribers/getAll`,
          config
        );
        setSubscribers(response.data.message);
        console.log("Data=>>>>>>>", response.data.message);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchSubscribers();
  }, []);

  const allbooks = allProducts.length;
  const allcontact = contact.length;
  const allCoupon = Coupon.length;
  const allOrders = Orders.length;
  const allblogs = blogs.length;
  const allusers = users.length;
  const allsubscribers = subscribers.length;

  const widgetDetails = [
    {
      icon: (
        <InventoryIcon
          className="icon"
          style={{
            color: "crimson",
          }}
        />
      ),
      link: "/dashproduct",
      count: allbooks,
      title: "Total Poducts",
      description: "Your Total Products here!",
    },
    {
      icon: (
        <ShoppingCartIcon
          className="icon"
          style={{
            color: "goldenrod",
          }}
        />
      ),
      link: "/orders",
      count: allOrders,
      title: "Total Orders",
      description: "Your Total Orders here!",
    },
    {
      icon: (
        <BeenhereIcon
          className="icon"
          style={{
            color: "green",
          }}
        />
      ),
      link: "/coupon",

      count: allCoupon,
      title: "Total Coupons",
      description: "Total Coupons Here",
    },
    {
      icon: (
        <MailIcon
          className="icon"
          style={{
            color: "purple",
          }}
        />
      ),
      link: "/inbox",

      count: allcontact,
      title: "Inbox",
      description: "Your Total Inbox Messages here",
    },
    {
      icon: (
        <SignpostIcon
          className="icon"
          style={{
            color: "gray",
          }}
        />
      ),
      link: "/blog",

      count: allblogs,
      title: "Blogs",
      description: "Your Total Blogs here",
    },
    {
      icon: (
        <GroupAddIcon
          className="icon"
          style={{
            color: "blue",
          }}
        />
      ),
      link: "/users",

      count: allusers,
      title: "Users",
      description: "Your Total Register Users here",
    },
    {
      icon: (
        <SellIcon
          className="icon"
          style={{
            color: "brown",
          }}
        />
      ),
      link: "/subscribers",

      count: allsubscribers,
      title: "Subscribers",
      description: "Your Total Subscribers here",
    },
  ];

  return (
    <>
      {widgetDetails.map((widget, index) => (
        <div className="col-lg-3">
          <div className="dashhome-box">
            <div className="dashhome-box-top">
              <div className="icon-wrap">{widget.icon}</div>
              <div className="content-wrap">
                <Link to={widget.link}>
                  <h2>{widget.count}</h2>
                </Link>
              </div>
            </div>
            <div className="details-wrap">
              <h4>{widget.title}</h4>
              <p>{widget.description}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default DashHomeBox;
