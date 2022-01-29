import PropTypes from "prop-types";
import React, { useEffect, useState, createRef } from "react";
import classNames from "classnames";
import axios from "axios";
import { rgbToHex } from "@coreui/utils";
import CIcon from "@coreui/icons-react";
import { cilPen, cilTrash, cilList, cilMenu } from "@coreui/icons";
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
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CButton,
} from "@coreui/react";

const VerticallyCentered = ({ visiblex, setVisiblex,user }) => {
  return (
    <>
      <CModal
        alignment="center"
        visible={visiblex}
        onClose={() => setVisiblex(false)}
      >
        <CModalHeader>
          <CModalTitle>{user?.name}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
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
  const [visible, setVisible] = useState(true);
  const [visibleuser, setVisibleuser] = useState({});
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
                        <CTableHeaderCell scope="row">{index}</CTableHeaderCell>
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
                              setVisibleuser(user)
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
                {visible ? (
                  <VerticallyCentered
                    visiblex={visible}
                    setVisiblex={setVisible}
                    user={visibleuser}
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
