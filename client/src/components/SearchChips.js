import React, { useState } from "react";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
      background: "#1ecbe1",
      borderRadius: 15,
      border: 0,
      color: 'white',
      height: 33,
      padding: '0 15px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
      textTransform: 'capitalize',
  },
});


const SearchChips = (props) => {
  const classes = useStyles();
  const [recentCities, setCities] = useState([]);

  React.useEffect(() => {
    function getFromLocalStorage() {
      let mapStorage = localStorage.getItem("mapStorage");
      return mapStorage ? JSON.parse(mapStorage) : [];
    }

    setCities(getFromLocalStorage());
  }, []);

  const handleDelete = (index) => {
    var arr = recentCities;

    arr.splice(index, 1);
    setCities(arr);
  };

  const handleClick = (e) => {
    let { city, state_name, county, lat, lng } = recentCities[
      e.currentTarget.dataset.index
    ];
    props.buttonSubmit({ city, state_name, county, lat, lng });
  };

  // let uniq = [...new Set(recentCities)];
  // console.log(uniq);
  let chips = recentCities.map((item, index) => {
    return (
      <div key={index} style={{ size: "sizeSmall" }}>
        <Chip style = {{marginLeft: "5px"}}
        classes={{
          root: classes.root, // class name, e.g. `classes-nesting-root-x`
          label: classes.label, // class name, e.g. `classes-nesting-label-x`
      }} 
          size="small"
          data-index={index}
          label={`${item.city}`}
          // icon={<FaceIcon />}
          onClick={handleClick}
          //onDelete={() => handleDelete(index)}
          
          variant="contained"
        />
      </div>
    );
  });
  return chips;
};

export default SearchChips;

// const [suggestions, setSuggestionsData] = useState(null);
