import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { URIS } from "../../constants";
import API, { formatDecimalNumber } from "../../services";
import PopUp from "../PopUp";
import Spinner from "../Spinner";

const ORDER_STATUS = {
  IN_PROGRESS: "IN_PROGRESS",
  CANCELLED: "CANCELLED",
  COMPLETED: "COMPLETED",
};

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
  const [popUpConfirmation, setPopUpConfirmation] = useState(false);
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

  const [kmTraveled, setKmTraveled] = useState(null);
  const [showKmTraveled, setShowKmTraveled] = useState(false);

  const resetUpdateRequestForm = () => {
    setPassword("");
    setSelectedHhFilterOption(hhFilterOptions[0].value);
    setSelectedMmFilterOption(mmFilterOptions[0].value);
    setKmTraveled(null);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    setShowWaitingTimeInput(value === ORDER_STATUS.IN_PROGRESS);
    setShowKmTraveled(value === ORDER_STATUS.COMPLETED);
    resetUpdateRequestForm();
  };

  setTimeout(() => {
    setPopUpConfirmation(false);
  }, 10000);

  const requestUpdateOrder = (event) => {
    event.preventDefault();
    setPopUpConfirmation(false);
    setFormErrors("");

    API.getOrder(orderId)
      .then((responseOrder) => {
        API.getUser(responseOrder.data.user.id)
          .then((responseUser) => {
            API.updateAssistanceOrder(orderId, status, kmTraveled, password)
              .then((_response) => {
                setPopUpConfirmation(true);
                switch (status) {
                  case ORDER_STATUS.IN_PROGRESS:
                    window.location.href = `mailto:${responseUser.data.emailAddress}?subject=Order%20${orderId}%20accepted%20by%20the%20ssistant&body=Dear%20user%3A%0AWe%20inform%20you%20that%20your%20request%20for%20assistance%20has%20been%20accepted.%20Please%20wait%20in%20the%20place%20until%20it%20arrives.%0AApproximate%20waiting%20time%3A%20${selectedHhFilterOption}:${selectedMmFilterOption}%20hs%0A%0AGreetings.%0A%0AGAV`;
                    break;
                  case ORDER_STATUS.CANCELLED:
                    window.location.href = `mailto:${responseUser.data.emailAddress}?subject=Order%20${orderId}%20cancelled%20by%20the%20ssistant&body=Dear%20user%3A%0AWe%20inform%20you%20that%20your%20request%20for%20assistance%20has%20been%20cancelled%20by%20the%20assistant.%0A%0AGreetings.%0A%0AGAV`;
                    break;
                  default:
                }
                resetUpdateRequestForm();
              })
              .catch((error) => {
                setPopUpConfirmation(false);
                setFormErrors(error.response.data.message);
              });
          })
          .catch((error) => {
            setPopUpConfirmation(false);
            setFormErrors(error.response.data.message);
          });
      })
      .catch((error) => {
        setPopUpConfirmation(false);
        setFormErrors(error.response.data.message);
      });
  };

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
    <div className="container">
      {renderTitle()}

      {formErrors && (
        <div className="row">
          <div className="alert alert-danger text-center" role="alert">
            {formErrors}
          </div>
        </div>
      )}

      <div className="row d-flex justify-content-center">
        <form className="formOrder" onSubmit={requestUpdateOrder}>
          {popUpConfirmation && (
            <PopUp role="alert" text="Order updated successfully" />
          )}

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
                value={orderId}
                disabled
                readOnly
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label
              htmlFor="cancellationCost"
              className="col-sm-2 col-form-label"
            >
              Cancellation Cost
            </label>
            <div className="col-sm-10">
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
          </div>

          <div className="mb-3 row">
            <label className="col-sm-2 radio-inline control-label">
              Status
            </label>
            <div className="col-sm-10">
              {Object.keys(ORDER_STATUS).map((value, index) => {
                const elementId = `radio-${index}`;
                return (
                  <div className="form-check form-check-inline" key={index}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="order-status"
                      id={elementId}
                      required={true}
                      value={value}
                      onChange={() => handleStatusChange(value)}
                    />
                    <label
                      className="form-check-label capitalize"
                      htmlFor={elementId}
                    >
                      {ORDER_STATUS[value].replaceAll("_", " ")}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>

          {showWaitingTimeInput && (
            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">
                Approximate waiting time
              </label>
              <div className="col-sm-5">
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
              <div className="col-sm-5">
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
          )}

          {showKmTraveled && (
            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">Km traveled</label>
              <div className="col-sm-5">
                <input
                  type="number"
                  min={0}
                  className="form-control"
                  id="kmTraveled"
                  required={true}
                  value={kmTraveled ?? ""}
                  onChange={(e) => setKmTraveled(parseNumber(e.target.value))}
                />
              </div>
            </div>
          )}

          <div className="mb-3 row">
            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
              Password
            </label>
            <div className="col-sm-10">
              <input
                type="password"
                minLength="7"
                maxLength="7"
                className="form-control"
                id="inputPassword"
                required={true}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <Link className="btn btn-secondary me-3" to={`${URIS.ORDERS}`}>
            Go Back
          </Link>
          <button className="btn btn-primary" type="submit">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderUpdater;
