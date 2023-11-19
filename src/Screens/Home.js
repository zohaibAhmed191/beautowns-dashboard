import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import MainDash from "../components/MainDash/MainDash";
import StoreRegisterModal from "../components/Modal/StoreRegisterModal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { storeInfo, user } = useSelector((e) => e?.user);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (!storeInfo || storeInfo?.completeProgess < 3) {
      setShowModal(true);
    }
  }, []);

  return (
    <Layout>
      <StoreRegisterModal showModal={showModal} setShowModal={setShowModal} />
      <MainDash />
    </Layout>
  );
};

export default Home;
