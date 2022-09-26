import { useEffect, useState } from "react";
import API from "../../services/API";
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

  const handleKindFilterChange = (event) => {
    setSelectedKindFilterOption(event.target.value);
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
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {error && <LoadingError />}
    </div>
  );
};

export default AssistanceAccordion;
