import "./LoadingError.css";

const LoadingError = () => {
  return (
    <div className="container border rounded-1">
      <div className="d-flex justify-content-center align-items-center">
        <i className="bi bi-emoji-dizzy error-icon"></i>
      </div>
    </div>
  );
};

export default LoadingError;
