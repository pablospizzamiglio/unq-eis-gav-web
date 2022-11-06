import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar/Navbar";
import NotFound from "./components/NotFound";
import Order from "./components/Order/Order";
import OrdersList from "./components/OrdersList/OrdersList";
import OrderUpdater from "./components/OrderUpdater/OrderUpdater";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="container p-2">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/order-updater" element={<OrderUpdater />} />
            <Route
              path="/orders"
              element={<OrdersList status="PENDING_APPROVAL" />}
            />
            <Route path="/orders/:orderId" element={<Order />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
