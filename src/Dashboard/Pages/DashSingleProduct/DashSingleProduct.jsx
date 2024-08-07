import "./dashsingleproduct.scss";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/sidebar";
import axios from "axios";
import Footer from "../../Components/Footer/Footer";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import EditProductModal from "../../Components/PageComponents/EditProductModal/EditProductModal";
import { toast } from "react-toastify";
import baseurl from "../../../Config/config";

const DashSingleProduct = () => {
  const { id } = useParams();
  const [viewdata, setViewData] = useState({});
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    const viewProduct = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `${baseurl.BASE_URL}api/admin/products/getById/${id}`,
          config
        );
        console.log(response.data.data);
        setViewData(response.data.data);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    };
    viewProduct();
  }, [id]);

  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);

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
              <h4 className="dashpage-title">View Product</h4>

              <div className="single">
                <div className="singleContainer">
                  <div className="top">
                    <div className="left">
                      <div className="item">
                        {viewdata.image && (
                          <img
                            src={viewdata.image}
                            alt="Product"
                            className="itemImg"
                          />
                        )}
                        <div className="details">
                          <div className="edit-btn-wrap">
                            <h1 className="itemTitle">{viewdata.title}</h1>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={handleEditOpen}
                            >
                              Edit
                            </Button>
                          </div>
                          <div className="detailItem">
                            <span className="itemKey">Category:</span>
                            <span className="itemValue">
                              {viewdata.category?.name || "N/A"}
                            </span>
                          </div>
                          <div className="detailItem">
                            <span className="itemKey">Description:</span>
                            <span className="itemValue">
                              {viewdata.description}
                            </span>
                          </div>
                          <div className="detailItem">
                            <span className="itemKey">Price:</span>
                            <span className="itemValue">${viewdata.price}</span>
                          </div>
                          <div className="detailItem">
                            <span className="itemKey">Previous Price: </span>
                            <span className="itemValue">
                              ${viewdata.disc_price}
                            </span>
                          </div>
                          <div className="detailItem">
                            <span className="itemKey">Year: </span>
                            <span className="itemValue">{viewdata.year}</span>
                          </div>
                          <div className="detailItem">
                            <span className="itemKey">Publisher: </span>
                            <span className="itemValue">
                              {viewdata.publisher}
                            </span>
                          </div>
                          <div className="detailItem">
                            <span className="itemKey">Written By: </span>
                            <span className="itemValue">
                              {viewdata.wittenby}
                            </span>
                          </div>
                          {viewdata.pdf ? (
                            <div className="details-items">
                              <div className="details-1"></div>
                              <div className="details-2">
                                <strong>PDF: </strong>{" "}
                                <Link to={viewdata.pdf} target="_blank">
                                  {viewdata.pdf.split("/").pop()}
                                </Link>
                              </div>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <EditProductModal
                open={editOpen}
                handleClose={handleEditClose}
                productData={viewdata}
                setProductData={setViewData}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DashSingleProduct;
