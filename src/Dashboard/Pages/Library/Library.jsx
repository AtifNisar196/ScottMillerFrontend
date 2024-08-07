import React, { useState, useRef } from "react";
import "./library.scss";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import Footer from "../../../Components/CommonComponents/Footer/Footer";
import Header from "../../../Components/CommonComponents/Header/Header";

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

function Library() {
  const [numPages, setNumPages] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const flipBookRef = useRef(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleBookmark = (pageNum) => {
    setBookmarks((prev) =>
      prev.includes(pageNum)
        ? prev.filter((num) => num !== pageNum)
        : [...prev, pageNum]
    );
  };

  const handlePageTurn = (e) => {
    const nextPage = e.data;

    if (!bookmarks.includes(currentPage) || nextPage <= currentPage) {
      setCurrentPage(nextPage);
    } else {
      alert("Please remove the bookmark before turning the page.");
    }
  };

  return (
    <>
      <Header />
     
      <div className="middlesecbook">
        <HTMLFlipBook
          width={600}
          height={800}
          showCover={true}
          ref={flipBookRef}
          onFlip={handlePageTurn}
        >
          {[...Array(numPages).keys()].map((n) => (
            <Pages
              key={n}
              number={`${n + 1}`}
              isBookmarked={bookmarks.includes(n + 1)}
              onBookmark={() => handleBookmark(n + 1)}
            >
              <Document file={`https://cors-anywhere.herokuapp.com/${pdflink}`} onLoadSuccess={onDocumentLoadSuccess}>
                <Page
                  pageNumber={n + 1}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                  width={600}
                  height={800}
                  className="border-3 border-black"
                />
              </Document>
            </Pages>
          ))}
        </HTMLFlipBook>
      </div>
      <Footer />
    </>
  );
}

export default Library;
