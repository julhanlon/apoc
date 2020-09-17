import React, { useState } from "react";
import { Input, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const divStyle = {
  marginBottom: "30px",
  marginLeft: "40px",
  marginTop: "60px",
};

const useStyles = makeStyles({
  root: {
    background: "#cd3239",
    borderRadius: 15,
    border: 0,
    color: "white",
    height: 33,
    padding: "0 15px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  label: {
    textTransform: "capitalize",
  },
});

const Search = (props) => {
  const classes = useStyles();
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
          classes={{
            root: classes.root, // class name, e.g. `classes-nesting-root-x`
            label: classes.label, // class name, e.g. `classes-nesting-label-x`
          }}
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
