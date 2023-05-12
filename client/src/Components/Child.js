import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import TableComp from "../Common/TableComp";
import Pager from "../Common/Pagination";
import { config } from "../Common/config";

const Child = () => {
  const navigate = useNavigate();
  const params = useParams();
  const {id}=params;
  const [list, setList] = useState([]);
  const [sort, setSort] = useState(0);
  const tableColumns = [
    {
      selector: (row) =>row. id,
      name: "ID",
    },
    {
      selector: (row) => row.sender,
      name: "Sender",
    },
    {
      selector: (row) =>row.receiver,
      name: "Receiver",
    },
    {
      selector: (row) => row.totalAmount,
      name: "Total Amount",
    },
    {
      selector: (row) => row.paidAmount,
      name: "Paid Amount",
    },
  ];
  useEffect(() => {
    getList();
  }, []);
  const getList = () => {
    axios
      .get(
        `${config.baseUrl}/child/${id}`
      )
      .then(function (response) {setList(response.data)})
      .catch((error) => {});
  };
  return (
    <>
     <h4 className="p-5">Child transactions</h4>
      <TableComp
        data={list}
        columns={tableColumns}
      />
    </>
  );
};

export default Child;
