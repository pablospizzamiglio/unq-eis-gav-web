import "./GenericModal.css";

const GenericModal = ({
  title,
  target,
  center,
  disableButtons,
  onConfirm,
  onClose,
  children,
}) => {
  return (
    <div
      id={target}
      className="modal modal-lg fade"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
    >
      <div className={`modal-dialog ${center ? "modal-dialog-centered" : ""}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
          </div>
          <form onSubmit={onConfirm}>
            <div className="modal-body">{children}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={onClose}
                disabled={disableButtons}
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={disableButtons}
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GenericModal;
