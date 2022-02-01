import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/core";
import "./form1.css";

const useStyles = makeStyles((theme) => ({
  input: {
    fontFamily: "DM Sans",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "0.9vw",
    color: "#263238",
  },
}));

export default function Form1({ user }) {
  const classes = useStyles();
  const [labelEmail, setLabelEmail] = useState("Email");
  const [labelfname, setLabelfname] = useState("Name");
  const [labelusername, setLabelusername] = useState("Username");
  const [labeltitle, setLabeltitle] = useState("Title");
  const [labelmobile, setlabelmobile] = useState("Mobile Number");
  const [labelcountry, setlabelcountry] = useState("Country");
  const [labeltextArea, setLabeltextArea] = useState("Overview");

  const [firstname, setFirstname] = useState(user?.name || null);
  const [email, setEmail] = useState(user?.email || null);
  const [title, setTitle] = useState(user?.title || null);
  const [username, setusername] = useState(user?.username || null);
  const [mobile, setmobile] = useState(user?.mobile || null);
  const [country, setcountry] = useState(user?.country || null);
  const [about, setAbout] = useState(user?.overview || null);
  const [bordercolor, setBordercolor] = useState(true);

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
                  variant="standard"
                />
              </Box>
            </div>
          </div>
        </div>
        <div className="form1profile-textme">
          <div
            style={{ width: "51.5vw", height: "10vw", marginBottom: "3vw" }}
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
            />
          </div>
        </div>
      </div>
    </div>
  );
}
