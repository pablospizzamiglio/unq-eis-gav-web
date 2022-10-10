import { useState } from "react";
import API from "../../services/API";
import PopUp from "../PopUp/PopUp";
import "./OrderUpdater.css";

const OrderUpdater = () => {
  const [idOrder, setIdOrder] = useState("");
  const [status, setStatus] = useState("");
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");
  const [hh, setHh] = useState("");
  const [mm, setMm] = useState("");
  const [formErrors, setFormErrors] = useState("");
  const [popUpConfirmation, setPopUpConfirmation] = useState(false);

  const WeitingtTimeSelect = (status) => {
    return status === "IN_PROGRESS" ? (
      <div className="mb-3 row">
        <label htmlFor="staticIdOrder" className="col-sm-2 col-form-label">
          Approximate waiting time:
        </label>
        <div className="col-sm-3">
          <div className="input-group mb-3">
            <select
              className="form-select"
              id="imputHH"
              value={hh}
              onChange={(e) => setHh(e.target.value)}
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
            <label className="input-group-text" htmlFor="imputHH">
              Hour
            </label>
            <select
              className="form-select"
              id="imputMM"
              value={mm}
              onChange={(e) => setMm(e.target.value)}
            >
              <option value="0">00</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </select>
            <label className="input-group-text" htmlFor="imputHMM">
              Minute
            </label>
          </div>
        </div>
      </div>
    ) : (
      <></>
    );
  };

  const acceptAssistance = () => {
    setStatus("IN_PROGRESS");
    setMail(
      `mailto:me@cosas.com?subject=Order%20${idOrder}%20accepted%20by%20the%20ssistant&body=Dear%20user%3A%0AWe%20inform%20you%20that%20your%20request%20for%20assistance%20has%20been%20accepted.%20Please%20wait%20in%20the%20place%20until%20it%20arrives.%0AApproximate%20waiting%20time%3A%20${hh}:${mm}%20hs%0A%0AGreetings.%0A%0AGAV`
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
        console.log(hh);
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
          </div>
        </div>

        {
          // combos para seleccioanr la hh:mm de tiempo de espera
          WeitingtTimeSelect(status)
        }

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
