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

  const acceptAssistance = () => {
    setStatus("IN_PROGRESS");
    setMail(
      `mailto:me@cosas.com?subject=Order%20${idOrder}%20accepted%20by%20the%20ssistant&body=Dear%20user%3A%0AWe%20inform%20you%20that%20your%20request%20for%20assistance%20has%20been%20accepted.%20Please%20wait%20in%20the%20place%20until%20it%20arrives.%0A%0AGreetings.`
    );
    setHh(document.getElementById("imputHH").value)
    setMm(document.getElementById("imputMM").value)
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
    var totalTime = hh * 60 + mm

    API.updateAssistanceOrder(idOrder, status, password, totalTime)
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
          </div>
        </div>

        {// combos para seleccioanr la hh:mm de tiempo de espera
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

const WeitingtTimeSelect = (status) => {
    return(status === "IN_PROGRESS"?
            <div className="mb-3 row">
              <label htmlFor="staticIdOrder" className="col-sm-2 col-form-label">
                Approximate waiting time:
              </label>
              <div className="col-sm-3">
                <div class="input-group mb-3">
                  <select class="form-select" id="imputHH">
                    <option value="0" selected>0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                  <label class="input-group-text" for="imputHH">Hour</label>
                  <select class="form-select" id="imputMM">
                    <option value="0" selected>00</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                    <option value="50">50</option>
                  </select>
                  <label class="input-group-text" for="imputHMM">Minute</label>
                </div>
              </div>
            </div>:<></>);
};

export default OrderUpdater;
