import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar/Navbar";
import NotFound from "./components/NotFound";
import Order from "./components/Order/Order";
import OrderScore from "./components/OrderScore";
import OrdersList from "./components/OrdersList/OrdersList";
import OrderUpdater from "./components/OrderUpdater/OrderUpdater";
import { URIS } from "./constants";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="container p-2">
          <Routes>
            <Route path={URIS.ASSISTANCE} element={<Home />} />
            <Route path={URIS.ORDER_UPDATER} element={<OrderUpdater />} />
            <Route
              path={URIS.ORDERS}
              element={
                <OrdersList
                  status={["PENDING_APPROVAL", "IN_PROGRESS"]}
                  title={"Order Tracker"}
                  link={URIS.ORDER_UPDATER}
                />
              }
            />
            <Route
              path={URIS.CANCELLED_COMPLETED}
              element={
                <OrdersList
                  status={["CANCELLED", "COMPLETED"]}
                  title={"Completed or Cancelled orders"}
                  link={URIS.ORDER_SCORE}
                />
              }
            />
            <Route
              path={`${URIS.ORDER_UPDATER}/:orderId`}
              element={<OrderUpdater />}
            />
            <Route
              path={`${URIS.ORDER_SCORE}/:orderId`}
              element={<OrderScore />}
            />
            <Route path={`${URIS.ORDERS}/:orderId`} element={<Order />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
