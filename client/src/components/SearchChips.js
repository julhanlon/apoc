import React, { useState } from "react";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";

const SearchChips = (props) => {
  const [recentCities, setCities] = useState({ city: "", state_name: "" });

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  const handleClick = () => {
    console.info("Youxs clicked the Chip.");
  };

  // var array = props.options;
  var array = [{ city: "berkeley" }, { city: "san francisco" }];

  let chips = props.options.map((item, index) => {
    return (
      <div>
        {/* <Button
          onClick={props.handleAuxButton}
          variant="outlined"
          color="secondary"
          key={index}
        >
          Recent Searches
        </Button> */}

        <Chip
          data-index={index}
          label={`${item.city}, ${item.state_name}`}
          icon={<FaceIcon />}
          // value={item}
          label={`${item.city}, ${item.state_name}`}
          onClick={handleClick}
          onDelete={handleDelete}
          color="primary"
        />
      </div>
    );
  });
  return chips;
};

export default SearchChips;

// const [suggestions, setSuggestionsData] = useState(null);
