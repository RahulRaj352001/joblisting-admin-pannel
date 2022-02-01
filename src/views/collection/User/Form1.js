import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/core";
import "./form1.css";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  input: {
    fontFamily: "DM Sans",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "0.9vw",
    color: "#263238",
  },
}));

export default function Form1({ user, setAllusers, setVisible }) {
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

  const classes = useStyles();
  const [labelEmail, setLabelEmail] = useState("Email");
  const [labelfname, setLabelfname] = useState("Name");
  const [labelusername, setLabelusername] = useState("Username");
  const [labeltitle, setLabeltitle] = useState("Title");
  const [labelmobile, setlabelmobile] = useState("Mobile Number");
  const [labelcountry, setlabelcountry] = useState("Country");
  const [labeltextArea, setLabeltextArea] = useState("Overview");
  const [colorsave, setColorSave] = useState(false);
  const [firstname, setFirstname] = useState(user?.name || null);
  const [email, setEmail] = useState(user?.email || null);
  const [title, setTitle] = useState(user?.title || null);
  const [username, setusername] = useState(user?.username || null);
  const [mobile, setmobile] = useState(user?.mobile || null);
  const [country, setcountry] = useState(user?.country || null);
  const [about, setAbout] = useState(user?.overview || null);
  const [bordercolor, setBordercolor] = useState(true);

  function handleform1submit() {
    const formdata = {
      name: firstname,
      email: email,
      username: username,
      mobile: mobile,
      title: title,
      overview: about,
      country: country,
    };

    axios
      .post(`http://localhost:5000/admin/updateuser/${user?._id}`, formdata)
      .then(async (res) => {
        setBordercolor(true);
        await axios
          .get("http://localhost:5000/admin/getalluser")
          .then((res) => {
            setAllusers(res.data);
            setVisible(false);
          });
        setColorSave(true);
      });
    //   .catch(async (err) => {
    //     //console.log((err.response.data.error);
    //     if (err.response.data.error === "Username already exists") {
    //       setBordercolor(false);
    //       setLabelusername("Duplicate Username ");
    //       setLabelfname("Duplicate Name ");
    //     }
    //   });
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
                  placeholder="Name"
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
                      color: "#6B6B6B",
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
        <div className="form1profile-fullusername">
          <div style={{ marginRight: "1.5vmax" }} className="form1email">
            <div
              //   style={{ border: bordercoloremail ? "" : " 2px solid red" }}
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
                      color: "#6B6B6B",
                    },
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
                  label={labeltitle}
                  value={title}
                  placeholder="title"
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
                    setTitle(e.target.value);
                    setLabeltitle("Title");
                    if (e.target.value === "") {
                      setLabeltitle("");
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
              //   style={{ border: bordercolormobile ? "" : " 2px solid red" }}
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
                      color: "#6B6B6B",
                    },
                  }}
                  onChange={(e) => {
                    if (e.target.value.length < 13) {
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
                  InputProps={{ disableUnderline: true }}
                  id="standard-basic"
                  placeholder="Country"
                  label={labelcountry}
                  value={country}
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
                    setcountry(e.target.value);
                    setlabelcountry("Country");
                    if (e.target.value === "") {
                      setlabelcountry("");
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
              rows="4"
              placeholder="OverView"
              className="textareaProfile"
              value={about}
              onChange={(e) => {
                if (e.target.value.length < 151) {
                  setAbout(e.target.value);
                }
                // setAbout(e.target.value);
                setLabeltextArea("Overview");
                if (e.target.value === "") {
                  setLabeltextArea("");
                }
                setColorSave(false);
              }}
            />
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
