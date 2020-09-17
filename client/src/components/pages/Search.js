import React, { useState } from "react";
import { Input, Button } from "@material-ui/core";

const divStyle = {
  marginBottom: "10px",
  marginLeft: "20px",
  marginTop: "60px",
};

const Search = (props) => {
  const [input, setInput] = useState({ city: "", state_name: "" });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const buttonSubmit = () => {
    props.buttonSubmit({
      city: input.city,
      state_name: input.state_name,
      county: null,
      lat: null,
      lng: null,
    });
    setInput({ city: "", state_name: "" });
  };

  return (
    <>
      <div className="form-group" style={divStyle}>
        <Input
          disabled={props.loadingInfo}
          type="text"
          className="form-control"
          name="city"
          id="search"
          placeholder="Type a city"
          onChange={handleChange}
          value={input.city}
        />
        <Input
          disabled={props.loadingInfo}
          style={{ marginLeft: "50px" }}
          type="text"
          id="search"
          placeholder="Type a state"
          name="state_name"
          className="form-control"
          onChange={handleChange}
          value={input.state_name}
        />
        <Button
          variant="contained"
          color="primary"
          size="small"
          disabled={props.loadingInfo}
          onClick={buttonSubmit}
        >
          Enter
        </Button>
      </div>
    </>
  );
};

export default Search;
