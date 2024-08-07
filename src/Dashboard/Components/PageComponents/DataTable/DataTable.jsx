import "./datatable.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { ProductsColumns } from "../../Datatablesource/Datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import baseurl from "../../../../Config/config";

const Datatable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const nav = useNavigate();

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `${baseurl.BASE_URL}api/admin/products/delete/${id}`,
        config
      );
      if (response.data.status) {
        toast.success("Delete Product Successfully!!");
        setData(data.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

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
        setData(response.data.data);
        setLoading(false);
        console.log("Data", response.data.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProducts();
  }, []);

  const actionColumn = [
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/dashproduct/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>

            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        <Link
          to="/addproduct/new"
          style={{ textDecoration: "none" }}
          className="link"
        >
          Add New Products
        </Link>
      </div>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          className="datagrid"
          rows={data}
          columns={ProductsColumns.concat(actionColumn)}
          pageSize={pageSize}
          rowsPerPageOptions={[10, 20, 50]}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          checkboxSelection
          loading={loading}
          pagination
          page={page}
          onPageChange={(newPage) => setPage(newPage)}
        />
        <ToastContainer />
      </div>
    </div>
  );
};

export default Datatable;