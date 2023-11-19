import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import SalonInfo from "../components/salon-profile/SalonInfo";
import SalonTime from "../components/register-salon/SalonTime";

const SalonProfile = () => {
  const [key, setKey] = useState("info");
  return (
    <Layout>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="info" title="Salon Information">
          <SalonInfo />
        </Tab>
        <Tab eventKey="timing" title="Salon Timing">
          <SalonTime progress={3} />
        </Tab>
      </Tabs>
    </Layout>
  );
};

export default SalonProfile;
