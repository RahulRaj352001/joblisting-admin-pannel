import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/core";
// import { useSelector, useDispatch } from "react-redux";

import "./form1.css";
// import { API_UTILS } from "./../../../env";


import axios from "axios";
// import { userActions } from "../../../store/userSlice";
const useStyles = makeStyles((theme) => ({
  input: {
    fontFamily: "DM Sans",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "0.9vw",
    color: "#263238",
  },
}));

export default function Form1({
 
  user,
  bordercoloremail,
  setBordercoloremail,
  bordercolormobile,
  setBordercolormobile,
}) {
  const [coords, setCoords] = React.useState({ x: -1, y: -1 });
  const [isRippling, setIsRippling] = React.useState(false);

  React.useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 300);
    } else setIsRippling(false);
  }, [coords]);

  React.useEffect(() => {
    if (!isRippling) setCoords({ x: -1, y: -1 });
  }, [isRippling]);
  const [coordsx, setCoordsx] = React.useState({ x: -1, y: -1 });
  const [isRipplingx, setIsRipplingx] = React.useState(false);

  React.useEffect(() => {
    if (coordsx.x !== -1 && coordsx.y !== -1) {
      setIsRipplingx(true);
      setTimeout(() => setIsRipplingx(false), 300);
    } else setIsRipplingx(false);
  }, [coordsx]);

  React.useEffect(() => {
    if (!isRipplingx) setCoordsx({ x: -1, y: -1 });
  }, [isRipplingx]);

