import React, { useState, useEffect } from "react";
import { Card, Button, Input } from "@material-ui/core";
//import ShowCard from "./ShowCard";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import API from "../../utils/API";
import "./FeedList.css"

const convertDate = (date) => {
  let isoDate = date;
  return (isoDate.split("T")[0]);
};



const FeedList = (props) => {
  const [feedItems, setFeedItems] = useState([]);
  const [show, setShow] = useState(true);
  const [text, setText] = useState("");

  useEffect(() => {
    setFeedItems(props.feedData);
  }, [props.feedData]);

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

  let titleArr = feedItems.map((item, index) => (
    <div key={index} id = "commentCard">
    <Card id = "cardd">
      <div style = {{display: "flex", justifyContent: "space-between", marginRight: "10px" , marginLeft: "10px"}}>
      <Typography variant="p" component="p">
      <p>{item.author.id ? item.author.id.displayName || "" : ""}</p>
      </Typography>
      <Typography variant="p" component="p">
      <p>{convertDate(item.date)}</p>
      </Typography>
      </div>
      <div style = {{marginLeft: "10px"}}>
      <Typography variant="p" component="p">
      <p >{item.text}</p>
      </Typography>
      </div>
    
    
    </Card>
     
    </div>
  ));

  return (
    <div style={{ width: "90%", height: "670px" }}>
      <FormControlLabel
        control={<Checkbox id="checkbox" onClick={showCard} checked={show} />}
      />{" "}
      Feed
      {show && (
        <Card id="feedCard">
          <CardContent>
            <div
              style={
                // { display: "flex", justifyContent: "space-around" }
                {
                  border: "1px solid",
                  height: "600px",
                  overflow: "scroll",
                  // display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }
              }
            >
              {titleArr}
              <Input id = "inputFeed"
                name="text"
                type="text"
                placeholder="add comment"
                onChange={changeText}
                value={text}
              />

              <Button  size = "small" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FeedList;
