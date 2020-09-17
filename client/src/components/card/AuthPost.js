import React, { useState } from "react";
// import { useTodoContext } from "../utils/GlobalState";
import Axios from "axios";

const Form = (props) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(text);
    Axios.post(
      "http://localhost:5000/feed",
      { title: text },
      {
        headers: {
          "x-auth-token": localStorage.getItem("auth-token"),
        },
      }
    )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => setText(e.target.value);

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-field">
        <input
          id={"text"}
          type={"text"}
          className={"validate input-large"}
          value={props.textValue}
          name={props.inputName}
          onChange={handleChange}
        />
        {props.textValue ? null : <label htmlFor="text">Text</label>}
        <span
          className="helper-text"
          data-error="wrong"
          data-success="submitted"
        >
          Press Enter to submit
        </span>
        <button type="submit">Post Comment</button>
      </div>
    </form>
  );
};



export default Form;
