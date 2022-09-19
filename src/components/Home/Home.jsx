import Acordion from "./Accordion";

const Home = () => {
  return (
    <div className="container">
      <div className="col-sm-9">
        <div className="row">
          <h1 className="important-title">Assistances</h1>
        </div>
        <div className="row pt-4">
          <Acordion />
        </div>
      </div>
    </div>
  );
};

export default Home;
