import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/API";
import LoadingError from "../LoadingError";
import Spinner from "../Spinner";

const OrdersList = ({ status }) => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    API.getOrders(status)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [status]);

  const renderTitle = () => (
    <div className="row">
      <h1 className="important-title">Pending Orders</h1>
    </div>
  );

  if (isLoading) {
    return (
      <>
        {renderTitle()}
        <div className="container py-4">
          <Spinner fullscreen={false} />
        </div>
      </>
    );
  }

  return (
    <div className="container">
      {renderTitle()}

      {error && <LoadingError />}

      {!error && (
        <>
          <div className="row">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Order ID</th>
                  <th scope="col">Assistance</th>
                  <th scope="col">Status</th>
                  <th scope="col">Street</th>
                  <th scope="col">City</th>
                  <th scope="col">Province</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">User Name</th>
                </tr>
              </thead>
              <tbody>
                {!isLoading &&
                  orders.result.map((order, i) => (
                    <tr key={i}>
                      <th scope="row">
                        <Link to={`/order-updater/${order.id}`}>
                          {order.id}
                        </Link>
                      </th>
                      <td>{`${order.assistance.user.firstName} ${order.assistance.user.lastName}`}</td>
                      <td>{order.status.replaceAll("_", " ")}</td>
                      <td>{order.street}</td>
                      <td>{order.city}</td>
                      <td>{order.province}</td>
                      <td>{order.phoneNumber}</td>
                      <td>{`${order.user.firstName} ${order.user.lastName}`}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default OrdersList;
