import React, { useState, useEffect } from "react";
import { Card } from "@material-ui/core";
//import ShowCard from "./ShowCard";
import CardContent from "@material-ui/core/CardContent";

import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import API from "../../utils/API";

const convertDate = (date) => {
  let d = date;
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};

const styles = {
  border: "1px solid",
  padding: "10px",
  margin: "10px",
  marginTop: "20px",
};

const FeedList = (props) => {
  const [feedItems, setFeedItems] = useState([]);
  const [show, setShow] = useState(true);
  const [text, setText] = useState("");

  useEffect(() => {
    setFeedItems(props.feedData);
  }, [props.feedData]);
  console.log(props.feedData);

  function changeText(e) {
    setText(e.target.value);
  }
  const showCard = () => {
    setShow(!show);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (text.trim() === "") return;
    let { city, state_name, county } = props.mapInfo;

    console.log(city, state_name, text);
    try {
      const newComment = await API.postFeedData(city, state_name, text);
      console.log(newComment.data);
    } catch (error) {
      return console.log(error);
    }
    try {
      const allComments = await API.getFeedData(city, state_name, county);
      setFeedItems(allComments.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setText("");
    }
  }
  console.log(feedItems);
  let location = () => <div>{feedItems[0].location.city}</div>;
  // let feedTitle = props.feedData.map((item, index) => (
  //   <container key={index}>
  //     {item.location.city}, {item.location.state_name}
  //   </container>
  // ));
  let titleArr = feedItems.map((item, index) => (
    <container key={index}>
      <h3>
        {item.location.city}, {item.location.state_name}
      </h3>
      <container>
        <div key={index} style={styles}>
          <h3>
            {item.location.city}, {item.location.state_name}
          </h3>
          <p>{item.author.id ? item.author.id.displayName || "" : ""}</p>
          <p style={styles}>{item.text}</p>
          <p>{item.date}</p>
        </div>
      </container>
    </container>
  ));

  return (
    <div style={{ width: "90%", height: "400px" }}>
      <FormControlLabel
        control={<Checkbox id="checkbox" onClick={showCard} checked={show} />}
      />{" "}
      Feed
      <div>{location}</div>
      {show && (
        <Card id="mapCard" variant="outlined">
          <CardContent>
            asdlfads
            {/* {feedTitle} */}
            <div
              style={
                // { display: "flex", justifyContent: "space-around" }

                {
                  border: "1px solid",
                  height: "400px",
                  overflow: "scroll",
                  // display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }
              }
            >
              {" "}
              {titleArr}
              <input
                name="text"
                type="text"
                placeholder="add comment"
                onChange={changeText}
                value={text}
              />
              <button type="submit" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FeedList;
