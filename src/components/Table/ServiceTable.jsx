import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import apis from "../../services";
import DeleteModal from "../Modal/DeleteModal";

const ServiceTable = ({ services, getServices }) => {
  const itemsPerPage = 5; // Define number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = services?.slice(indexOfFirstItem, indexOfLastItem);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState();
  const [show, setShow] = useState(false);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(services?.length / itemsPerPage);
  const showModal = (id) => {
    setId(id);
    setShow(true);
  };

  const delete_service = async () => {
    try {
      setLoading(true);
      const response = await apis.delete_service(id);
      if(response?.data?.message){
        toast.success(response?.data?.message);
        setShow(false);
        setLoading(false);
        getServices();
      }
    } catch (error) {
      setLoading(false);
      console.log();
    }
  };

  return (
    <div class="container mt-5">
      <DeleteModal
        deleteFunction={delete_service}
        show={show}
        setShow={setShow}
        loading={loading}
      />
      <div class="panel">
        <div class="panel-body table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Service Name</th>
                <th>No Of Staff</th>
                <th>Price</th>
                <th>Category</th>
                <th>Duration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="table__bg__gradient">
              {currentItems?.length > 0 ? (
                currentItems?.map((service, i) => {
                  return (
                    <tr key={i}>
                      <td>{service?.name}</td>
                      <td>{service?.noOfPeople}</td>
                      <td>{service?.value} PKR</td>
                      <td>
                        {service?.segment_Id === 1
                          ? "MALE"
                          : service?.segment_Id === 2
                          ? "FEMALE"
                          : service?.segment_Id === 3
                          ? "BOTH"
                          : ""}
                      </td>
                      <td>{service?.duration} Min</td>
                      <td>
                        <div className="d-flex">
                          <Link to={`/service-details/${service?._id}`}>
                            <button className="tableDetailsBtn bg-primary">
                              Details
                            </button>
                          </Link>
                          <Link to={`/service/update/${service?._id}`}>
                            <button className="tableDetailsBtn ms-1">
                              Update
                            </button>
                          </Link>
                          <button
                            className="tableDetailsBtn ms-1 bg-danger"
                            onClick={() => showModal(service?._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <p className="text-center">No Service Founed</p>
              )}
            </tbody>
          </table>
        </div>
        <div className="panel-footer">
          <div className="row">
            <div className="col col-sm-6 col-xs-6">
              Showing <b>{indexOfFirstItem + 1}</b> to{" "}
              <b>{Math.min(indexOfLastItem, services?.length)}</b> entries
            </div>
            <div className="col-sm-6 col-xs-6">
              <div className="d-flex align-items-center justify-content-center">
                <button
                  className="pagination_btn"
                  onClick={() =>
                    setCurrentPage(
                      currentPage > 1 ? currentPage - 1 : currentPage
                    )
                  }
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <div
                    key={i}
                    className={`pageNo ${
                      i + 1 === currentPage ? "pageNo_active" : ""
                    }`}
                    onClick={() => paginate(i + 1)}
                  >
                    {i + 1}
                  </div>
                ))}
                <button
                  className="pagination_btn"
                  onClick={() =>
                    setCurrentPage(
                      currentPage < totalPages ? currentPage + 1 : currentPage
                    )
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceTable;
