import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Result from "./Component/result";

function App() {

  return (
    <section className="container">
      <h1>
        OpenWeather Api
      </h1>
      <Result />
    </section>
  );
}

export default App;