//   const dispatch = useDispatch();
//   const { user, loggedInStatus } = useSelector((state) => state.user);

  const classes = useStyles();
  const [labelEmail, setLabelEmail] = useState("Email");
  const [labelfname, setLabelfname] = useState("First Name");
  const [labellname, setLabellname] = useState("Last Name");
  const [labelusername, setLabelusername] = useState("Username");
  const [labelmobile, setlabelmobile] = useState("Mobile Number");
  const [labeldate, setLabeldate] = useState(user?.dob ? "Date of Birth" : "");
  const [labeltextArea, setLabeltextArea] = useState("About me");
  const [colorsave, setColorSave] = useState(false);

  const [link1data, setLink1data] = useState("");
  const [link2data, setLink2data] = useState("");
  const [datex, setDatex] = useState(new Date(user?.dob));
  const [link2dataone, setLink2dataone] = useState("");
  const [link2datatwo, setLink2datatwo] = useState("");
  const [showlinlone, setShowlinlone] = useState(
    user?.socialLinks && user?.socialLinks[2] ? true : false
  );
  const [showlinltwo, setShowlinltwo] = useState(
    user?.socialLinks && user?.socialLinks[3] ? true : false
  );
  const [showlinklone, setShowlinklone] = useState(
    user?.socialLinks && user?.socialLinks[0] ? true : false
  );
  const [showlinkltwo, setShowlinkltwo] = useState(
    user?.socialLinks && user?.socialLinks[1] ? true : false
  );

  const [firstname, setFirstname] = useState(user?.firstName || null);
  const [lastname, setLastname] = useState(user?.lastName || null);
  const [email, setEmail] = useState(user?.email || null);
  const [username, setusername] = useState(user?.username || null);
  const [mobile, setmobile] = useState(
    user?.mobile ? user?.mobile : user?.temporaryMobile || null
  );
  const [dateofbirth, setDateofbirth] = useState(user?.dob || null);
  const [about, setAbout] = useState(user?.about || null);
  const [profilePic, setProfilePic] = useState(user?.profilePic || null);
  const [coverPic, setCoverPic] = useState(user?.coverPic || null);
  const [bordercolor, setBordercolor] = useState(true);

  function checkemailormobile(data) {
    if (validator.isEmail(data)) {
      setLabelEmail("Email");
      setBordercoloremail(true);
    } else if (data === "") {
      setLabelEmail("");
      setBordercoloremail(true);
    } else {
      setLabelEmail("Invalid Email");
      setBordercoloremail(false);
    }
  }

  function handleform1submit() {
    const formdata = {
      coverPic: coverPic,
      profilePic: profilePic,
      firstName: firstname,
      lastName: lastname,
      userEmail: email,
      username: username,
      mobile: mobile,
      about: about,
      dob: dateofbirth,
      socialLinks: link2datatwo
        ? [link1data, link2data, link2dataone, link2datatwo]
        : link2dataone
        ? [link1data, link2data, link2dataone]
        : link2data
        ? [link1data, link2data]
        : [link1data],
    };

    axios
      .post(`${API_UTILS}/user/update-profile/${user?.userId}`, formdata)
      .then(async (res) => {
        // //console.log((res);

        setBordercolor(true);
        await getUserData();
        setColorSave(true);
        setBordercoloremail(true);
        setBordercolormobile(true);
      })
      .catch(async (err) => {
        //console.log((err.response.data.error);
        if (err.response.data.error === "Username already exists") {
          setBordercolor(false);
          setLabelusername("Duplicate Username ");
        }
      });
  }

  async function getUserData() {
    try {
      const data = await axios.get(
        `${API_UTILS}/user/get-all-data/${user?.userId}`
      );

      //console.log((data.data, "hi");
      const userDetails = {
        ...data?.data?.data,
        userInfo: {
          firstName: data?.data?.data?.firstName,
          lastName: data?.data?.data?.lastName,
          about: data?.data?.data?.about,
          dob: data?.data?.data?.dob,
        },
      };
      window.localStorage.setItem("user", JSON.stringify(userDetails));
    //   dispatch(userActions.setUser({ user: userDetails }));
    } catch (err) {
      //console.log((err.message);
    }
  }

  return (
    <div className="form1-container">
      <div className="form1prifile-detail">
        
        <div className="form1profile-fullname">
          <div style={{ marginRight: "1.5vmax" }} className="form1fname">
            <div className="email-box">
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { width: "25ch", height: "3vh" },
                  "& .MuiTextField-root": {
                    mt: "0.75vw",
                    pl: 2,
                  },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  InputProps={{ disableUnderline: true }}
                  id="standard-basic"
                  label={labelfname}
                  value={firstname}
                  placeholder="First Name"
                  inputProps={{ className: classes.input }}
                  InputLabelProps={{
                    style: {
                      fontSize: "1vw",
                      marginLeft: "15px",
                      fontFamily: "DM Sans",
                      fontStyle: "normal",
                      fontWeight: "500",
                      color: "#6B6B6B",
                    },
                  }}
                  onChange={(e) => {
                    setColorSave(false);
                    setFirstname(e.target.value);
                    setLabelfname("First Name");
                    if (e.target.value === "") {
                      setLabelfname("");
                    }
                  }}
                  variant="standard"
                />
              </Box>
            </div>{" "}
          </div>
          <div className="form1lname">
            {" "}
            <div className="email-box">
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { width: "25ch", height: "3vh" },
                  "& .MuiTextField-root": {
                    mt: "0.75vw",
                    pl: 2,
                  },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  InputProps={{ disableUnderline: true }}
                  id="standard-basic"
                  label={labellname}
                  value={lastname}
                  placeholder="Last Name"
                  inputProps={{ className: classes.input }}
                  InputLabelProps={{
                    style: {
                      fontSize: "1vw",

                      marginLeft: "15px",
                      fontFamily: "DM Sans",
                      fontStyle: "normal",
                      fontWeight: "500",
                      color: "#6B6B6B",
                    },
                  }}
                  onChange={(e) => {
                    setColorSave(false);
                    setLastname(e.target.value);
                    setLabellname("Last Name");
                    if (e.target.value === "") {
                      setLabellname("");
                    }
                  }}
                  variant="standard"
                />
              </Box>
            </div>
          </div>
        </div>
        <div className="form1profile-fullusername">
          <div style={{ marginRight: "1.5vmax" }} className="form1email">
            <div
              style={{ border: bordercoloremail ? "" : " 2px solid red" }}
              className="email-box"
            >
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { width: "25ch", height: "3vh" },
                  "& .MuiTextField-root": {
                    mt: "0.75vw",
                    pl: 2,
                  },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  InputProps={{ disableUnderline: true }}
                  id="standard-basic"
                  label={labelEmail}
                  value={email}
                  placeholder="Email"
                  inputProps={{ className: classes.input }}
                  InputLabelProps={{
                    style: {
                      fontSize: "1vw",
                      marginLeft: "15px",
                      fontFamily: "DM Sans",
                      fontStyle: "normal",
                      fontWeight: "500",
                      color: bordercoloremail ? "#6B6B6B" : "red",
                    },
                  }}
                  onBlur={(e) => {
                    checkemailormobile(e.target.value);
                  }}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setLabelEmail("Email");
                    if (e.target.value === "") {
                      setLabelEmail("");
                    }
                    setColorSave(false);
                  }}
                  variant="standard"
                />
              </Box>
            </div>{" "}
          </div>
          <div className="form1username">
            {" "}
            <div
              style={{ border: bordercolor ? "" : " 2px solid red" }}
              className="email-box"
            >
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { width: "25ch", height: "3vh" },
                  "& .MuiTextField-root": {
                    mt: "0.75vw",
                    pl: 2,
                  },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  InputProps={{ disableUnderline: true }}
                  id="standard-basic"
                  label={labelusername}
                  value={username}
                  placeholder="Username"
                  inputProps={{ className: classes.input }}
                  InputLabelProps={{
                    style: {
                      fontSize: "1vw",
                      marginLeft: "15px",
                      fontFamily: "DM Sans",
                      fontStyle: "normal",
                      fontWeight: "500",
                      color: bordercolor ? "#6B6B6B" : "red",
                    },
                  }}
                  onChange={(e) => {
                    setusername(e.target.value);
                    setLabelusername("Username");
                    if (e.target.value === "") {
                      setLabelusername("");
                    }
                    setColorSave(false);
                  }}
                  variant="standard"
                />
              </Box>
            </div>
          </div>
        </div>
        <div className="form1profile-fullextra">
          <div style={{ marginRight: "1.5vmax" }} className="form1mobile">
            {" "}
            <div
              style={{ border: bordercolormobile ? "" : " 2px solid red" }}
              className="email-box"
            >
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { width: "25ch", height: "3vh" },
                  "& .MuiTextField-root": {
                    mt: "0.75vw",
                    pl: 2,
                  },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  type="number"
                  InputProps={{ disableUnderline: true }}
                  id="standard-basic"
                  label={labelmobile}
                  value={mobile}
                  placeholder="Mobile Number"
                  inputProps={{ className: classes.input }}
                  InputLabelProps={{
                    style: {
                      fontSize: "1vw",

                      marginLeft: "15px",
                      fontFamily: "DM Sans",
                      fontStyle: "normal",
                      fontWeight: "500",
                      color: bordercolormobile ? "#6B6B6B" : "red",
                    },
                  }}
                  onChange={(e) => {
                    if (e.target.value.length < 11) {
                      setmobile(e.target.value);
                    }
                    setlabelmobile("Mobile Number");
                    if (e.target.value === "") {
                      setlabelmobile("");
                    }
                    setColorSave(false);
                  }}
                  variant="standard"
                />
              </Box>
            </div>{" "}
          </div>
          <div className="form1dateofbirth">
            {" "}
            <div className="email-box">
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { width: "33vw", height: "3vh" },
                  "& .MuiTextField-root": {
                    mt: "0.75vw",
                    pl: 2,
                  },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  type="date"
                  InputProps={{ disableUnderline: true }}
                  id="standard-basic"
                  placeholder="Date of Birth"
                  label={labeldate}
                  value={
                    dateofbirth?.length > 10
                      ? dateofbirth?.slice(0, 10)
                      : dateofbirth
                  }
                  inputProps={{ className: classes.input }}
                  InputLabelProps={{
                    shrink: true,
                    style: {
                      fontSize: "1vw",

                      marginLeft: "15px",
                      fontFamily: "DM Sans",
                      fontStyle: "normal",
                      fontWeight: "500",
                      color: "#6B6B6B",
                    },
                  }}
                  onChange={(e) => {
                    setDateofbirth(e.target.value);
                    setLabeldate("Date of Birth");
                    if (e.target.value === "") {
                      setLabeldate("");
                    }
                    setColorSave(false);
                  }}
                  variant="standard"
                />
              </Box>
            </div>
          </div>
        </div>
        <div className="form1profile-textme">
          <div
            style={{ width: "51.5vw", height: "10vw" }}
            className="email-box"
          >
            <p className="labeltextarea" style={{ width: "100px" }}>
              {labeltextArea}
            </p>
            <textarea
              rows="3"
              placeholder="About me"
              className="textareaProfile"
              value={about}
              onChange={(e) => {
                if (e.target.value.length < 151) {
                  setAbout(e.target.value);
                }
                // setAbout(e.target.value);
                setLabeltextArea("About Me");
                if (e.target.value === "") {
                  setLabeltextArea("");
                }
                setColorSave(false);
              }}
            />
            <div
              style={{
                fontFamily: "DM Sans",
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: "0.9vw",
                color: "#263238",
                textAlign: "right",
                marginRight: "0.52vw",
              }}
            >
              {about?.length}/150
            </div>
          </div>
        </div>
      </div>
     

          <div className="form1-save">
            <button
              style={{
                backgroundColor: colorsave ? "#6AB04C" : "#FB7750",
                color: colorsave ? "white" : "",
              }}
              onClick={(e) => {
                handleform1submit(e);
                const rect = e.target.getBoundingClientRect();
                setCoords({
                  x: e.clientX - rect.left,
                  y: e.clientY - rect.top,
                });
              }}
              className="form1-save-button ripple-button"
            >
              {isRippling ? (
                <span
                  className="ripple"
                  style={{
                    left: coords.x,
                    top: coords.y,
                  }}
                />
              ) : (
                ""
              )}
              <span
                className="content"
                style={{ color: colorsave ? "white" : "white" }}
              >
                {colorsave ? "Saved" : "Save"}
              </span>
            </button>
          </div>
        </div>
     
  
  );
}
