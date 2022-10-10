import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import OrderUpdater from "./components/OrderUpdater/OrderUpdater";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <NavBar /> */}
        <div className="container p-2">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/order-updater" element={<OrderUpdater />} />
            {/* <Route path="/assistances/:assistanceId" element={<Assistance />} /> */}
            {/* <Route path="/user/:userId" element={<User />} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
