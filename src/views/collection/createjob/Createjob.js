import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/core";
import "../User/form1.css";
import axios from "axios";
import { CCardBody } from "@coreui/react";

const useStyles = makeStyles((theme) => ({
  input: {
    fontFamily: "DM Sans",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "0.9vw",
    color: "#263238",
  },
}));

export default function Form1({ setAllusers, setVisiblex }) {
  const classes = useStyles();

  const [labeltextArea, setLabeltextArea] = useState("Description");
  const [colorsave, setColorSave] = useState(false);
  const [firstname, setFirstname] = useState(null);
  const [email, setEmail] = useState(null);
  const [title, setTitle] = useState(null);
  const [username, setusername] = useState(null);
  const [skills, setSkills] = useState([]);
  const [skillx, setSkillx] = useState("");
  const [languagex, setLanguagex] = useState("");
  const [mobile, setmobile] = useState(null);
  const [country, setcountry] = useState(null);
  const [about, setAbout] = useState(null);
  const [bordercolor, setBordercolor] = useState(true);

  function getSkill(myarray) {
    let totalskill = [];
    myarray.map((el) => {
      totalskill = [...totalskill, { skill: el }];
    });
    return totalskill;
  }
  function getlanguage(myarrayx) {
    let totalskill = [];
    myarrayx.map((el) => {
      totalskill = [...totalskill, { language: el }];
    });
    return totalskill;
  }

  function handleform1submit() {
    let myarray = skillx.split(",");
    const totalskill = getSkill(myarray);

    let myarrayx = languagex.split(",");
    const totalLanguage = getlanguage(myarrayx);

    const formdata = {
      title: firstname,
      jobType: username,
      skills: totalskill,
      listingType: mobile,
      location: country,
      description: about,
      languages: totalLanguage,
      minPrice: parseInt(email),
      maxPrice: parseInt(title),
    };
    axios
      .post(`http://localhost:5000/job/createjob`, formdata)
      .then(async (res) => {
        setBordercolor(true);
        setColorSave(true);
        await axios
          .get("http://localhost:5000/admin/getalljobs")
          .then((res) => {
            setAllusers(res.data);
            setVisiblex(false);
          });
      });
  }

  return (
    <div className="mb-1">
      <CCardBody>
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
                      label="Title"
                      value={firstname}
                      placeholder="Title"
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
                      }}
                      variant="standard"
                    />
                  </Box>
                </div>{" "}
              </div>
              <div style={{ marginRight: "1.5vmax" }} className="form1lname">
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
                      label="Job Type"
                      value={username}
                      placeholder="Job Type"
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

                        setColorSave(false);
                      }}
                      variant="standard"
                    />
                  </Box>
                </div>
              </div>
              <div style={{ marginRight: "1.5vmax" }} className="form1lname">
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
                      label="Skills"
                      value={skillx}
                      placeholder="Add Skills ( , )"
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
                        setSkillx(e.target.value);

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
                      type="number"
                      InputProps={{ disableUnderline: true }}
                      id="standard-basic"
                      label="Minimum Price"
                      value={email}
                      placeholder="Minimum Price"
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

                        setColorSave(false);
                      }}
                      variant="standard"
                    />
                  </Box>
                </div>{" "}
              </div>
              <div style={{ marginRight: "1.5vmax" }} className="form1username">
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
                      type="number"
                      InputProps={{ disableUnderline: true }}
                      id="standard-basic"
                      label="Maximum Price"
                      value={title}
                      placeholder="Maximum Price"
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

                        setColorSave(false);
                      }}
                      variant="standard"
                    />
                  </Box>
                </div>
              </div>
              <div style={{ marginRight: "1.5vmax" }} className="form1lname">
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
                      label="Languages"
                      value={languagex}
                      placeholder="Add Language ( , )"
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
                        setLanguagex(e.target.value);

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
                      InputProps={{ disableUnderline: true }}
                      id="standard-basic"
                      label={"Listing Type"}
                      value={mobile}
                      placeholder="Listing Type"
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
                        setmobile(e.target.value);
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
                      placeholder="Location"
                      label={"Location"}
                      value={country}
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
                        setcountry(e.target.value);

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
                style={{ width: "49.5vw", height: "10vw" }}
                className="email-box"
              >
                <p className="labeltextarea" style={{ width: "100px" }}>
                  {labeltextArea}
                </p>
                <textarea
                  rows="4"
                  placeholder="Description"
                  className="textareaProfile"
                  value={about}
                  onChange={(e) => {
                    if (e.target.value.length < 151) {
                      setAbout(e.target.value);
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
              }}
              className="form1-save-button ripple-button"
            >
              <span
                className="content"
                style={{ color: colorsave ? "white" : "white" }}
              >
                {colorsave ? "Saved" : "Save"}
              </span>
            </button>
          </div>
        </div>
      </CCardBody>
    </div>
  );
}
