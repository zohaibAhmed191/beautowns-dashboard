import React from "react";
import {  Modal, Spinner } from "react-bootstrap";

const DeleteModal = ({ show, setShow, deleteFunction, loading }) => {
  return (
    <Modal centered show={show} onHide={setShow}>
      <Modal.Header closeButton>
        <Modal.Title>Do You want to Delete?</Modal.Title>
      </Modal.Header>

      <Modal.Footer>
        <div className="d-flex">
          <button className="login-btn border-0 me-2 bg-secondary text-white  px-4"  onClick={() => setShow(false)}>
            Close
          </button>
          <button className="login-btn bg-danger text-white px-4" onClick={deleteFunction}>
            {!loading ? "Delete" : <Spinner animation="border" />}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
