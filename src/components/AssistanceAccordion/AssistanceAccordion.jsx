import { useEffect, useState } from "react";
import API from "../../services/API";
import GenericModal from "../GenericModal";
import LoadingError from "../LoadingError";
import Spinner from "../Spinner";
import "./AssistanceAccordion.css";

const AssistanceAccordion = () => {
  const [assistances, setAssistances] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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
  const [selectedAssistance, setSelectedAssistance] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [street, setStreet] = useState("");
  const [betweenStreets, setBetweenStreets] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formErrors, setFormErrors] = useState("");

  const handleKindFilterChange = (event) => {
    setSelectedKindFilterOption(event.target.value);
  };

  const loadModal = (assistance) => {
    setSelectedAssistance(assistance);
  };

  const resetForm = () => {
    setSelectedAssistance(null);
    setStreet("");
    setBetweenStreets("");
    setCity("");
    setProvince("");
    setPhoneNumber("");
  };

  const requestAssistance = (event) => {
    event.preventDefault();

    setIsSubmitting(true);
    setFormErrors("");

    const address = {
      street,
      betweenStreets,
      city,
      province,
    };

    API.createAssistanceOrder(selectedAssistance.id, address, phoneNumber)
      .then((response) => {
        resetForm();
        // hideModal();
      })
      .catch((error) => {
        setFormErrors(error.response.data.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const resetAssistanceRequestForm = () => {
    setSelectedAssistance(null);
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
                        data-bs-toggle="modal"
                        data-bs-target="#request-assistance-modal"
                        onClick={() => loadModal(assistance)}
                      >
                        <i class="bi bi-truck-flatbed" aria-hidden="true"></i>
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

      <GenericModal
        title="Confirm Assistance Request"
        target={"request-assistance-modal"}
        center={false}
        disableButtons={isSubmitting}
        onConfirm={requestAssistance}
        onClose={resetAssistanceRequestForm}
      >
        <fieldset disabled={isSubmitting}>
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

            <div className="col-md-12">
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

            {formErrors && (
              <div className="col-md-12 pt-2">
                <div className="alert alert-danger" role="alert">
                  {formErrors}
                </div>
              </div>
            )}
          </div>
        </fieldset>
      </GenericModal>
    </div>
  );
};

export default AssistanceAccordion;
