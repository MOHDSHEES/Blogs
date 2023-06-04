import React from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

function printDocument() {
  const input = document.getElementById("divToPrint");
  html2canvas(input).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "JPEG", 0, 0);
    // pdf.output('dataurlnewwindow');
    pdf.save("download.pdf");
  });
}
const PrintCertificate = () => {
  return (
    <div>
      <div className="mb5">
        <button onClick={printDocument}>Print</button>
      </div>
      {/* <div
        id="divToPrint"
        className="mt4"
        style={{
          backgroundColor: "#f5f5f5",
          width: "210mm",
          minHeight: "297mm",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      > */}
      <body className="certificatebody">
        <div className="container pm-certificate-container">
          <div className="outer-border" />
          <div className="inner-border" />
          <div className="pm-certificate-border col-xs-12">
            <div className="row pm-certificate-header">
              <div className="pm-certificate-title cursive col-xs-12 text-center">
                <h2>Buffalo Public Schools Certificate of Completion</h2>
              </div>
            </div>
            <div className="row pm-certificate-body">
              <div className="pm-certificate-block">
                <div className="col-xs-12">
                  <div className="row">
                    <div className="col-xs-2">{/* LEAVE EMPTY */}</div>
                    <div className="pm-certificate-name underline margin-0 col-xs-8 text-center">
                      <span className="pm-name-text bold">
                        TrueNorth Administrator
                      </span>
                    </div>
                    <div className="col-xs-2">{/* LEAVE EMPTY */}</div>
                  </div>
                </div>
                <div className="col-xs-12">
                  <div className="row">
                    <div className="col-xs-2">{/* LEAVE EMPTY */}</div>
                    <div className="pm-earned col-xs-8 text-center">
                      <span className="pm-earned-text padding-0 block cursive">
                        has earned
                      </span>
                      <span className="pm-credits-text block bold sans">
                        PD175: 1.0 Credit Hours
                      </span>
                    </div>
                    <div className="col-xs-2">{/* LEAVE EMPTY */}</div>
                    <div className="col-xs-12" />
                  </div>
                </div>
                <div className="col-xs-12">
                  <div className="row">
                    <div className="col-xs-2">{/* LEAVE EMPTY */}</div>
                    <div className="pm-course-title col-xs-8 text-center">
                      <span className="pm-earned-text block cursive">
                        while completing the training course entitled
                      </span>
                    </div>
                    <div className="col-xs-2">{/* LEAVE EMPTY */}</div>
                  </div>
                </div>
                <div className="col-xs-12">
                  <div className="row">
                    <div className="col-xs-2">{/* LEAVE EMPTY */}</div>
                    <div className="pm-course-title underline col-xs-8 text-center">
                      <span className="pm-credits-text block bold sans">
                        BPS PGS Initial PLO for Principals at Cluster Meetings
                      </span>
                    </div>
                    <div className="col-xs-2">{/* LEAVE EMPTY */}</div>
                  </div>
                </div>
              </div>
              <div className="col-xs-12">
                <div className="row">
                  <div className="pm-certificate-footer">
                    <div className="col-xs-4 pm-certified col-xs-4 text-center">
                      <span className="pm-credits-text block sans">
                        Buffalo City School District
                      </span>
                      <span className="pm-empty-space block underline" />
                      <span className="bold block">
                        Crystal Benton Instructional Specialist II, Staff
                        Development
                      </span>
                    </div>
                    {/* <div className="col-xs-4">LEAVE EMPTY</div> */}
                    <div className="col-xs-4 pm-certified col-xs-4 text-center">
                      <span className="pm-credits-text block sans">
                        Date Completed
                      </span>
                      <span className="pm-empty-space block underline" />
                      <span className="bold block">DOB: </span>
                      <span className="bold block">
                        Social Security # (last 4 digits)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>

    // </div>
  );
};

export default PrintCertificate;
