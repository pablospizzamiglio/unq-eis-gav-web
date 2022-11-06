import React from "react";
import { useParams } from "react-router-dom";

const Order = () => {
  const { orderId } = useParams();
  return <div>Order</div>;
};

export default Order;
