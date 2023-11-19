import React from "react";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import AddSalon from "../register-salon/AddSalon";
import SalonTime from "../register-salon/SalonTime";
import SalonDocuments from "../register-salon/SalonDocuments"

const StoreRegisterModal = ({ showModal, setShowModal }) => {
  // const dispatch = useDispatch();
  // const [loading, setLoading] = useState(false);
  const { storeInfo } = useSelector((e) => e.user);
  console.log(storeInfo?.completeProgess, "completeProgess");

  return (
    <div>
      <Modal
        centered
        size="lg"
        show={showModal}
        onHide={setShowModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          {storeInfo === null && <AddSalon />}
          {storeInfo?.completeProgess === 1 && <SalonTime />}
          {storeInfo?.completeProgess === 2 && <SalonDocuments setShowModal={setShowModal} />}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default StoreRegisterModal;
