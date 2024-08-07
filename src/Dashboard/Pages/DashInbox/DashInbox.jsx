import React from "react";
import "./dashinbox.scss"
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/sidebar";
import Footer from "../../Components/Footer/Footer";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import baseurl from "../../../Config/config"

const DashInbox = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
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
                setData(response.data.data);
                console.log("Data", response.data.data)

            } catch (error) {
                setError(error.message);
            }
        };

        fetchContactData();
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
                            <h4 className="dashpage-title">Contact Users</h4>
                            <div className="btn-right">
                            </div>
                            <div className="table-responsive">
                            <table className="table">
                                <thead>

                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Message</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.message}</td>
                                        </tr>
                                    ))}
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

export default DashInbox
