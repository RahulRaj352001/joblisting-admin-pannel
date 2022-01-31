import PropTypes from "prop-types";
import React, { useEffect, useState, createRef } from "react";
import classNames from "classnames";
import axios from "axios";
import { rgbToHex } from "@coreui/utils";
import CIcon from "@coreui/icons-react";
import { cilTrash } from "@coreui/icons";
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
  
} from "@coreui/react";

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

  const deleteUser = (_id) => {
    axios
      .delete(`http://localhost:5000/admin/deletejob/${_id}`)
      .then((res) => {
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
          <CCardHeader>
            <strong>EasyWork Jobs</strong>
          </CCardHeader>
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
                            onClick={() => deleteUser(user?._id)}
                            style={{
                              cursor: "pointer",
                              color: "red",
                              position: "relative",
                              left: "1vw",
                            }}
                            icon={cilTrash}
                            size="lg"
                          />
                        </CTableDataCell>
                      </CTableRow>
                    );
                  })}
                </CTableBody>
              </CTable>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </>
  );
};

export default Colors;
