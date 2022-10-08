import "./PopUp.css";

const PopUp = ({ role, text}) => {
  return (
    <div
      class="alert alert-success position-fixed bottom-0 end-0 p-3"
      role={role}
    >
      {text}
      {/* <button
        type="button"
        class="btn-close"
        data-bs-dismiss={role}
        aria-label="Close"
      ></button> */}
    </div>
  );
};

export default PopUp;
