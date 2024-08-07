import React from "react";
import "./dashusers.scss"
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/sidebar";
import Footer from "../../Components/Footer/Footer";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import baseurl from "../../../Config/config"

const DashUsers = () => {
    const [data, setData] = useState([]);
    const nav = useNavigate();

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
                setData(response.data.data);
                console.log("Data", response.data.data)

            } catch (error) {
                setError(error.message);
            }
        };

        fetchUsers();
    }, []);

    return (
        <>
            <div className="dashpage-wrapper">
                <div className="container-fluid">
                    <Navbar />
                    <div className="row">
                        <div className="col-lg-2">
                            <Sidebar />
                        </div>
                        <div className="col-lg-10">
                            <h4 className="dashpage-title">Users</h4>
                            <div className="btn-right">
                                {/* <Link
                                    to="/addcoupon/new"
                                    style={{ textDecoration: "none", width: "139px" }}
                                    className="add-btn"
                                >
                                    Add New Coupon
                                </Link> */}
                            </div>
                          <div className="table-responsive">
                          <table className="table">
                                <thead>

                                    <tr>
                                        <th>ID</th>
                                        <th>User Name</th>
                                        <th>Email</th>
                                        <th>Date & Time	</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item) => {
                                        const date = new Date(item.created_at);
                                        const formattedDate = date.toLocaleDateString();
                                        const formattedTime = date.toLocaleTimeString();

                                        return (
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{formattedDate}  {formattedTime}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default DashUsers
