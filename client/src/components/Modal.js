import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Fab } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import "./Modal.css";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "1px solid white",
    // boxShadow: theme.shadows[2],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionsModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Fab color="primary" size="small" onClick={handleOpen}>
        <InfoIcon />
      </Fab>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Air Quality Index</h2>
            <p id="good">Good: 0 - 50</p>
            <p id="moderate">Moderate: 51 - 100</p>
            <p id="unhealthyForSensitive">
              Unhealthy for Sensitive Groups: 101 - 150
            </p>
            <p id="unhealthy">Unhealthy: 151 - 200</p>
            <p id="veryUnhealthy">Very Unhealthy: 201 - 300</p>
            <p id="hazardous">Hazardous: 301 - 500</p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
