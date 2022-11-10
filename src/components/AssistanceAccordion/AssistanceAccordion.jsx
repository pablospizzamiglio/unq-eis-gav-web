import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { URIS } from "../../constants";
import API, { formatCurrency, formatUserName } from "../../services";
import LoadingError from "../LoadingError";
import Modal from "../Modal";
import PopUp from "../PopUp";
import Spinner from "../Spinner";
import "./AssistanceAccordion.css";

const AssistanceAccordion = () => {
  const [assistances, setAssistances] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [popUpConfirmation, setPopUpConfirmation] = useState(false);
  const navigate = useNavigate();
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBlockedIdUser, setIsBlockedIdUser] = useState(false);
  const [isBlockedNewUser, setIsBlockedNewUser] = useState(false);
  const [street, setStreet] = useState("");
  const [betweenStreets, setBetweenStreets] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [idUser, setIdUser] = useState("");
  const [formErrors, setFormErrors] = useState("");

  const handleKindFilterChange = (event) => {
    setSelectedKindFilterOption(event.target.value);
  };

  const resetAssistanceRequestForm = () => {
    setFormErrors("");
    setSelectedAssistance(null);
    setIdUser("");
    setStreet("");
    setBetweenStreets("");
    setCity("");
    setProvince("");
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setEmail("");
    setIsBlockedIdUser(false);
    setIsBlockedNewUser(false);
  };

  setTimeout(() => {
    setPopUpConfirmation(false);
  }, 10000);

  const openRequestAssistanceModal = (assistance) => {
    setSelectedAssistance(assistance);
    setPopUpConfirmation(false);
    setShowRequestAssistanceModal(true);
  };

  const closeRequestAssistanceModal = () => {
    setShowRequestAssistanceModal(false);
    resetAssistanceRequestForm();
  };

  const confirmRequest = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    if (!isBlockedNewUser) {
      API.createUser(firstName, lastName, "CLIENT", email, phoneNumber)
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
              navigate(`${URIS.ORDERS}/${response.data.id}`);
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
    } else {
      API.getUser(idUser)
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
              navigate(`${URIS.ORDERS}/${response.data.id}`);
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
    }
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
      <h1 className="important-title">Assistance</h1>
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

      {error && <LoadingError />}

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
                      <h4>
                        Fixed Cost: ${formatCurrency(assistance.fixedCost)}
                      </h4>
                      <h4>
                        Cost Per Km: ${formatCurrency(assistance.costPerKm)}
                      </h4>
                      <h4>
                        Cancellation Cost: $
                        {formatCurrency(assistance.cancellationCost)}
                      </h4>
                      <h4>User: {formatUserName(assistance.assistant)}</h4>
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

      {popUpConfirmation && (
        <PopUp role="alert" text="Assistance order created successfully " />
      )}

      <Modal
        title="Confirm Assistance Request"
        show={showRequestAssistanceModal}
        onConfirm={confirmRequest}
        onClose={closeRequestAssistanceModal}
      >
        <fieldset disabled={isSubmitting}>
          <legend>Service Information</legend>
          <div className="row g-1">
            <div className="col-md-6">
              <label htmlFor="name" className="form-label">
                <h5>
                  Assistant: {formatUserName(selectedAssistance?.assistant)}
                </h5>
              </label>
            </div>

            <div className="col-md-6">
              <label htmlFor="phoneNumber" className="form-label">
                <h5>Phone number: {selectedAssistance?.phoneNumber ?? ""}</h5>
              </label>
            </div>

            <div className="col-md-6">
              <label htmlFor="fixedCost" className="form-label">
                <h5>
                  Fixed Cost: ${formatCurrency(selectedAssistance?.fixedCost)}
                </h5>
              </label>
            </div>

            <div className="col-md-6">
              <label htmlFor="costPerKm" className="form-label">
                <h5>
                  Cost per Km: $
                  {formatCurrency(selectedAssistance?.costPerKmAssistance)}
                </h5>
              </label>
            </div>

            <div className="col-md-6">
              <label htmlFor="costPerKm" className="form-label">
                <h5>
                  Cancellation Cost: $
                  {formatCurrency(selectedAssistance?.cancellationCost)}
                </h5>
              </label>
            </div>
          </div>

          <div className="row g-1">
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
                  disabled={isBlockedNewUser}
                  data-bs-toggle="collapse"
                  data-bs-target="#newUser"
                  aria-expanded="false"
                  aria-controls="newUser"
                  onClick={() => setIsBlockedIdUser(!isBlockedIdUser)}
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
                  disabled={isBlockedIdUser}
                  data-bs-toggle="collapse"
                  data-bs-target="#idUser"
                  aria-expanded="false"
                  aria-controls="idUser"
                  onClick={(e) => setIsBlockedNewUser(!isBlockedNewUser)}
                >
                  Id User
                </button>
              </p>
            </div>
            {!isBlockedNewUser && (
              <>
                <div className="col-md-12">
                  <div className="collapse" id="newUser">
                    <legend>Location and Contact Information</legend>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="collapse" id="newUser">
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
                </div>

                <div className="col-md-6">
                  <div className="collapse" id="newUser">
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
                </div>

                <div className="col-md-6">
                  <div className="collapse" id="newUser">
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
                </div>

                <div className="col-md-6">
                  <div className="collapse" id="newUser">
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
                </div>

                <div className="col-md-6">
                  <div className="collapse" id="newUser">
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
                </div>
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

                <div className="col-md-6">
                  <div className="collapse" id="newUser">
                    <label htmlFor="type" className="form-label">
                      Type
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      value="CLIENT"
                      disabled
                      readOnly
                    />
                  </div>
                </div>
              </>
            )}

            {!isBlockedIdUser && (
              <>
                <div className="col-md-12">
                  <div className="collapse" id="idUser">
                    <legend>Location and Contact Information</legend>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="collapse" id="idUser">
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
                </div>
                <div className="col-md-6">
                  <div className="collapse" id="idUser">
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
                </div>
                <div className="col-md-6">
                  <div className="collapse" id="idUser">
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
                </div>
                <div className="col-md-6">
                  <div className="collapse" id="idUser">
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
                </div>
                <div className="col-md-6">
                  <div className="collapse" id="idUser">
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
                </div>
                <div className="col-md-6">
                  <div
                    className="collapse"
                    id="idUser"
                    disabled={isBlockedIdUser}
                  >
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
              </>
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
