import React from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const PDFViewer = ({ pdfUrl, onPageChange, currentPage }) => {
    return (
        <div style={{ height: '750px', width: '100%' }}>
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                <Viewer fileUrl={pdfUrl} onPageChange={({ pageNumber }) => onPageChange(pageNumber)} defaultScale={1} defaultPage={currentPage} />
            </Worker>
        </div>
    );
};

export default PDFViewer;
