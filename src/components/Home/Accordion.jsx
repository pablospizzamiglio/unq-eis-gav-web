import { useEffect, useState } from "react";
import API from "../../services/API";
import NotFound from "../NotFound";
import Spinner from "../Spinner";

const Acordion = () => {
  const [assistances, setAssistances] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    API.getAssistances()
      .then((response) => {
        setAssistances(response.data);
      })
      .catch((error) => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Spinner fullscreen={false} />;
  }

  if (error) {
    return <NotFound />;
  }

  return (
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
                aria-expanded="true"
                aria-controls={`collapse${i}`}
              >
                {assistance.detail}
              </button>
            </h2>
            <div
              id={`collapse${i}`}
              className="accordion-collapse collapse show"
              aria-labelledby={i}
              data-bs-parent="#assistance-accordion"
            >
              <div className="accordion-body">
                <h4>Kind: {assistance.kind}</h4>
                <h4>Detail: {assistance.detail}</h4>
                <h4>CostPerKm: ${assistance.costPerKm}</h4>
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
  );
};

export default Acordion;
