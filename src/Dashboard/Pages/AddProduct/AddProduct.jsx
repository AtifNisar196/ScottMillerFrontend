import "./addproduct.scss";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/sidebar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import baseurl from "../../../Config/config";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AddProduct = () => {
  const maxLength = 3000;
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [year, setYear] = useState();
  const [publisher, setPublisher] = useState("");
  const [writtenBy, setWrittenBy] = useState("");
  const [pdf, setPdf] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [category, setCategory] = useState([]);
  const [image, setImage] = useState([]);
  const [isLuluProduct, setIsLuluProduct] = useState(false);
  const [luluBookId, setLuluBookId] = useState("");
  const [bookSize, setBookSize] = useState("");
  const [pageCount, setPageCount] = useState("");
  const [bindingType, setBindingType] = useState("");
  const [interiorColor, setInteriorColor] = useState("");
  const [paperType, setPaperType] = useState("");
  const [coverFinish, setCoverFinish] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [interiorUrl, setInteriorUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // New state variable for submit button

  const handleToSetProduct = async (event) => {
    event.preventDefault();
    if (isSubmitting) return; // Prevent multiple submissions

    // Check if prices are valid before submission
    if (!validatePrices(price, discountPrice)) {
      toast.error(
        "Previous price must be greater than the current price if provided."
      );
      return;
    }

    setIsSubmitting(true); // Disable submit button

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("category_id", categoryId);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("year", year);
      formData.append("publisher", publisher);
      formData.append("wittenby", writtenBy);
      formData.append("image", image);
      if (discountPrice) {
        formData.append("disc_price", discountPrice);
      }
      if (categoryId === "1") {
        // Assuming '1' is the ID for eBook category
        formData.append("pdf", pdf);
      }
      if (isLuluProduct) {
        formData.append("lulu_book_id", luluBookId);
        formData.append("book_size", bookSize);
        formData.append("page_count", pageCount);
        formData.append("binding_type", bindingType);
        formData.append("interior_color", interiorColor);
        formData.append("paper_type", paperType);
        formData.append("cover_finish", coverFinish);
        formData.append("cover_url", coverUrl);
        formData.append("interior_url", interiorUrl);
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.post(
        `${baseurl.BASE_URL}api/admin/products/store`,
        formData,
        config
      );
      if (response.data.status) {
        toast.success("Add Product Successfully!!");
        setTimeout(() => {
          nav("/dashproduct");
        }, 200); // 1000 milliseconds = 1 second
        setIsSubmitting(false); // Re-enable submit button
      } else {
        toast.error("Add Product failed: " + response.data.message);
        setIsSubmitting(false); // Re-enable submit button
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        const errorMessage =
          error.response.data.message ||
          "Internal Server Error. Please try again later.";
        toast.error(errorMessage);
        setIsSubmitting(false); // Re-enable submit button
      } else {
        const genericError = "Error for adding product";
        toast.error(genericError);
        setIsSubmitting(false); // Re-enable submit button
      }
      setIsSubmitting(false); // Re-enable submit button
    }
  };

  const getId = (e) => {
    setCategoryId(e.target.value);
  };

  const getCategory = () => {
    const token = localStorage.getItem("token");
    let config = {
      method: "get",
      url: `${baseurl.BASE_URL}api/admin/categories/getAll`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        setCategory(response.data.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdf(file);
      setError(null); // Clear any previous error message
    } else {
      setPdf([]);
      e.target.value = null; // Clear the file input
      toast.error("Please select a valid PDF file");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setError(null); // Clear any previous error message
    } else {
      setImage([]);
      e.target.value = null; // Clear the file input
      toast.error("Please select a valid image file");
    }
  };

  // const validatePrices = (price, discountPrice) => {
  //   const parsedPrice = parseFloat(price);
  //   const parsedDiscountPrice = parseFloat(discountPrice);

  //   if (isNaN(parsedDiscountPrice) || parsedDiscountPrice <= parsedPrice || discountPrice.includes(".")) {
  //     setShowError(true);
  //   } else {
  //     setShowError(false);
  //   }
  // };

  const validatePrices = (price, discountPrice) => {
    const parsedPrice = parseFloat(price);
    const parsedDiscountPrice = parseFloat(discountPrice);
  
    if (!discountPrice) {
      setShowError(false);
      return true;
    }
  
    if (isNaN(parsedDiscountPrice) || parsedDiscountPrice <= parsedPrice || discountPrice.includes(".")) {
      setShowError(true);
      return false;
    } else {
      setShowError(false);
      return true;
    }
  };
  

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setPrice(value);
      validatePrices(value, discountPrice); // Validate prices
    }
  };

  const handleDiscountPriceChange = (e) => {
    const value = e.target.value;
    setDiscountPrice(value);
    validatePrices(price, value); // Validate prices
  };

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
              <h4 className="dashpage-title">Add New Product</h4>
              <form onSubmit={handleToSetProduct}>
                <div className="card add-product-field">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-4 mb-4">
                        <label htmlFor="">Title</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Product Name"
                          required
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>

                      <div className="col-md-8 mb-4">
                        <label htmlFor="description">Description</label>
                        <textarea
                          id="description"
                          type="text"
                          className="form-control"
                          placeholder="Description"
                          value={description}
                          maxLength={maxLength}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                        <small className="text-muted">
                          {description.length}/{maxLength} characters
                        </small>
                      </div>

                      <div className="col-md-4 mb-4">
                        <label htmlFor="category">Category</label>
                        <select
                          name="category"
                          id="category"
                          className="form-control"
                          onChange={getId}
                        >
                          <option selected value={""}>
                            Select Category
                          </option>
                          {category.map((categories) => (
                            <option key={categories.id} value={categories.id}>
                              {categories.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-md-4 mb-4">
                        <label htmlFor="price">Price</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="$ Price"
                          value={price}
                          onChange={handlePriceChange}
                          required
                        />
                      </div>

                      <div className="col-md-4 mb-4">
                        <label htmlFor="">Previous Price</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="$ Previous Price"
                          value={discountPrice}
                          onChange={handleDiscountPriceChange}
                          onBlur={(e) => validatePrices(price, e.target.value)}
                        />
                        {showError && (
                          <p style={{ color: "red" }}>
                            Previous price must be a valid integer, greater than
                            the current price, and not contain decimal values.
                          </p>
                        )}
                      </div>

                      <div className="col-md-4 mb-4">
                        <label htmlFor="year">Year</label>
                        <input
                          type="number"
                          required
                          className="form-control"
                          placeholder="YYYY"
                          value={year}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value >= 0) {
                              setYear(value);
                            }
                          }}
                        />
                      </div>

                      <div className="col-md-4 mb-4">
                        <label htmlFor="">Publishers</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Publishers"
                          value={publisher}
                          required
                          onChange={(e) => setPublisher(e.target.value)}
                        />
                      </div>

                      <div className="col-md-4 mb-4">
                        <label htmlFor="">Written By</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Written By"
                          value={writtenBy}
                          required
                          onChange={(e) => setWrittenBy(e.target.value)}
                        />
                      </div>

                      <div className="col-md-4 mb-4">
                        <label htmlFor="productImage">Product Image</label>
                        <input
                          type="file"
                          className="form-control"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </div>

                      {categoryId === "1" && (
                        <div className="col-md-4 mb-4">
                          <label htmlFor="pdf">PDF</label>
                          <input
                            type="file"
                            className="form-control"
                            accept="application/pdf"
                            placeholder="PDF"
                            onChange={(e) => handlePdfChange(e)}
                          />
                        </div>
                      )}

                      <div className="col-md-12 mb-4">
                        <input
                          type="checkbox"
                          name="isLuluProduct"
                          checked={isLuluProduct}
                          onChange={() => setIsLuluProduct(!isLuluProduct)}
                        />
                        <label className="mx-2">Lulu Product</label>
                      </div>

                      {isLuluProduct && (
                        <>
                          <div className="col-md-4 mb-4">
                            <label htmlFor="">Lulu Book ID</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Lulu Book ID"
                              value={luluBookId}
                              onChange={(e) => setLuluBookId(e.target.value)}
                            />
                          </div>

                          <div className="col-md-4 mb-4">
                            <label htmlFor="">Cover URL</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Cover URL"
                              value={coverUrl}
                              onChange={(e) => setCoverUrl(e.target.value)}
                            />
                          </div>
                          <div className="col-md-4 mb-4">
                            <label htmlFor="">Interior URL</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Interior URL"
                              value={interiorUrl}
                              onChange={(e) => setInteriorUrl(e.target.value)}
                            />
                          </div>
                        </>
                      )}
                    </div>
                    <div className="row">
                      <div className="col-md-2 mb-2 mt-3">
                        <input type="submit" disabled={isSubmitting} />
                        <ToastContainer />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
