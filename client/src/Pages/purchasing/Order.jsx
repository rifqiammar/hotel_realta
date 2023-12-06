import React from "react";
import OrderHeader from "../../components/Purchasing/OrderHeader";

const Order = ({ Content }) => {
  return (
    <>
      <OrderHeader Content={Content} />
    </>
  );
};

export default Order;
