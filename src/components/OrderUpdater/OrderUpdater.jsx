import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { URIS } from "../../constants";
import API, {
  formatDecimalNumber,
  formatOrderStatus,
  formatUserName,
} from "../../services";
import Spinner from "../Spinner";

const ORDER_STATUS = {
  PENDING_APPROVAL: "PENDING_APPROVAL",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
};

const ORDER_UPDATE_MESSAGE = "Order updated successfully";

const parseNumber = (value) => {
  let numberValue = null;
  let parsedValue = Number(value);
  if (!isNaN(parsedValue)) {
    numberValue = parsedValue;
  }
  return numberValue;
};

const OrderUpdater = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showWaitingTimeInput, setShowWaitingTimeInput] = useState(false);
  const hhFilterOptions = [
    { value: "00", text: "00" },
    { value: "01", text: "01" },
    { value: "02", text: "02" },
    { value: "03", text: "03" },
    { value: "04", text: "04" },
  ];
  const mmFilterOptions = [
    { value: "00", text: "00" },
    { value: "10", text: "10" },
    { value: "20", text: "20" },
    { value: "30", text: "30" },
    { value: "40", text: "40" },
    { value: "50", text: "50" },
  ];
  const [selectedHhFilterOption, setSelectedHhFilterOption] = useState(
    hhFilterOptions[0].value
  );
  const [selectedMmFilterOption, setSelectedMmFilterOption] = useState(
    mmFilterOptions[0].value
  );
  const [kmTraveled, setKmTraveled] = useState(0);
  const [showKmTraveled, setShowKmTraveled] = useState(false);
  const [isOrderClosed, setIsOrderClosed] = useState(false);

  const resetUpdateRequestForm = () => {
    setPassword("");
    setSelectedHhFilterOption(hhFilterOptions[0].value);
    setSelectedMmFilterOption(mmFilterOptions[0].value);
    setKmTraveled(0);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    setShowWaitingTimeInput(value === ORDER_STATUS.IN_PROGRESS);
    setShowKmTraveled(value === ORDER_STATUS.COMPLETED);
    resetUpdateRequestForm();
  };

  const isClosed = (order) => {
    return (
      order.status === ORDER_STATUS.COMPLETED ||
      order.status === ORDER_STATUS.CANCELLED
    );
  };

  const requestUpdateOrder = (event) => {
    event.preventDefault();
    setSuccessMsg("");
    setFormErrors("");

    API.updateOrder(orderId, status, kmTraveled, password)
      .then((response) => {
        let order = response.data;
        setOrder(order);
        setStatus(order.status);
        setKmTraveled(formatDecimalNumber(order.kmTraveled));
        setIsOrderClosed(isClosed(order));
        setShowWaitingTimeInput(order.status === ORDER_STATUS.IN_PROGRESS);
        setShowKmTraveled(order.status === ORDER_STATUS.COMPLETED);
        setSuccessMsg(ORDER_UPDATE_MESSAGE);
        switch (status) {
          case ORDER_STATUS.IN_PROGRESS:
            window.location.href = `mailto:${order.user.emailAddress}?subject=Order%20${orderId}%20accepted%20by%20the%20ssistant&body=Dear%20user%3A%0AWe%20inform%20you%20that%20your%20request%20for%20assistance%20has%20been%20accepted.%20Please%20wait%20in%20the%20place%20until%20it%20arrives.%0AApproximate%20waiting%20time%3A%20${selectedHhFilterOption}:${selectedMmFilterOption}%20hs%0A%0AGreetings.%0A%0AGAV`;
            break;
          case ORDER_STATUS.CANCELLED:
            window.location.href = `mailto:${order.user.emailAddress}?subject=Order%20${orderId}%20cancelled%20by%20the%20ssistant&body=Dear%20user%3A%0AWe%20inform%20you%20that%20your%20request%20for%20assistance%20has%20been%20cancelled%20by%20the%20assistant.%0A%0AGreetings.%0A%0AGAV`;
            break;
          default:
        }
      })
      .catch((error) => {
        setSuccessMsg("");
        setFormErrors(error.response.data.message);
      })
      .finally(() => {
        setPassword("");
      });
  };

  useEffect(() => {
    API.getOrder(orderId)
      .then((response) => {
        let order = response.data;
        setOrder(order);
        setStatus(order.status);
        setKmTraveled(formatDecimalNumber(order.kmTraveled));
        setIsOrderClosed(isClosed(order));
        setShowWaitingTimeInput(order.status === ORDER_STATUS.IN_PROGRESS);
        setShowKmTraveled(order.status === ORDER_STATUS.COMPLETED);
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
      <h1 className="important-title">Order Updater</h1>
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

      <form className="row" onSubmit={requestUpdateOrder}>
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

          <div className="col-md-12">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <select
              name="status"
              id="status"
              className="form-select"
              value={ORDER_STATUS[status]}
              onChange={(e) => handleStatusChange(e.target.value)}
              disabled={isOrderClosed}
            >
              {Object.keys(ORDER_STATUS).map((value, index) => {
                return (
                  <option value={value} key={index}>
                    {formatOrderStatus(value)}
                  </option>
                );
              })}
            </select>
          </div>

          {showWaitingTimeInput && (
            <div className="col-md-12">
              <label className="form-label">Approximate Waiting Time</label>
              <div className="row g-2">
                <div className="col-sm-6">
                  <label className="form-label" htmlFor="imputHH">
                    Hours
                  </label>
                  <select
                    id="inputHH"
                    className="form-select form-select"
                    aria-label="Hours"
                    value={selectedHhFilterOption}
                    onChange={(e) => setSelectedHhFilterOption(e.target.value)}
                  >
                    {hhFilterOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.text}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-sm-6">
                  <label className="form-label" htmlFor="imputMM">
                    Minutes
                  </label>
                  <select
                    id="imputMM"
                    className="form-select form-select"
                    aria-label="Minutes"
                    value={selectedMmFilterOption}
                    onChange={(e) => setSelectedMmFilterOption(e.target.value)}
                  >
                    {mmFilterOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.text}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {showKmTraveled && (
            <div className="col-md-6">
              <label htmlFor="cancellationCost" className="form-label">
                Traveled Kilometers
              </label>
              <input
                type="number"
                min={0.0}
                step={0.01}
                presicion={2}
                className="form-control"
                id="kmTraveled"
                required={true}
                value={kmTraveled}
                onChange={(e) => setKmTraveled(parseNumber(e.target.value))}
                disabled={order.status === ORDER_STATUS.COMPLETED}
              />
            </div>
          )}

          <div className="col-md-12">
            <label htmlFor="inputPassword" className="form-label">
              Password
            </label>
            <input
              type="password"
              minLength="7"
              maxLength="7"
              className="form-control"
              id="inputPassword"
              required={true}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isOrderClosed}
            />
          </div>
        </fieldset>

        <fieldset className="row g-2">
          <div>
            <Link className="btn btn-secondary me-3" to={`${URIS.ORDERS}`}>
              Go Back
            </Link>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={isOrderClosed}
            >
              Update
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default OrderUpdater;
