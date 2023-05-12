import React, { useState } from "react";
import DataTable from "react-data-table-component";
const customStyles = {
  headCells: {
    style: {
      fontSize: "16px",
      padding: "20px 20px",
    },
  },
  cells: {
    style: {
      fontSize: "16px",
      padding: "20px 20px",
    },
  },
};
const TableComp = (props) => {
  const { data, columns, loader, error } = props;
  return (
     
        <DataTable
          columns={columns}
          data={data}
          responsive
          customStyles={customStyles}
        />
  );
};

export default TableComp;
