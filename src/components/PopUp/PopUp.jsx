import "./PopUp.css";

const PopUp = ({ role, text }) => {
  return (
    <div
      className="alert alert-success position-fixed bottom-0 end-0 p-3"
      role={role}
    >
      {text}
    </div>
  );
};

export default PopUp;
