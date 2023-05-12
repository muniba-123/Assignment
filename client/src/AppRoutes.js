import React from "react";
import { Route, Routes } from "react-router-dom";
import Child from "./Components/Child";
import Parent from "./Components/Parent";
let AppRoutes = () => {
  return (
        <Routes>
          <Route path="/home/:id" exact element={<Child/>} />
          <Route path="/home" exact element={<Parent />} />
          <Route path="*" element={<Parent />} />
        </Routes>
  );
};
export default AppRoutes;
