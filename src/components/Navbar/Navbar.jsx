import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-secondary ">
      <div className="container-fluid ">
        <h2 className="text-black">GAV</h2>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item center">
              <Link to="/" className="navbar-brand text-black">
                <i className="bi bi-truck-flatbed" aria-hidden="true"></i>
                {" Assistance "}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/orders" className="navbar-brand text-black">
                Pending order tracking
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/order-updater" className="navbar-brand text-black">
                Orders
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
