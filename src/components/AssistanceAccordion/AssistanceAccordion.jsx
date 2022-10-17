import { useEffect, useState } from "react";
import API from "../../services/API";
import LoadingError from "../LoadingError";
import Modal from "../Modal";
import PopUp from "../PopUp/PopUp";
import Spinner from "../Spinner";
import "./AssistanceAccordion.css";

const AssistanceAccordion = () => {
  const [assistances, setAssistances] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [popUpConfirmation, setPopUpConfirmation] = useState(false);
  const kindFilterOptions = [
    { value: "", text: "--Choose assistance kind--" },
    { value: "SMALL", text: "Small" },
    { value: "MEDIUM", text: "Medium" },
    { value: "LARGE", text: "Large" },
    { value: "BATTERY", text: "Battery" },
    { value: "START_UP", text: "Start Up" },
  ];
  const [selectedKindFilterOption, setSelectedKindFilterOption] = useState(
    kindFilterOptions[0].value
  );
  const [showRequestAssistanceModal, setShowRequestAssistanceModal] =
    useState(false);
  const [selectedAssistance, setSelectedAssistance] = useState(null);
  const [nameAssistance, setNameAssistance] = useState("");
  const [phoneNumberAssistance, setPhoneNumberAssistance] = useState("");
  const [fixedCostAssistance, setFixedCostAssistance] = useState("");
  const [costPerKmAssistance, setCostPerKmAssistance] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isActiveIdUser, setIsActiveIdUser] = useState(false);
  const [isActiveNewUser, setIsActiveNewUser] = useState(false);
  const [street, setStreet] = useState("");
  const [betweenStreets, setBetweenStreets] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [type, setType] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [idUser, setIdUser] = useState("");
  const [request, setRequest] = useState(null);
  const [formErrors, setFormErrors] = useState("");

  const handleKindFilterChange = (event) => {
    setSelectedKindFilterOption(event.target.value);
  };

  const resetAssistanceRequestForm = () => {
    setFormErrors("");
    setSelectedAssistance(null);
    setRequest(null);
    setIdUser("");
    setNameAssistance("");
    setPhoneNumberAssistance("");
    setFixedCostAssistance("");
    setCostPerKmAssistance("");
    setStreet("");
    setBetweenStreets("");
    setCity("");
    setProvince("");
    setFirstName("");
    setLastName("");
    setType("");
    setPhoneNumber("");
    setEmail("");
  };

  setTimeout(() => {
    setPopUpConfirmation(false);
  }, 10000);

  const openRequestAssistanceModal = (assistance) => {
    setSelectedAssistance(assistance);
    setPopUpConfirmation(false);
    setNameAssistance(
      `${assistance.assistant.firstName} ${assistance.assistant.lastName}`
    );
    setPhoneNumberAssistance(assistance.assistant.telephoneNumber);
    setFixedCostAssistance(assistance.fixedCost.toFixed(2));
    setCostPerKmAssistance(assistance.costPerKm.toFixed(2));
    setShowRequestAssistanceModal(true);
  };

  const closeRequestAssistanceModal = () => {
    setShowRequestAssistanceModal(false);
    resetAssistanceRequestForm();
  };

  const registeredUser = (event) => {
    setIsActiveNewUser(!isActiveNewUser);
    setRequest(() => requestAssistanceForRegisteredUser);
  };

  const newUser = (event) => {
    setIsActiveIdUser(!isActiveIdUser);
    setRequest(() => requestAssistanceForNewUser);
  };

  const requestAssistanceForNewUser = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    /* API.createAssistanceOrderForNewUser(
      selectedAssistance.id,
      street,
      betweenStreets,
      city,
      province,
      firstName,
      lastName,
      type,
      phoneNumber,
      email
    )
      .then((response) => {
        setPopUpConfirmation(true);
        resetAssistanceRequestForm();
        setShowRequestAssistanceModal(false);
      })
      .catch((error) => {
        setPopUpConfirmation(false);
        setFormErrors(error.response.data.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      }); */
  };

  const requestAssistanceForRegisteredUser = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    {console.log(idUser)}
    
    API.getUser("4db16830-d9a7-4159-94aa-0e6f9467a3c9")
      .then((response) => {
        API.createAssistanceOrder(
          selectedAssistance.id,
          street,
          betweenStreets,
          city,
          province,
          phoneNumber,
          response.data.id
        )
          .then((response) => {
            setPopUpConfirmation(true);
            resetAssistanceRequestForm();
            setShowRequestAssistanceModal(false);
          })
          .catch((error) => {
            setPopUpConfirmation(false);
            setFormErrors(error.response.data.message);
          });
      })
      .catch((error) => {
        setPopUpConfirmation(false);
        setFormErrors(error.response.data.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  useEffect(() => {
    API.getAssistances(selectedKindFilterOption)
      .then((response) => {
        setAssistances(response.data);
      })
      .catch((error) => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [selectedKindFilterOption]);

  const renderTitle = () => (
    <div className="row">
      <h1 className="important-title">Assistances</h1>
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

      {!error && (
        <>
          <div className="row">
            <select
              className="form-select form-select-lg mb-3"
              aria-label="Assistance kind filter"
              value={selectedKindFilterOption}
              onChange={handleKindFilterChange}
            >
              {kindFilterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
          </div>

          <div className="accordion" id="assistance-accordion">
            {assistances.result.map((assistance, i) => {
              return (
                <div className="accordion-item" key={i}>
                  <h2 className="accordion-header" id={i}>
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${i}`}
                      aria-expanded="false"
                      aria-controls={`collapse${i}`}
                    ></button>
                  </h2>
                  <div
                    id={`collapse${i}`}
                    className="accordion-collapse collapse"
                    aria-labelledby={i}
                  >
                    <div className="accordion-body">
                      <h4 className="capitalize">
                        Kind: {assistance.kind.toLowerCase()}
                      </h4>
                      <h4>Fixed Cost: ${assistance.fixedCost.toFixed(2)}</h4>
                      <h4>Cost Per Km: ${assistance.costPerKm.toFixed(2)}</h4>
                      <h4>
                        User: {assistance.assistant.firstName}{" "}
                        {assistance.assistant.lastName}
                      </h4>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => openRequestAssistanceModal(assistance)}
                      >
                        <i
                          className="bi bi-truck-flatbed"
                          aria-hidden="true"
                        ></i>
                        {" Request Assistance"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {error && <LoadingError />}
      {popUpConfirmation && (
        <PopUp role="alert" text="Assistance order created successfully " />
      )}

      <Modal
        title="Confirm Assistance Request"
        show={showRequestAssistanceModal}
        onConfirm={request}
        onClose={closeRequestAssistanceModal}
      >
        <fieldset disabled={isSubmitting}>
          <legend>Service Information</legend>
          <div className="row g-1">
            <div className="col-md-6">
              <label htmlFor="name" className="form-label">
                <h5>Assistant: {nameAssistance}</h5>
              </label>
            </div>

            <div className="col-md-6">
              <label htmlFor="phoneNumber" className="form-label">
                <h5>Phone number: {phoneNumberAssistance}</h5>
              </label>
            </div>

            <div className="col-md-6">
              <label htmlFor="fixedCost" className="form-label">
                <h5>Fixed Cost: ${fixedCostAssistance}</h5>
              </label>
            </div>

            <div className="col-md-6">
              <label htmlFor="costPerKm" className="form-label">
                <h5>Cost per Km: ${costPerKmAssistance}</h5>
              </label>
            </div>
          </div>

          <legend>Location and Contact Information</legend>
          <div className="row g-1">
            <div className="col-md-12">
              <label htmlFor="street" className="form-label">
                Street
              </label>
              <input
                type="text"
                className="form-control"
                id="street"
                required={true}
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>

            <div className="col-md-12">
              <label htmlFor="betweent-streets" className="form-label">
                Between Streets
              </label>
              <input
                type="text"
                className="form-control"
                id="betweent-streets"
                required={true}
                value={betweenStreets}
                onChange={(e) => setBetweenStreets(e.target.value)}
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
                value={city}
                onChange={(e) => setCity(e.target.value)}
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
                value={province}
                onChange={(e) => setProvince(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <div className="phone-number">
                <label htmlFor="phone-number" className="form-label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone-number"
                  required={true}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  pattern="[0-9]{10}"
                  minLength={10}
                  maxLength={10}
                />
              </div>
            </div>

            <div className="col-md-12">
              <label htmlFor="select-user" className="form-label">
                Select User:
              </label>
            </div>

            <div className="col-md-6">
              <p>
                <button
                  className="btn btn-primary"
                  type="button"
                  disabled={isActiveNewUser}
                  data-bs-toggle="collapse"
                  data-bs-target="#newUser"
                  aria-expanded="false"
                  aria-controls="newUser"
                  onClick={newUser}
                >
                  New User
                </button>
              </p>
            </div>

            <div className="col-md-6">
              <p>
                <button
                  className="btn btn-primary"
                  type="button"
                  disabled={isActiveIdUser}
                  data-bs-toggle="collapse"
                  data-bs-target="#idUser"
                  aria-expanded="false"
                  aria-controls="idUser"
                  onClick={registeredUser}
                >
                  Id User
                </button>
              </p>
            </div>

            {!isActiveNewUser && (
              <div className="col-md-6">
                <div className="collapse" id="newUser">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    required={true}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
              </div>
            )}

            {!isActiveNewUser && (
              <div className="col-md-6">
                <div className="collapse" id="newUser">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    required={true}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
            )}

            {!isActiveNewUser && (
              <div className="col-md-6">
                <div className="collapse" id="newUser">
                  <label htmlFor="type" className="form-label">
                    Type
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="type"
                    required={true}
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  />
                </div>
              </div>
            )}

            {!isActiveNewUser && (
              <div className="col-md-6">
                <div className="collapse" id="newUser" disabled={false}>
                  <label htmlFor="mail" className="form-label">
                    Mail
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    required={true}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            )}
            {!isActiveIdUser && (
              <div className="col-md-12">
                <div className="collapse" id="idUser" disabled={isActiveIdUser}>
                  <label htmlFor="idUser" className="form-label">
                    Id user
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="idUser"
                    required={true}
                    value={idUser}
                    onChange={(e) => setIdUser(e.target.value)}
                  />
                </div>
              </div>
            )}

            {formErrors && (
              <div className="col-md-12 pt-2">
                <div className="alert alert-danger" role="alert">
                  {formErrors}
                </div>
              </div>
            )}
          </div>
        </fieldset>
      </Modal>
    </div>
  );
};

export default AssistanceAccordion;
