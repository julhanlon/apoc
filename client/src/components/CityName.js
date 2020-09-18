import React from 'react'
import Typography from "@material-ui/core/Typography";

const CityName = (props) => {
    return (
        <div style = {{ height: "320px" , marginBottom: "50px"}}>
            <Typography variant="h3" component="h3">
            <p >{props.mapObj.city}, {props.mapObj.state_name}</p>
            </Typography>
          
        </div>
    )
}

export default CityName;
