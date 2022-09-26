import "./Modal.css";

const Modal = ({ title, show, onConfirm, onClose, children }) => {
  return (
    <form onSubmit={onConfirm}>
      <div className={`modal ${show ? "visible" : "invisible"}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">{title}</h4>
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
            <button className="btn btn-primary" type="submit">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Modal;
