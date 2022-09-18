import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <NavBar /> */}
        <div className="container p-2">
          <Routes>
            <Route path="/" element={<Home />} />
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
