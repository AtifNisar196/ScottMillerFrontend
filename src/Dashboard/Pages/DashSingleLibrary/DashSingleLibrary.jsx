import React, { useState, useEffect, useRef } from "react";
import "./dashsinglelibrary.scss";
import axios from "axios";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Sidebar from "../../Components/Sidebar/sidebar";
import { Box, CircularProgress, useMediaQuery } from "@mui/material";
import baseurl from "../../../Config/config";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Pages = React.forwardRef((props, ref) => {
  const isBookmarked = props.isBookmarked;
  return (
    <div className={`demoPage ${isBookmarked ? "highlight" : ""}`} ref={ref}>
      <div className="page-content">
        <p>{props.children}</p>
        <p>Page number: {props.number}</p>
      </div>
      <div className="page-controls">
        <button className="bookmark-btn" onClick={props.onBookmark}>
          {isBookmarked ? "Remove Bookmark" : "Bookmark"}
        </button>
      </div>
      {isBookmarked && <div className="bookmark"></div>}
    </div>
  );
});

const DashSingleLibrary = () => {
  const [library, SetLibrary] = useState([]);
  const [pdflink, SetPdfLink] = useState("");
  const [numPages, setNumPages] = useState(null);
  const [bookmark, setBookmark] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const flipBookRef = useRef(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `${baseurl.BASE_URL}api/frontend/liberary/show/${id}`,
          config
        );
        const libraryData = response.data.data;
        SetLibrary(libraryData);
        SetPdfLink(libraryData.pdf);
        if (libraryData.bookmark_page) {
          setBookmark(parseInt(libraryData.bookmark_page.page_no, 10));
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    if (bookmark && flipBookRef.current) {
      flipBookRef.current.pageFlip().flip(bookmark - 1);
    }
  };

  const handleBookmark = async (pageNum) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const data = {
        product_id: id,
        page_no: pageNum,
      };
      await axios.post(
        `${baseurl.BASE_URL}api/frontend/liberary/bookmark/page`,
        data,
        config
      );
      setBookmark(pageNum); // Update the bookmark state to reflect only the current bookmark
    } catch (error) {
      console.error("Error bookmarking page:", error);
    }
  };

  const handlePageTurn = (e) => {
    const nextPage = e.data;
    setCurrentPage(nextPage);
  };

  const isMobile = useMediaQuery("(max-width:600px)");

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
    <>
      <div className="dashpage-wrapper">
        <div className="container-fluid">
          <Navbar />
          <div className="row">
            <div className="col-lg-2">
              <Sidebar />
            </div>
            <div className="col-lg-1"></div>
            {library && (
              <div className="col-lg-9 mt-4 desc_lib">
                <div className="row align-items-center">
                  <div className="col-md-3">
                    <div className="cart-img">
                      <img src={library.image} alt={library.title} />
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div className="single-product">
                      <h5>{library.title}</h5>
                      {library.disc_price > 0 ? (
                        <p>
                          <ins>${library.disc_price}</ins>{" "}
                          <del>${library.price}</del>
                        </p>
                      ) : (
                        <p>
                          <ins>${library.price}</ins>
                        </p>
                      )}
                      <div>
                        <h3>Description</h3>
                        <small>{library.description}</small>
                      </div>
                      {/* <button className="buynow-btn mt-4">Buy Now</button> */}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {console.log(pdflink)}
          {pdflink !== null ? (
            <div className="row read-row mt-5">
              <div className="col-lg-12">
                <div className="ebook-head">
                  <h3>Read Ebook</h3>
                </div>
              </div>
              <div className="middlesecbook">
                <HTMLFlipBook
                  width={isMobile ? 300 : 600}
                  height={isMobile ? 400 : 800}
                  showCover={true}
                  mobileScrollSupport={true}
                  ref={flipBookRef}
                  onFlip={handlePageTurn}
                >
                  {[...Array(numPages).keys()].map((n) => (
                    <Pages
                      key={n}
                      number={`${n + 1}`}
                      isBookmarked={bookmark === n + 1}
                      onBookmark={() => handleBookmark(n + 1)}
                    >
                      <Document
                        file={`${pdflink}`}
                        onLoadSuccess={onDocumentLoadSuccess}
                      >
                        <Page
                          pageNumber={n + 1}
                          renderAnnotationLayer={false}
                          renderTextLayer={false}
                          width={isMobile ? 300 : 600}
                          height={isMobile ? 400 : 800}
                          className="border-3 border-black"
                        />
                      </Document>
                    </Pages>
                  ))}
                </HTMLFlipBook>
              </div>
            </div>
          ) : (
            <div className="row read-row mt-5">
              <>pdf not available</>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DashSingleLibrary;
