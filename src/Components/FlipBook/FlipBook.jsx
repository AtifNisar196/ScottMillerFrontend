import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import PDFViewer from '../PDFViewer/PDFViewer';

const FlipBook = ({ pdfUrl }) => {
    const [flipped, setFlipped] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); // Keep track of the current page

    const { transform, opacity } = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `rotateY(${flipped ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 },
    });

    const nextPage = () => {
        if (!flipped) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const prevPage = () => {
        if (flipped) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    return (
        <div
            onClick={() => setFlipped(state => !state)}
            style={{ perspective: '1500px' }}
        >
            <animated.div
                style={{
                    opacity: opacity.interpolate(o => 1 - o),
                    transform,
                    transformStyle: 'preserve-3d',
                    position: 'absolute',
                    width: '100%',
                    pointerEvents: flipped ? 'none' : 'auto', // Disable pointer events when flipped
                }}
            >
                <PDFViewer pdfUrl={pdfUrl} onPageChange={nextPage} currentPage={currentPage} />
            </animated.div>
            <animated.div
                style={{
                    opacity,
                    transform: transform.interpolate(t => `${t} rotateY(180deg)`),
                    transformStyle: 'preserve-3d',
                    position: 'absolute',
                    width: '100%',
                    pointerEvents: flipped ? 'auto' : 'none', // Enable pointer events when flipped
                }}
            >
                <PDFViewer pdfUrl={pdfUrl} onPageChange={prevPage} currentPage={currentPage} />
            </animated.div>
        </div>
    );
};

export default FlipBook;
