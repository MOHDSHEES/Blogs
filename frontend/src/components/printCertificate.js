// // import React from "react";
// // import { jsPDF } from "jspdf";
// // import html2canvas from "html2canvas";
// // import Certificate from "./certificate";

// // function printDocument() {
// //   const input = document.getElementById("divToPrint");
// //   html2canvas(input).then((canvas) => {
// //     const imgData = canvas.toDataURL("image/png");
// //     const pdf = new jsPDF();
// //     pdf.addImage(imgData, "JPEG", 0, 0);
// //     // pdf.output('dataurlnewwindow');
// //     pdf.save("download.pdf");
// //   });
// // }
// // const PrintCertificate = () => {
// //   return (
// //     <div>
// //       <div className="mb5">
// //         <button onClick={printDocument}>Print</button>
// //       </div>
// //       <div
// //         id="divToPrint"
// //         className="mt4"
// //         style={{
// //           backgroundColor: "#f5f5f5",
// //           width: "210mm",
// //           minHeight: "297mm",
// //           marginLeft: "auto",
// //           marginRight: "auto",
// //         }}
// //       >
// //         <Certificate />
// //       </div>
// //     </div>
// //   );
// // };

// // export default PrintCertificate;

// import { useEffect, useRef } from "react";
// import jsPDF from "jspdf";
// import Certificate from "./certificate";

// function PrintCertificate() {
//   const reportTemplateRef = useRef(null);

//   const handleGeneratePdf = () => {
//     // const doc = new jsPDF({
//     //   format: [424.2, 601],
//     //   unit: "px",
//     // });

//     // Adding the fonts.
//     // doc.setFont("Italianno", "normal");
//     // doc.addFileToVFS(
//     //   "Italianno-regular.ttf",
//     //   "Italianno-regularTtfBase64Encoded"
//     // );
//     // doc.addFont("Italianno-Regular.ttf", "Italianno-Regular", "normal");
//     doc.addFont("/fonts/Charm-Bold.ttf", "Charm-Bold", "normal");
//     doc.addFont("/fonts/Roboto-Bold.ttf", "Roboto-Bold", "normal");

//     // doc.setFont("Inter-Regular", "normal");

//     // doc.setFont("Italianno");

//     const imgData = "certificate.png"; // Replace with your image URL
//     doc.addImage(
//       imgData,
//       "PNG",
//       0,
//       0,
//       doc.internal.pageSize.getWidth(),
//       doc.internal.pageSize.getHeight()
//     );
//     // doc.setFont("Italianno-Regular", "normal");
//     doc.setFont("Charm-Bold", "normal");
//     doc.setFontSize(40); // Set the font size to 16
//     doc.setTextColor(94, 27, 34);
//     doc.text("Mohd.Shees", doc.internal.pageSize.getWidth() / 2, 300, {
//       align: "center",
//     });

//     // heading
//     doc.setFont("Roboto-Bold", "normal");
//     doc.setTextColor(94, 27, 34);
//     // const backgroundColor = { r: 255, g: 0, b: 0 };
//     // doc.setFillColor(backgroundColor.r, backgroundColor.g, backgroundColor.b);
//     // doc.rect(areaX, areaY, areaWidth, areaHeight, "F");
//     // doc.setFont("Bold");
//     doc.setFontSize(47);
//     doc.text("CERTIFICATE", doc.internal.pageSize.getWidth() / 2, 80, {
//       align: "center",
//     });
//     doc.setFontSize(20);
//     doc.text("OF COMPLETION", doc.internal.pageSize.getWidth() / 2, 110, {
//       align: "center",
//     });
//     doc.text(
//       "PROUDLY PRESENTED TO",
//       doc.internal.pageSize.getWidth() / 2,
//       250,
//       {
//         align: "center",
//       }
//     );
//     // const imageUrl = "logo512.png"; // Replace with your image URL or base64 data

//     // // Define the position and size of the image
//     // const pageWidth = doc.internal.pageSize.getWidth();
//     // const imgWidth = 70;
//     // const imgHeight = 70;
//     // const xa = (pageWidth - imgWidth) / 2;

//     // // Add the image to the PDF
//     // doc.addImage(imageUrl, "JPEG", xa, 5, imgWidth, imgHeight);
//     // founder
//     const areaWidth = 133; // Width of the area
//     const areaHeight = 100; // Height of the area
//     let areaX = 70; // X-coordinate of the area's top-left corner
//     let areaY = 435;
//     let centerX = areaX + areaWidth / 2;
//     doc.setFont("Inter-Regular", "normal");
//     doc.setTextColor(0, 0, 0);
//     doc.setFontSize(13);
//     doc.text("Founder", centerX, areaY + areaHeight / 2, { align: "center" });

