import React from "react";

const Certificate = () => {
  return (
    <div className="certificate">
      <div className="certificate-container">
        <img src="/certificate.jpg" />
        {/* <div > */}
        <div className="certificate-data">
          <h3>Mohd.Shees</h3>
        </div>
        <h3 className="certificate-founder-name">MOHD.SHEES</h3>
        <h6 className="certificate-founder">Founder</h6>
        <div className="certificate-manager-name">
          <h3>ANAS ADNAN</h3>
        </div>
        <h6 className="certificate-manager">Project Manager</h6>
        <div className="certificate-date-name">
          <h3>2018-08-13</h3>
        </div>
        <h6 className="certificate-date">Date</h6>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Certificate;
