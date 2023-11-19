import React, { useState } from "react";
import { Link } from "react-router-dom";
import DeleteModal from "../Modal/DeleteModal";
import toast from "react-hot-toast";
import apis from "../../services";

const StaffTable = ({ getStaffs, staffs }) => {
  const itemsPerPage = 5; // Define number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = staffs?.slice(indexOfFirstItem, indexOfLastItem);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState();
  const [show, setShow] = useState(false);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const showModal = (id) => {
    setId(id);
    setShow(true);
  };
  const totalPages = Math.ceil(staffs?.length / itemsPerPage);
  const delete_staff = async () => {
    try {
      setLoading(true);
      const response = await apis.delete_staff(id);
      toast.success(response?.data?.message);
      getStaffs();
      setLoading(false);
      setShow(false);
    } catch (error) {
      setLoading(false);
      console.log();
    }
  };
  return (
    <div class="container mt-5">
      <DeleteModal
        deleteFunction={delete_staff}
        show={show}
        setShow={setShow}
        loading={loading}
      />
      <div class="panel">
        <div class="panel-body table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Staff Name</th>
                <th>Title</th>
                <th>Gender</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems?.length > 0 ? (
                currentItems?.map((staff, i) => {
                  return (
                    <tr key={i}>
                      <td>{staff?.name}</td>
                      <td>{staff?.title}</td>
                      <td>{staff?.gender}</td>
                      <td>{staff?.description}</td>
                      <td>
                        <div className="d-flex">
                          <Link to={`/staff-details/${staff?._id}`}>
                            <button className="tableDetailsBtn bg-primary">
                              Details
                            </button>
                          </Link>
                          <Link to={`/staff/update/${staff?._id}`}>
                            <button className="tableDetailsBtn ms-2">
                              Update
                            </button>
                          </Link>
                          <button
                            className="tableDetailsBtn bg-danger ms-2"
                            onClick={() => showModal(staff?._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr className="text-center">No Staff Found</tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="panel-footer">
          <div className="row">
            <div className="col col-sm-6 col-xs-6">
              Showing <b>{indexOfFirstItem + 1}</b> to{" "}
              <b>{Math.min(indexOfLastItem, staffs?.length)}</b> entries
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

export default StaffTable;
