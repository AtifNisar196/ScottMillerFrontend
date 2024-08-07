import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import baseurl from "../../../../Config/config";

const EditProductModal = ({
  open,
  handleClose,
  productData,
  setProductData,
}) => {
  const [formData, setFormData] = useState(productData);
  const [file, setFile] = useState(null);
  const [pdf, setPdf] = useState(null); // State for PDF file

  useEffect(() => {
    setFormData(productData);
  }, [productData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFile(file);
    } else {
      setFile(null);
      e.target.value = null; // Clear the file input
      toast.error("Please select a valid image file");
    }
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdf(file);
    } else {
      setPdf(null);
      e.target.value = null; // Clear the file input
      toast.error("Please select a valid PDF file");
    }
  };

  const handleSubmit = async () => {
    if (parseFloat(formData.disc_price) <= parseFloat(formData.price)) {
      toast.error("Previous Price must be greater than Price");
      return;
    }

    if (parseFloat(formData.year) < 0) {
      toast.error("Year cannot be negative");
      return;
    }

    if (formData.description.length > 3000) {
      toast.error("Description cannot exceed 3000 characters");
      return;
    }

    const data = new FormData();
    data.append("id", formData.id);

    for (const key in formData) {
      if (formData[key] !== productData[key] && key !== "id") {
        data.append(key, formData[key]);
      }
    }
    if (file) {
      data.append("image", file);
    }
    if (pdf) {
      data.append("pdf", pdf); // Include the PDF file in the form data
    }

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await axios.post(
        `${baseurl.BASE_URL}api/admin/products/update`,
        data,
        config
      );
      setProductData(response.data.data);
      toast.success("Product updated successfully");
      handleClose();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box className="modal-box">
          <h2>Edit Product</h2>
          <TextField
            name="title"
            label="Title"
            value={formData.title || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="description"
            label="Description"
            value={formData.description || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
            inputProps={{ maxLength: 500 }} // Character limit
          />
          <TextField
            name="price"
            label="Price"
            value={formData.price || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="number"
          />
          <TextField
            name="disc_price"
            label="Previous Price"
            value={formData.disc_price || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="number"
          />
          <TextField
            name="year"
            label="Year"
            value={formData.year || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="number" // Ensures numeric input
          />
          <TextField
            name="publisher"
            label="Publisher"
            value={formData.publisher || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          
          <TextField
            name="wittenby"
            label="Written By"
            value={formData.wittenby || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <TextField
            name="interior_url"
            label="Interior URL"
            value={formData.interior_url || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <TextField
            name="cover_url"
            label="Cover URL"
            value={formData.cover_url || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <TextField
            name="lulu_book_id"
            label="Lulu Book ID"
            value={formData.lulu_book_id || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <div>
            <label htmlFor="image" style={{ marginRight: "10px" }}>
              Image:
            </label>
            {formData.image && (
              <div>
                <img
                  src={formData.image}
                  alt="Product"
                  style={{ width: "100px", marginBottom: "10px" }}
                />
              </div>
            )}
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>

          {formData.pdf && (
            <div>
              <label htmlFor="pdf" style={{ marginRight: "10px" }}>
                PDF:
              </label>
              <input
                type="file"
                accept="application/pdf"
                onChange={handlePdfChange}
              />
            </div>
          )}

          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Box>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default EditProductModal;
