import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { URIS } from "../../constants";
import API from "../../services/API";
import Spinner from "../Spinner";

const Order = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    API.getOrder(orderId)
      .then((response) => {
        setOrder(response.data);
      })
      .catch((error) => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [orderId]);

  const renderTitle = () => (
    <div className="row">
      <h1 className="important-title">Order Details</h1>
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
      <div className="row">
        <h1 className="important-title">Order Details</h1>
      </div>

      <div className="row d-flex justify-content-center">
        <form>
          <div className="mb-3 row">
            <label htmlFor="orderId" className="col-sm-2 col-form-label">
              Order Id
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="orderId"
                required={true}
                value={order.id}
                disabled
                readOnly
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="assistance" className="col-sm-2 col-form-label">
              Assistance
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="assistance"
                required={true}
                value={`${order.assistance.user.firstName} ${order.assistance.user.lastName}`}
                disabled
                readOnly
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="costPerKm" className="col-sm-2 col-form-label">
              Cost Per Km
            </label>
            <div className="col-sm-10">
              <div className="input-group">
                <span className="input-group-text">$</span>
                <input
                  type="text"
                  className="form-control"
                  id="costPerKm"
                  required={true}
                  value={order.costPerKm}
                  disabled
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="fixedCost" className="col-sm-2 col-form-label">
              Fixed Cost
            </label>
            <div className="col-sm-10">
              <div className="input-group">
                <span className="input-group-text">$</span>
                <input
                  type="text"
                  className="form-control"
                  id="fixedCost"
                  required={true}
                  value={order.fixedCost}
                  disabled
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="status" className="col-sm-2 col-form-label">
              Status
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="status"
                required={true}
                value={order.status.replaceAll("_", " ")}
                disabled
                readOnly
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="street" className="col-sm-2 col-form-label">
              Street
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="street"
                required={true}
                value={order.street}
                disabled
                readOnly
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="betweenStreets" className="col-sm-2 col-form-label">
              Between Streets
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="betweenStreets"
                required={true}
                value={order.betweenStreets}
                disabled
                readOnly
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="city" className="col-sm-2 col-form-label">
              City
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="city"
                required={true}
                value={order.city}
                disabled
                readOnly
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="province" className="col-sm-2 col-form-label">
              Province
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="province"
                required={true}
                value={order.province}
                disabled
                readOnly
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="phoneNumber" className="col-sm-2 col-form-label">
              Phone Number
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                required={true}
                value={order.phoneNumber}
                disabled
                readOnly
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="user" className="col-sm-2 col-form-label">
              User
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="user"
                required={true}
                value={`${order.user.firstName} ${order.user.lastName}`}
                disabled
                readOnly
              />
            </div>
          </div>

          <Link className="btn btn-secondary me-3" to={`${URIS.ASSISTANCE}`}>
            Go Back
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Order;
