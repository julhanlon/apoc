import React from "react";
import { Card} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const Card = (props) => {
  const renderContent = () => {
    if (props.form) {
      return props.form;
    } else {
      return <p>{props.text}</p>;
    }
  };

  return (
    <div className="card ">
      <Card>
      <div className="card-content">
        <span className="card-title">{props.title}</span>
        {renderContent()}
      </div>
      <div className="card-action">
        <div className="input-field">{props.children}</div>
      </div>
      </Card>
  
    </div>
  );
};

export default Card;
