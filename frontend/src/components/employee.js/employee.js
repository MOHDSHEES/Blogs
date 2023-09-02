import React, { useState } from "react";
import EmployeeProfile from "./employeeProfile";
import EmployeeSidebar from "./EmployeeSidebar";

const Employee = () => {
  const [data, setData] = useState(null);
  return (
    <div className="body">
      <EmployeeSidebar data={data} />
      <div>
        <div className="col" style={{ marginTop: "80px", padding: 0 }}>
          <EmployeeProfile setData={setData} />
        </div>
      </div>
    </div>
  );
};

export default Employee;
