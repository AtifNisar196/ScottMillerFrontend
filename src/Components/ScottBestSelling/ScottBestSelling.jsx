import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import testiomanialpic from "../../assets/images/testimonial-person.png";
import book1 from "../../assets/images/book1.png";
import book2 from "../../assets/images/book2.png";
import book3 from "../../assets/images/book3.png";
import book4 from "../../assets/images/book4.png";
import baseurl from "../../Config/config";
import "./scottbestselling.scss";
import { Link } from "react-router-dom";

const ScottBestSelling = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

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
          `${baseurl.BASE_URL}api/frontend/products/getAll`,
          config
        );
        setProducts(response.data.data.data);
        // console.log(response.data.data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bestsellingbooks-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <div className="left-side-wrapper">
              <div
                className="bestselling-books"
                data-aos="zoom-in"
                data-aos-duration="1000"
              >
                <h4>Best Selling Books By</h4>
                <h2>Scott Miller</h2>

                <p className="middle-para">Miller books available on website</p>
                <p>
                  Books that can be read independently yet form a sequential
                  experience reveal a unique and mysterious world filled with
                  twists.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <div
              className="book-selling-wrapper"
              data-aos="zoom-in"
              data-aos-duration="1000"
            >
              <Swiper
                slidesPerView={1}
                spaceBetween={10}
                pagination={{
                  clickable: true,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 50,
                  },
                }}
                rewind={true}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
              >
                {products?.map((book) => (
                  <SwiperSlide key={book.id}>
                    <Link to={`product/${book.id}`}>
                      <div className="book-wrapper" key={book.id}>
                        <div className="book-img">
                          <img src={book.image} alt={book.title} />
                        </div>
                        <div className="book-content">
                          <h4>{book.title}</h4>
                          
                          <p>${book.price}</p>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScottBestSelling;
