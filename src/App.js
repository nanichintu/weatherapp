import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const App = () => {
  const [city, setCity] = useState("");
  const [result, setResult] = useState("");
  const changeHandler = (e) => {
    setCity(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d885aa1d783fd13a55050afeef620fcb`
    )
      .then((response) => response.json())
      .then((data) => {
        const kelvin = data.main.temp;
        const celcius = kelvin - 273.15;
        setResult("Temperature at " + city + "\n" + Math.round(celcius) + "°C");
      })
      .catch((error) => console.log(error));
    setCity("");
  };

  return (
    <div>
      <center>
        <div
          className="card"
          style={{ borderRadius: 20, width: 400, marginTop: 200 }}
        >
          <div className="card-body">
            <h4 className="card-title" style={{ marginTop: 50, lineHeight: 1 }}>
              Weather App
            </h4><br/>
            <form onSubmit={submitHandler}>
              <TextField
                size="30"
                type="text"
                name="city"
                label="Enter place name"
                onChange={changeHandler}
                value={city}
              />{" "}
              <br />
              <br />
              <Button type="submit" variant="contained">
                Get Temperature
              </Button>
            </form>
            <br /> <br />
            <div>
              <h1>{result}</h1>
            </div>
          </div>
        </div>
      </center>
    </div>
  );
};

export default App;
