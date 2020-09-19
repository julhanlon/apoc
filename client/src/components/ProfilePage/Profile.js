import Axios from "axios";
import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import { InputLabel, Container } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Card } from '@material-ui/core';
import ProfileButtons from "../auth/ProfileButtons";
import ParticlesBg from "particles-bg";
import { makeStyles } from '@material-ui/core/styles';
import "./Profile.css"

const useStyles = makeStyles({
  root: {
      background: "#e0890d",
  },

});


let picArray = ["/static/images/error.png", "/static/images/gasmask.png", "/static/images/warning.png", "/static/images/mask.png", "/static/images/fire.png", "/static/images/coronavirus.png", "/static/images/skull.png", "/static/images/virus.png"]

const Profile = () => {
  const classes = useStyles();
  const [profileInfo, setProfileInfo] = useState({});
  const [edit, setEdit] = useState(false);
  const [editLast, setEditLast] = useState(false);
  const [editFirst, setEditFirst] = useState(false);
  const [editLocation, setEditLocation] = useState(false);
  const [editPhone, setEditPhone] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [editImage, setEditImage] = useState("");

  useEffect(() => {
    const loadProfileInfo = async () => {
      try {
        const myProfile = await Axios({
          url: "/users/profile",
          method: "GET",
          headers: { "x-auth-token": localStorage.getItem("auth-token") }
        });
        console.log(myProfile)
        setProfileInfo(myProfile.data.user);
        let userImage = myProfile.data.user.profilePic;
        let userImageIndex = picArray.indexOf(userImage)
        setEditImage(userImage)
        setImageIndex(userImageIndex)
      } catch (err) {
        console.log(err.response)
    
      }
    }
    loadProfileInfo();
  }, []);



  const changeToEdit = (attr) => {
    switch (attr) {
      case "displayName":
        return setEdit(!edit)
      case "lastName":
        return setEditLast(!editLast)
      case "firstName":
        return setEditFirst(!editFirst)
      case "location":
        return setEditLocation(!editLocation)
      case "phone":
        return setEditPhone(!editPhone)
      default:
        return;
    }
  }

  const handleChange = (e) => {
    setProfileInfo({ ...profileInfo, [e.target.name]: e.target.value });
  };

  const saveChange = async (e) => {
    let attr = e.target.name;
    try {
      await API.editProfile(attr, e.target.value)
      changeToEdit(attr);
    } catch (err) {
      console.log(err)
      changeToEdit(attr);
    }
  }


  const changeImageUp = async () => {
    let nextIndex = (imageIndex + 1) % picArray.length
    setImageIndex(nextIndex)
    setEditImage(picArray[nextIndex])
    try {
      await API.editProfile("profilePic", picArray[nextIndex])
    } catch (err) {
      console.log(err)
    }
  }

  let config = {
    num: [4, 6],
    rps: 0.6,
    radius: [5, 30],
    life: [1.5, 30],
    v: [2, 3],
    tha: [-40, 40],
    alpha: [0.6, 0],
    scale: [0.06, 0.1],
    position: "all",
    type: "ball",
    // body: "import some image",
    color: ["#c9c7c1", "‎#94928e"],
    // cross: "dead",
    emitter: "follow",
    random: 5,
  };

  if (Math.random() > 0.85) {
    config = Object.assign(config, {
      onParticleUpdate: (ctx, particle) => {
        ctx.beginPath();
        ctx.rect(
          particle.p.x,
          particle.p.y,
          particle.radius * 2,
          particle.radius * 2
        );
        ctx.fillStyle = particle.color;
        ctx.fill();
        ctx.closePath();
      },
    });
  }


  return (
    <div>
<ProfileButtons  />
      <Container >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card id="profileCard" style={{ height: "600px", maginTop: "20px", width: "500px", marginTop: "60px" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img src={editImage} id="profileImage" alt="not working" />
            </div>
            <Fab classes={{
                            root: classes.root, // class name, e.g. `classes-nesting-root-x`
                           
                        }} id = "profileFab" onClick={changeImageUp} size = "small" aria-label="add">
              <AddIcon />
            </Fab>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <p style={{ marginRight: "10px" }}>Display Name:</p>
              {edit ? <input value={profileInfo.displayName} name="displayName" onChange={handleChange} onBlur={saveChange} /> :
                <InputLabel onClick={() => changeToEdit("displayName")}> {profileInfo.displayName || "type to insert"}</InputLabel>}
            </div>


            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <p style={{ marginRight: "10px" }}>First Name:</p>
              {editFirst ? <input value={profileInfo.firstName} name="firstName" onChange={handleChange} onBlur={saveChange} /> :
                <InputLabel onClick={() => changeToEdit("firstName")}> {profileInfo.firstName || "type to insert"}</InputLabel>}
            </div>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <p style={{ marginRight: "10px" }}>Last Name:</p>
              {editLast ? <input value={profileInfo.lastName} name="lastName" onChange={handleChange} onBlur={saveChange} /> :
                <InputLabel placeholder="Type Last Name" onClick={() => changeToEdit("lastName")}>{profileInfo.lastName || "type to insert"}</InputLabel>}
            </div>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <p style={{ marginRight: "10px" }}>Location:</p>
              {editLocation ? <input value={profileInfo.location} name="location" onChange={handleChange} onBlur={saveChange} /> :
                <InputLabel placeholder="Type Last Name" onClick={() => changeToEdit("location")}>{profileInfo.location || "type to insert"}</InputLabel>}
            </div>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <p>Email: {profileInfo.email}</p>
            </div>
          </Card>
        </div>

      </Container>
      <ParticlesBg type="custom" config={config} bg={true} />
    </div>
  )
}

export default Profile;

