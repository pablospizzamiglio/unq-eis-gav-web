import { useState } from "react";
import API from "../../services/API";
import PopUp from "../PopUp/PopUp";
import "./OrderUpdater.css";

const OrderUpdater = () => {
  const [idOrder, setIdOrder] = useState("");
  const [status, setStatus] = useState("");
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");
  const [formErrors, setFormErrors] = useState("");
  const [popUpConfirmation, setPopUpConfirmation] = useState(false);

  const acceptAssistance = () => {
    setStatus("IN_PROGRESS");
    setMail(
      `mailto:me@cosas.com?subject=Order%20${idOrder}%20accepted%20by%20the%20ssistant&body=Dear%20user%3A%0AWe%20inform%20you%20that%20your%20request%20for%20assistance%20has%20been%20accepted.%20Please%20wait%20in%20the%20place%20until%20it%20arrives.%0A%0AGreetings.`
    );
  };
  const resetUpdateRequestForm = () => {
    setIdOrder("");
    setPassword("");
    setMail("");
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
        window.location.href = mail;
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
          <label htmlFor="staticIdOrder" className="col-sm-2 col-form-label">
            Id Order:
          </label>
          <div className="col-sm-5">
            <input
              type="text"
              className="form-control"
              id="inputIdOrder"
              required={true}
              value={idOrder}
              onChange={(e) => setIdOrder(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="inputStatus" className="col-sm-2 col-form-label">
            Status:
          </label>
          <div className="col-sm-4">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                required={true}
                value={status}
                onChange={() => acceptAssistance()}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                IN_PROGRESS
              </label>
            </div>
            {/* <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              required={true}
              value={status}
              //onChange={enabledTimeWait}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              IN_PROGRESS
            </label>
          </div> */}
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
            Password:
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
