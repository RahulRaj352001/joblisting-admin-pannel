import PropTypes from "prop-types";
import React, { useEffect, useState, createRef } from "react";
import classNames from "classnames";
import axios from "axios";
import { rgbToHex } from "@coreui/utils";
import CIcon from "@coreui/icons-react";
import { cilLowVision, cilPen, cilTrash } from "@coreui/icons";
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
  CButton,
} from "@coreui/react";

import CreateJob from "../createjob/Createjob.js";
import Formj1 from './Formj1.js'
import Formj2 from './Formj2.js'
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

const VerticallyCentered3 = ({ visiblex, setVisiblex, setAllusers }) => {
  return (
    <>
      <CModal
        alignment="center"
        size="xl"
        visible={visiblex}
        onClose={() => setVisiblex(false)}
      >
        <CModalHeader>
          <div style={{ marginTop: "0.2vw" }} className="form1profile-heading">
          EasyWork Create Job
            <div className="form1profile-subheading">
              Please complete your Job and show the world a better you.
            </div>
          </div>
        </CModalHeader>

        <div style={{ width: "50vw", marginLeft: "0.82vw" }}>
          <CreateJob
            setAllusers={setAllusers}
            setVisiblex={setVisiblex}
            user={user}
            style={{ margin: "0 5vw", position: "relative", left: "1vw" }}
          />
        </div>
      </CModal>
    </>
  );
};
const VerticallyCentered2 = ({ visiblex, setVisiblex, setAllusers,user }) => {
  return (
    <>
      <CModal
        alignment="center"
        size="xl"
        visible={visiblex}
        onClose={() => setVisiblex(false)}
      >
        <CModalHeader>
          <div style={{ marginTop: "0.2vw" }} className="form1profile-heading">
            EasyWork  Job Detail
            <div className="form1profile-subheading">
              Please  show the world a better you.
            </div>
          </div>
        </CModalHeader>

        <div style={{ width: "50vw", marginLeft: "0.82vw" }}>
          <Formj1
            setAllusers={setAllusers}
            setVisiblex={setVisiblex}
            user={user}
            style={{ margin: "0 5vw", position: "relative", left: "1vw" }}
          />
        </div>
      </CModal>
    </>
  );
};
const VerticallyCentered = ({ visiblex, setVisiblex, setAllusers,user }) => {
  return (
    <>
      <CModal
        alignment="center"
        size="xl"
        visible={visiblex}
        onClose={() => setVisiblex(false)}
      >
        <CModalHeader>
          <div style={{ marginTop: "0.2vw" }} className="form1profile-heading">
            EasyWork Edit Job
            <div className="form1profile-subheading">
              Please complete your Job and show the world a better you.
            </div>
          </div>
        </CModalHeader>

        <div style={{ width: "50vw", marginLeft: "0.82vw" }}>
          <Formj2
            setAllusers={setAllusers}
            setVisiblex={setVisiblex}
            user={user}
            style={{ margin: "0 5vw", position: "relative", left: "1vw" }}
          />
        </div>
      </CModal>
    </>
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
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [visibleuser, setVisibleuser] = useState(null);
  const [visibleuser2, setVisibleuser2] = useState(null);
  const deleteUser = (_id) => {
    axios.delete(`http://localhost:5000/admin/deletejob/${_id}`).then((res) => {
      axios.get("http://localhost:5000/admin/getalljobs").then((res) => {
        setAllusers(res.data);
      });
    });
  };

  useEffect(() => {
    axios.get("http://localhost:5000/admin/getalljobs").then((res) => {
      setAllusers(res.data);
    });
  }, []);
  return (
    <>
      <CCol xs={12}>
        <CCard className="mb-1">
          <CCardHeader
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <strong>EasyWork Jobs</strong>
            <CButton
              onClick={() => {
                setVisible3(!visible3);
              }}
            >
              <strong> Craete Job</strong>
            </CButton>
          </CCardHeader>
          {visible3 ? (
            <VerticallyCentered3
              visiblex={visible3}
              setVisiblex={setVisible3}
              setAllusers={setAllusers}
            />
          ) : (
            ""
          )}
          <CCardBody>
            <div href="components/table#hoverable-rows">
              <CTable hover className="okok">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Job Type</CTableHeaderCell>
                    <CTableHeaderCell scope="col">MinPrice($)</CTableHeaderCell>
                    <CTableHeaderCell scope="col">MaxPrice($)</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Location</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Need</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Settings</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {allusers?.alluser?.map((user, index) => {
                    return (
                      <CTableRow key={index}>
                        <CTableHeaderCell scope="row">
                          {index + 1}
                        </CTableHeaderCell>
                        <CTableDataCell>{user?.title}</CTableDataCell>
                        <CTableDataCell>{user?.jobType}</CTableDataCell>
                        <CTableDataCell>{user?.minPrice}</CTableDataCell>
                        <CTableDataCell>{user?.maxPrice}</CTableDataCell>
                        <CTableDataCell>{user?.location}</CTableDataCell>
                        <CTableDataCell>{user?.listingType}</CTableDataCell>
                        <CTableDataCell
                          style={{ justifyContent: "space-between !important" }}
                        >
                          <CIcon
                            onClick={() => {
                              setVisible2(!visible2);
                              setVisibleuser2(user);
                            }}
                            className="m-1.52 mb-0"
                            style={{
                              position: "relative",
                              right: "0.11vw",
                              cursor: "pointer",
                              color: "green",
                            }}
                            icon={cilLowVision}
                            size="lg"
                          />
                          <CIcon
                            onClick={() => {
                              setVisible(!visible);
                              setVisibleuser(user);
                            }}
                            className="m-1.52 mb-0"
                            style={{
                              position: "relative",
                              left: "1vw",
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
                {visibleuser2 ? (
                  <VerticallyCentered2
                    visiblex={visible2}
                    setVisiblex={setVisible2}
                    user={visibleuser2}
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
