import { useState } from "react";
import API from "../../services/API";
import PopUp from "../PopUp/PopUp";
import "./OrderUpdater.css";

const ORDER_STATUS = {
  IN_PROGRESS: "IN_PROGRESS",
  CANCELLED: "CANCELLED",
};

const OrderUpdater = () => {
  const [idOrder, setIdOrder] = useState("");
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

  const handleStatusChange = (value) => {
    setStatus(value);
    console.log(value);
    setShowWaitingTimeInput(value === ORDER_STATUS[value]);
  };

  const resetUpdateRequestForm = () => {
    setIdOrder("");
    setPassword("");
    setSelectedHhFilterOption(hhFilterOptions[0].value);
    setSelectedMmFilterOption(mmFilterOptions[0].value);
  };

  setTimeout(() => {
    setPopUpConfirmation(false);
  }, 10000);

  const requestUpdateOrder = (event) => {
    event.preventDefault();
    setPopUpConfirmation(false);
    setFormErrors("");

    API.updateAssistanceOrder(idOrder, status, password)
      .then((response) => {
        setPopUpConfirmation(true);
        switch (status) {
          case ORDER_STATUS.IN_PROGRESS:
            window.location.href = `mailto:me@cosas.com?subject=Order%20${idOrder}%20accepted%20by%20the%20ssistant&body=Dear%20user%3A%0AWe%20inform%20you%20that%20your%20request%20for%20assistance%20has%20been%20accepted.%20Please%20wait%20in%20the%20place%20until%20it%20arrives.%0AApproximate%20waiting%20time%3A%20${selectedHhFilterOption}:${selectedMmFilterOption}%20hs%0A%0AGreetings.%0A%0AGAV`;
            break;
          case ORDER_STATUS.CANCELLED:
            window.location.href = `mailto:me@cosas.com?subject=Order%20${idOrder}%20cancelled%20by%20the%20ssistant&body=Dear%20user%3A%0AWe%20inform%20you%20that%20your%20request%20for%20assistance%20has%20been%20cancelled%20by%20the%20assistant.%0A%0AGreetings.%0A%0AGAV`;
            break;
          default:
        }
        resetUpdateRequestForm();
      })
      .catch((error) => {
        setPopUpConfirmation(false);
        setFormErrors(error.response.data.message);
      });
  };

  return (
    <>
      <h2>Order Updater</h2>
      <form className="formOrder" onSubmit={requestUpdateOrder}>
        {popUpConfirmation && <PopUp role="alert" text="Updated order " />}
        <div className="mb-3 row">
          <label htmlFor="orderId" className="col-sm-2 col-form-label">
            Order Id
          </label>
          <div className="col-sm-5">
            <input
              type="text"
              className="form-control"
              id="orderId"
              required={true}
              value={idOrder}
              onChange={(e) => setIdOrder(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-2 radio-inline control-label">Status</label>
          <div className="col-sm-4">
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
            <div className="col-sm-2">
              <div className="form-check">
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
            </div>
            <div className="col-sm-2">
              <div className="form-check">
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

        <div className="mb-3 row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-4">
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
        {formErrors && (
          <div className="col-md-12 pt-2">
            <div className="alert alert-danger" role="alert">
              {formErrors}
            </div>
          </div>
        )}
        <button className="btn btn-primary" type="submit">
          Update Order
        </button>
      </form>
    </>
  );
};

export default OrderUpdater;
