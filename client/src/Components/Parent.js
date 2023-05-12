import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TableComp from "../Common/TableComp";
import Pager from "../Common/Pagination";
import axios from 'axios'
import { config } from "../Common/config";
import arrowUp from "../Assets/icons/arrow-up.svg";
import arrowDown from "../Assets/icons/arrow-down.svg";
const Parent = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [sort, setSort] = useState(0);
  const [pager, setPager] = useState({ current_page: 1, per_page: 2 });
  const tableColumns = [
    {
      selector: (row) => {
        return (
            <a href={`/home/${row.id}`}
           >{row.id}</a>
        );
      },
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
      selector: (row) => row.totalPaidAmount?row.totalPaidAmount:0,
      name: "Total Paid Amount",
    },
  ];
  useEffect(() => {
    getList();
  }, [sort]);
  const getList = (current=pager.current_page) => {
    axios.get(`${config.baseUrl}/parent?pageNumber=${current}&pageSize=${pager.per_page}&sort=${sort}`)

      .then(function (response) {
        setList(response.data.data);
        setPager({...pager, current_page: current,total:response.data.total });
  
      }
      )
      .catch((error) => {});
  };
  return (
    <>
    <h4 className="p-5">Parent transactions</h4>
    <div className="sort"><span>Sort</span>
    <img alt="" width={12} height={12} src={sort===0? arrowUp:arrowDown} onClick={()=>setSort(sort===1?0:1)}/>
    </div>
      <TableComp
        data={list}
        columns={tableColumns}
      />
      <Pager
        total={pager.total}
        current={pager.current_page}
        onChange={(current) => {
          setPager({ ...pager, current_page: current });
          getList(current);
        }}
        pageSize={pager.per_page}
      />
    </>
  );
};

export default Parent;
