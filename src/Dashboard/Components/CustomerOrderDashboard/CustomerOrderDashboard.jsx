import React, { useState, useEffect } from "react";
import axios from "axios";
import "./customerorderdashboard.scss";
import { Link } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { ToastContainer } from "react-toastify";
import baseurl from "../../../Config/config"

const CustomerDashboard = () => {
  const [libraryContent, setLibraryContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLibrary = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `${baseurl.BASE_URL}api/frontend/order/getAll`,
          config
        );
        setLibraryContent(response.data.data);
        // console.log(response.data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLibrary();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <div className="">
        <div className="row">
          {error ? (
            <div className="col-12">
              <div className="error-message">
                <p>Error: {error}</p>
              </div>
            </div>
          ) : (
            // libraryContent.map((library, index) => (
            //   <div className="col-lg-3" key={index}>
            //     <div className="library-card">
            //       <div className="library-card-img">
            //         <img src={library.image} alt="" />
            //       </div>
            //       <div className="library-card__content">
            //         <div className="library-card-head">
            //           <h4 className="library-card__title">{library.title}</h4>
            //         </div>
            //         <div className="library-card__description">
            //           <p>{library.summary}</p>
            //           {/* <div className="btn-wrap">
            //             <Link
            //               to={`/library/${library.id}`}
            //               className="library-card__button"
            //             >
            //               Read More
            //             </Link>
            //           </div> */}
            //         </div>
            //       </div>
            //     </div>
            //   </div>
            // ))
            <div className="table-responsive">
              <table className="table orders-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Previous Price</th>
                    <th>Description</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {libraryContent.map((item) => (
                    <tr key={item.id}>
                      {item.items.map((pro) => {
                        return (
                          <>
                            <td>
                              <img src={pro.product.image} alt={pro.product.title} srcset="" />
                            </td>
                            <td>{pro.product.title}</td>
                            <td>${pro.product.price}</td>
                            <td>${pro.product.disc_price}</td>
                            <td>{pro.product.description}</td>
                          </>
                        );
                      })}
                      <td>${item.total}</td>
                    </tr>
                  ))}
                </tbody>
                <ToastContainer />
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
