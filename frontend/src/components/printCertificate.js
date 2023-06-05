// import React from "react";
// import { jsPDF } from "jspdf";
// import html2canvas from "html2canvas";
// import Certificate from "./certificate";

// function printDocument() {
//   const input = document.getElementById("divToPrint");
//   html2canvas(input).then((canvas) => {
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF();
//     pdf.addImage(imgData, "JPEG", 0, 0);
//     // pdf.output('dataurlnewwindow');
//     pdf.save("download.pdf");
//   });
// }
// const PrintCertificate = () => {
//   return (
//     <div>
//       <div className="mb5">
//         <button onClick={printDocument}>Print</button>
//       </div>
//       <div
//         id="divToPrint"
//         className="mt4"
//         style={{
//           backgroundColor: "#f5f5f5",
//           width: "210mm",
//           minHeight: "297mm",
//           marginLeft: "auto",
//           marginRight: "auto",
//         }}
//       >
//         <Certificate />
//       </div>
//     </div>
//   );
// };

// export default PrintCertificate;

import { useRef } from "react";
import jsPDF from "jspdf";
import Certificate from "./certificate";

function PrintCertificate() {
  const reportTemplateRef = useRef(null);

  const handleGeneratePdf = () => {
    const doc = new jsPDF({
      format: [424.2, 601],
      unit: "px",
    });

    // Adding the fonts.
    doc.setFont("Inter-Regular", "normal");

    doc.html(reportTemplateRef.current, {
      async callback(doc) {
        await doc.save("document");
      },
    });
  };

  return (
    <div>
      <button className="button" onClick={handleGeneratePdf}>
        Generate PDF
      </button>
      <div ref={reportTemplateRef}>
        <Certificate />
      </div>
    </div>
  );
}

export default PrintCertificate;
