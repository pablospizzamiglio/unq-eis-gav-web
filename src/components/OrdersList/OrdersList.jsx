import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API, { formatOrderStatus } from "../../services";
import LoadingError from "../LoadingError";
import Spinner from "../Spinner";

const OrdersList = ({ status, title, link }) => {
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
    <div className="row mb-3">
      <h1 className="important-title">{title}</h1>
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
    <div className="container py-4">
      {renderTitle()}

      {error && <LoadingError />}

      {!error && (
        <>
          <div className="row">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th scope="col"></th>
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
                        <Link
                          to={`${link}/${order.id}`}
                          className="btn btn-primary btn-sm"
                        >
                          Manage
                        </Link>
                      </th>
                      <td>{`${order.assistance.user.firstName} ${order.assistance.user.lastName}`}</td>
                      <td>{formatOrderStatus(order.status)}</td>
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
