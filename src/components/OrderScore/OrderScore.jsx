import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { URIS } from "../../constants";
import API, {
  formatDecimalNumber,
  formatOrderStatus,
  formatUserName,
} from "../../services";
import Spinner from "../Spinner";

const ORDER_SCORED_SUCCESSFULY = "Order scored successfully";

const AssistanceScore = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [userId, setUserId] = useState("");
  const [score, setScore] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formErrors, setFormErrors] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  const resetUpdateRequestForm = () => {
    setUserId("");
    setScore("");
  };

  const requestQualificationAssistant = (event) => {
    event.preventDefault();
    setSuccessMsg("");
    setFormErrors("");
    API.updateOrderScore(orderId, userId, score)
      .then((response) => {
        let order = response.data;
        setOrder(order);
        setScore(order.score);
        setIsFormDisabled(order.score > 0);
        setSuccessMsg(ORDER_SCORED_SUCCESSFULY);
        resetUpdateRequestForm();
      })
      .catch((error) => {
        setFormErrors(error.response.data.message);
      });
  };

  useEffect(() => {
    API.getOrder(orderId)
      .then((response) => {
        let order = response.data;
        setOrder(order);
        setScore(order.score);
        setIsFormDisabled(order.score > 0);
      })
      .catch((error) => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [orderId]);

  const renderTitle = () => (
    <div className="row mb-3">
      <h1 className="important-title">Order Score</h1>
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

      <div className="row">
        {formErrors && (
          <div className="alert alert-danger text-center" role="alert">
            {formErrors}
          </div>
        )}

        {successMsg && (
          <div className="alert alert-success text-center" role="alert">
            {successMsg}
          </div>
        )}
      </div>

      <form className="row" onSubmit={requestQualificationAssistant}>
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
              value={formatOrderStatus(order.status)}
              disabled
              readOnly
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="cancellationCost" className="form-label">
              Traveled Kilometers
            </label>
            <input
              type="text"
              className="form-control"
              id="kmTraveled"
              required={true}
              value={formatDecimalNumber(order.kmTraveled)}
              disabled
              readOnly
            />
          </div>

          <div className="col-md-12">
            <label htmlFor="totalCost" className="form-label">
              Total Cost
            </label>
            <div className="input-group">
              <span className="input-group-text">$</span>
              <input
                type="text"
                className="form-control"
                id="totalCost"
                required={true}
                value={formatDecimalNumber(order.totalCost)}
                disabled
                readOnly
              />
            </div>
          </div>

          <div className="col-md-6">
            <label htmlFor="userId" className="form-label">
              User Id
            </label>
            <input
              type="text"
              className="form-control"
              id="userId"
              required={true}
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              disabled={isFormDisabled}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="score" className="form-label">
              Score
            </label>
            <input
              type="number"
              min={1}
              max={5}
              className="form-control"
              id="score"
              required={true}
              value={score}
              onChange={(e) => setScore(e.target.value)}
              disabled={isFormDisabled}
            />
          </div>
        </fieldset>

        <fieldset className="row g-2">
          <div>
            <Link
              className="btn btn-secondary me-3"
              to={`${URIS.CANCELLED_COMPLETED}`}
            >
              Go Back
            </Link>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={isFormDisabled}
            >
              Update
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default AssistanceScore;
