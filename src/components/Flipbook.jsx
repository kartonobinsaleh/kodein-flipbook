import HTMLFlipBook from "react-pageflip";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// Page Component with no propTypes, just direct usage
const Pages = React.forwardRef((props, ref) => {
  // eslint-disable-next-line react/prop-types
  const { children, number } = props;
  return (
    <div ref={ref}>
      {/* <h1>Page Header</h1> */}
      <p>{children}</p>
      <p>Page number: {number}</p>
    </div>
  );
});

// Add displayName to avoid ESLint warning
Pages.displayName = "Page";

const Flipbook = () => {
  const [numPages, setNumPages] = useState();

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <HTMLFlipBook width={400} height={570}>
        {[...Array(numPages).keys()].map((index) => (
          <Pages key={index} number={index + 1}>
            <Document file="/kodein.pdf" onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={index + 1} width={400} /> {/* Add 1 to index */}
            </Document>
          </Pages>
        ))}
      </HTMLFlipBook>
    </div>
  );
};

export default Flipbook;
