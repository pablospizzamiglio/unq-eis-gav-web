import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { URIS } from "../../constants";
import API, { formatDecimalNumber, formatUserName } from "../../services";
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
      <div className="row mb-3">
        <h1 className="important-title">Order Detail</h1>
      </div>

      <div className="row">
        <div className="alert alert-success text-center" role="alert">
          Order created successfully
        </div>
      </div>

      <form className="row">
        <fieldset className="row g-2">
          <legend>User: {formatUserName(order.user)}</legend>

          <div className="col-md-12">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number
            </label>
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

          <div className="col-md-6">
            <label htmlFor="street" className="form-label">
              Street
            </label>
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

          <div className="col-md-6">
            <label htmlFor="betweenStreets" className="form-label">
              Between Streets
            </label>
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

          <div className="col-md-6">
            <label htmlFor="city" className="form-label">
              City
            </label>
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

          <div className="col-md-6">
            <label htmlFor="province" className="form-label">
              Province
            </label>
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
        </fieldset>

        <fieldset className="row g-2">
          <legend>Assistance: {formatUserName(order.assistance.user)}</legend>

          <div className="col-md-4">
            <label htmlFor="costPerKm" className="form-label">
              Cost Per Km
            </label>
            <div className="input-group">
              <span className="input-group-text">$</span>
              <input
                type="text"
                className="form-control"
                id="costPerKm"
                required={true}
                value={formatDecimalNumber(order.costPerKm)}
                disabled
                readOnly
              />
            </div>
          </div>

          <div className="col-md-4">
            <label htmlFor="fixedCost" className="form-label">
              Fixed Cost
            </label>
            <div className="input-group">
              <span className="input-group-text">$</span>
              <input
                type="text"
                className="form-control"
                id="fixedCost"
                required={true}
                value={formatDecimalNumber(order.fixedCost)}
                disabled
                readOnly
              />
            </div>
          </div>

          <div className="col-md-4">
            <label htmlFor="cancellationCost" className="form-label">
              Cancellation Cost
            </label>
            <div className="input-group">
              <span className="input-group-text">$</span>
              <input
                type="text"
                className="form-control"
                id="cancellationCost"
                required={true}
                value={formatDecimalNumber(order.cancellationCost)}
                disabled
                readOnly
              />
            </div>
          </div>

          <div className="col-md-6">
            <label htmlFor="status" className="form-label">
              Status
            </label>
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

          <div className="col-md-6">
            <label htmlFor="cancellationCost" className="form-label">
              Traveled Kilometers
            </label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="kmTraveled"
                required={true}
                value={formatDecimalNumber(order.assistance.kmTraveled)}
                disabled
                readOnly
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="row g-2">
          <div>
            <Link className="btn btn-secondary" to={`${URIS.ASSISTANCE}`}>
              Go Back
            </Link>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Order;
