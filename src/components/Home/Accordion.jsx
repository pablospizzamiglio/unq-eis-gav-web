import API from "../../services/API";
import { useEffect, useState } from "react";

const Acoordion = () => {
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

  return (
    <div className="accordion" id="accordionExample">
      {assistances.result.map((user, i) => {
        return (
          <div className="accordion-item">
            <h2 className="accordion-header" id={i}>
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${i}`}
                aria-expanded="true"
                aria-controls={`collapse${i}`}
              >
                {user.id}
              </button>
            </h2>
            <div
              id={`collapse${i}`}
              className="accordion-collapse collapse show"
              aria-labelledby={i}
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <h4>Kind: {user.kind}</h4>
                <h4>Detail: {user.detail}</h4>
                <h4>CostPerKm: ${user.costPerKm}</h4>
                <h4>User: {user.assistant.id}</h4>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Acoordion;