//     // reg no.
//     doc.setFontSize(8);
//     doc.text("Reg.No: UDYAM-UP-17-0017152", 300, 14);
//     doc.text("Certificate.No: 170017152ye33", 300, 22);
//     doc.setFontSize(9);
//     doc.text(
//       'To verify the certificate, visit " https://www.offtheweb.in/verify ".',
//       30,
//       590
//     );

//     const imageUrl = "sign.png"; // Replace with your image URL or base64 data

//     // Define the position and size of the image
//     // const pageWidth = doc.internal.pageSize.getWidth();
//     const imgWidth = 120;
//     const imgHeight = 70;
//     // const xa = (pageWidth - imgWidth) / 2;

//     // founder name
//     doc.setFont("Roboto-Bold", "normal");
//     doc.setTextColor(94, 27, 34);
//     areaY = 413;
//     areaX = 66;
//     doc.addImage(imageUrl, "JPEG", areaX, 428, imgWidth, imgHeight);
//     // const backgroundColor = { r: 255, g: 0, b: 0 };
//     // doc.setFillColor(backgroundColor.r, backgroundColor.g, backgroundColor.b);
//     // doc.rect(areaX, areaY, areaWidth, areaHeight, "F");
//     // doc.setFont("Bold");
//     doc.setFontSize(17);
//     // doc.text("MOHD.SHEES", centerX, areaY + areaHeight / 2, {
//     //   align: "center",
//     // });

//     // project-manager name
//     areaY = 413;
//     areaX = 229;
//     centerX = areaX + areaWidth / 2;
//     const imgUrl = "anasSign.png";
//     // const backgroundColor = { r: 255, g: 0, b: 0 };
//     // doc.setFillColor(backgroundColor.r, backgroundColor.g, backgroundColor.b);
//     // doc.rect(areaX, areaY, areaWidth, areaHeight, "F");
//     // doc.setFont("Bold");
//     doc.addImage(imgUrl, "JPEG", areaX, 428, imgWidth, imgHeight);
//     // doc.text("ANAS ADNAN", centerX, areaY + areaHeight / 2, {
//     //   align: "center",
//     // });

//     // project-manager
//     areaY = 435;
//     doc.setFont("Inter-Regular", "normal");
//     doc.setTextColor(0, 0, 0);
//     doc.setFontSize(13);
//     doc.text("Project Manager", centerX, areaY + areaHeight / 2, {
//       align: "center",
//     });

//     // date
//     doc.setFontSize(13);
//     doc.text("Date", doc.internal.pageSize.getWidth() / 2, 550, {
//       align: "center",
//     });

//     // Date value
//     doc.setFontSize(17);
//     doc.setTextColor(94, 27, 34);
//     doc.setFont("Roboto-Bold", "normal");
//     doc.text("2018-08-23", doc.internal.pageSize.getWidth() / 2, 530, {
//       align: "center",
//     });

//     doc.setFontSize(15);
//     doc.setTextColor(146, 45, 55);
//     doc.setFont("Roboto-Bold", "normal");
//     doc.text(
//       "We are happy to certify that [employee name] has completed",
//       doc.internal.pageSize.getWidth() / 2,
//       340,
//       {
//         align: "center",
//       }
//     );
//     doc.text(
//       "a three months internship with us as a [position] from [date] to [date]",
//       doc.internal.pageSize.getWidth() / 2,
//       360,
//       {
//         align: "center",
//       }
//     );
//     doc.text(
//       "We appreciatte his work and contribution.",
//       doc.internal.pageSize.getWidth() / 2,
//       380,
//       {
//         align: "center",
//       }
//     );

//     doc.text(
//       "This certificate is awarded by:",
//       doc.internal.pageSize.getWidth() / 2,
//       420,
//       {
//         align: "center",
//       }
//     );

//     // pdf preview
//     // var string = doc.output("datauristring");
//     // var embed = "<embed width='100%' height='100%' src='" + string + "'/>";
//     // var x = window.open();
//     // x.document.open();
//     // x.document.write(embed);
//     // x.document.close();
//     // pdf download
//     doc.html(reportTemplateRef.current, {
//       async callback(doc) {
//         await doc.save("certificate");
//       },
//     });
//   };

//   return (
//     <div>
//       <button className="button btn btn-primary" onClick={handleGeneratePdf}>
//         Generate PDF
//       </button>
//       <div ref={reportTemplateRef}>{/* <Certificate /> */}</div>
//     </div>
//   );
// }

// export default PrintCertificate;
