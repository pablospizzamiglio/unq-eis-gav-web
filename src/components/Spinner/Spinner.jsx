const Spinner = ({ fullscreen = true }) => {
  const height = fullscreen ? "viewport-height" : "";

  return (
    <div className="container">
      <div
        className={`d-flex justify-content-center align-items-center ${height}`}
      >
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
