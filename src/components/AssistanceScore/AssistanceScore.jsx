import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { URIS } from "../../constants";
import API from "../../services";
import Spinner from "../Spinner";

const AssistanceScore = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [userId, setUserId] = useState("");
  const [score, setScore] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formErrors, setFormErrors] = useState("");
  const [popUpConfirmation, setPopUpConfirmation] = useState(false);

  const resetUpdateRequestForm = () => {
    setUserId("");
    setScore("");
  };

  setTimeout(() => {
    setPopUpConfirmation(false);
  }, 10000);

  const requestQualificationAssistant = (event) => {
    event.preventDefault();
    setPopUpConfirmation(false);
    setFormErrors("");
    API.updateScoreAssistance(orderId, userId, score)
      .then((response) => {
        setPopUpConfirmation(true);
        resetUpdateRequestForm();
      })
      .catch((error) => {
        setPopUpConfirmation(false);
        setFormErrors(error.response.data.message);
      });
  };

  useEffect(() => {
    API.getOrder(orderId)
      .then((response) => {
        setOrder(response.data);
      })
      .catch((error) => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [orderId]);

  const renderTitle = () => (
    <div className="row">
      <h1 className="important-title">Assistance Score</h1>
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

      {formErrors && (
        <div className="row">
          <div className="alert alert-danger text-center" role="alert">
            {formErrors}
          </div>
        </div>
      )}

      {popUpConfirmation && (
        <div className="row">
          <div className="alert alert-success text-center" role="alert">
            Assistance score successfully
          </div>
        </div>
      )}

      <div className="mb-3 row">
        <label htmlFor="assistanceScore" className="col-sm-2 col-form-label">
          Order Id
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="orderId"
            required={true}
            value={orderId}
            disabled
            readOnly
          />
        </div>
      </div>

      <div className="row d-flex justify-content-center">
        <form className="formScore" onSubmit={requestQualificationAssistant}>
          <div className="mb-3 row">
            <label
              htmlFor="assistanceScore"
              className="col-sm-2 col-form-label"
            >
              User Id
            </label>
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control"
                id="userId"
                required={true}
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label
              htmlFor="assistanceScore"
              className="col-sm-2 col-form-label"
            >
              Score
            </label>
            <div className="col-sm-3">
              <input
                type="number"
                min={1}
                max={5}
                className="form-control"
                id="score"
                required={true}
                value={score}
                onChange={(e) => setScore(e.target.value)}
              />
            </div>
          </div>

          <Link
            className="btn btn-secondary me-3"
            to={`${URIS.CANCELLED_COMPLETED}`}
          >
            Go Back
          </Link>
          <button className="btn btn-primary" type="submit">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssistanceScore;
