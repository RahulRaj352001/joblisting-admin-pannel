import PropTypes from "prop-types";
import React, { useEffect, useState, createRef } from "react";
import classNames from "classnames";
import axios from "axios";
import { rgbToHex } from "@coreui/utils";
import CIcon from "@coreui/icons-react";
import { cilPen, cilTrash } from "@coreui/icons";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
 
  CModalHeader,
  
} from "@coreui/react";

import Form1 from "./Form1";

const VerticallyCentered = ({ visiblex, setVisiblex, user,setAllusers }) => {
  return (
    <>
      <CModal
        alignment="center"
        size="lg"
        visible={visiblex}
        onClose={() => setVisiblex(false)}
      >
        <CModalHeader>
          <div style={{marginTop:"0.2vw"}} className="form1profile-heading">Profile Details
          <div className="form1profile-subheading">
            Please complete your profile details and show the world a better
            you.
          </div></div>
          
        </CModalHeader>

        <div style={{ width: "50vw", marginLeft: "1.82vw" }}>
          {" "}
          <Form1
          setVisible={setVisiblex}
            setAllusers={setAllusers}
            style={{ margin: "0 5vw", position: "relative", left: "1vw" }}
            user={user}
          />
        </div>
      </CModal>
    </>
  );
};
const ThemeView = () => {
  const [color, setColor] = useState("rgb(255, 255, 255)");
  const ref = createRef();

  useEffect(() => {
    const el = ref.current.parentNode.firstChild;
    const varColor = window
      .getComputedStyle(el)
      .getPropertyValue("background-color");
    setColor(varColor);
  }, [ref]);

  return (
    <table className="table w-100" ref={ref}>
      <tbody>
        <tr>
          <td className="text-medium-emphasis">HEX:</td>
          <td className="font-weight-bold">{rgbToHex(color)}</td>
        </tr>
        <tr>
          <td className="text-medium-emphasis">RGB:</td>
          <td className="font-weight-bold">{color}</td>
        </tr>
      </tbody>
    </table>
  );
};

const ThemeColor = ({ className, children }) => {
  const classes = classNames(className, "theme-color w-75 rounded mb-3");
  return (
    <CCol xs={12} sm={6} md={4} xl={2} className="mb-4">
      <div className={classes} style={{ paddingTop: "75%" }}></div>
      {children}
      <ThemeView />
    </CCol>
  );
};

ThemeColor.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const Colors = () => {
  const [allusers, setAllusers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visibleuser, setVisibleuser] = useState(null);
  const deleteUser = (_id) => {
    axios
      .delete(`http://localhost:5000/admin/deleteuser/${_id}`)
      .then((res) => {
        axios.get("http://localhost:5000/admin/getalluser").then((res) => {
          setAllusers(res.data);
        });
      });
  };
  useEffect(() => {
    axios.get("http://localhost:5000/admin/getalluser").then((res) => {
      setAllusers(res.data);
    });
  }, []);
  return (
    <>
      <CCol xs={12}>
        <CCard className="mb-1">
          <CCardHeader>
            <strong>EasyWork Users</strong>
          </CCardHeader>
          <CCardBody>
            <div href="components/table#hoverable-rows">
              <CTable hover className="okok">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Username</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Country</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Mobile</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Settings</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {allusers?.alluser?.map((user, index) => {
                    return (
                      <CTableRow key={index}>
                        <CTableHeaderCell scope="row">{index+1}</CTableHeaderCell>
                        <CTableDataCell>{user?.name}</CTableDataCell>
                        <CTableDataCell>{user?.username}</CTableDataCell>
                        <CTableDataCell>{user?.email}</CTableDataCell>
                        <CTableDataCell>{user?.country}</CTableDataCell>
                        <CTableDataCell>{user?.mobile}</CTableDataCell>
                        <CTableDataCell
                          style={{ justifyContent: "space-between !important" }}
                        >
                          <CIcon
                            onClick={() => {
                              setVisible(!visible);
                              setVisibleuser(user);
                            }}
                            className="m-1.52 mb-0"
                            style={{
                              position: "relative",
                              right: "0.11vw",
                              cursor: "pointer",
                              color: "blue",
                            }}
                            icon={cilPen}
                            size="lg"
                          />

                          <CIcon
                            onClick={() => deleteUser(user?._id)}
                            style={{
                              cursor: "pointer",
                              color: "red",
                              position: "relative",
                              left: "2vw",
                            }}
                            icon={cilTrash}
                            size="lg"
                          />
                        </CTableDataCell>
                      </CTableRow>
                    );
                  })}
                </CTableBody>
                {visibleuser ? (
                  <VerticallyCentered
                    visiblex={visible}
                    setVisiblex={setVisible}
                    user={visibleuser}
                    setAllusers={setAllusers}
                  />
                ) : (
                  ""
                )}
              </CTable>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </>
  );
};

export default Colors;
