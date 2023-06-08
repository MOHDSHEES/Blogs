import React from "react";
import EmployeeProfile from "./employeeProfile";
import EmployeeSidebar from "./EmployeeSidebar";

const Employee = () => {
  return (
    <div className="body">
      <EmployeeSidebar />
      <div>
        <div className="col" style={{ marginTop: "80px", padding: 0 }}>
          <EmployeeProfile />
        </div>
      </div>
    </div>
  );
};

export default Employee;
