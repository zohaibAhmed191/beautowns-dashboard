import React from "react";
import Layout from "../components/layout/Layout";
import AddStaff from "../components/staff/AddStaff";
import { Tab, Tabs } from "react-bootstrap";
import { useState } from "react";
import StaffTime from "../components/staff/StaffTime";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import apis from "../services";

const AddSalonStaff = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const isEdit = pathname.includes("update");
  const [isLoading, setIsLoading] = useState(false);
  const [staff_details, set_staff_details] = useState();
  const [staff_id, setStaff_id] = useState(null);
  const [key, setKey] = useState("info");
  const staffIdExists = staff_id !== null;
  const get_staff = async () => {
    try {
      setIsLoading(true);
      const response = await apis.get_single_staff(id);
      if (response?.data?.staff) {
        set_staff_details(response?.data?.staff);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error, "error");
    }
  };

  useEffect(() => {
    if (isEdit) {
      get_staff();
    }
  }, []);

  useEffect(() => {
    // Check if staff_id exists, then set the appropriate tab and disable the other
    if (staffIdExists) {
      setKey("timing"); // Open the "Staff Timing" tab
    } else {
      setKey("info"); // Open the "Staff Information" tab
    }
  }, [staffIdExists]);

  return (
    <Layout>
      {isLoading && <div id="cover-spin"></div>}
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="info" title="Staff Information" disabled={staffIdExists}>
          <AddStaff
            isEdit={isEdit}
            staff_details={staff_details}
            setStaff_id={setStaff_id}
          />
        </Tab>
        <Tab
          eventKey="timing"
          title="Staff Timing"
          disabled={!staffIdExists && !isEdit}
        >
          <StaffTime
            isEdit={isEdit}
            staff_details={staff_details}
            staff_id={staff_id}
          />
        </Tab>
      </Tabs>
    </Layout>
  );
};

export default AddSalonStaff;
