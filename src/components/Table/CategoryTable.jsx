import React, { useState } from "react";
import apis from "../../services";
import DeleteModal from "../Modal/DeleteModal";
import toast from "react-hot-toast";

const CategoryTable = ({ getCategories, categories }) => {
  const itemsPerPage = 5; // Define number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categories?.slice(indexOfFirstItem, indexOfLastItem);
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

  const totalPages = Math.ceil(categories?.length / itemsPerPage);

  const delete_cateogry = async () => {
    try {
      setLoading(true);
      const response = await apis.delete_service_category(id);
      toast.success(response?.data?.message);
      getCategories();
      setLoading(false);
      setShow(false);
    } catch (error) {
      setLoading(false);
      console.log();
    }
  };

  return (
    <div className="container mt-5">
      <DeleteModal
        deleteFunction={delete_cateogry}
        show={show}
        setShow={setShow}
        loading={loading}
      />
      <div className="panel">
        <div className="panel-body table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems?.length > 0 ? (
                currentItems?.map((cat, i) => {
                  return (
                    <tr key={i}>
                      <td className="text-capitalize">{cat?.name}</td>
                      <td className="text-capitalize">
                        <button
                          className="pagination_btn"
                          onClick={() => showModal(cat?._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td className="w-100 text-center">No Categories Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="panel-footer">
          <div className="row">
            <div className="col col-sm-6 col-xs-6">
              Showing <b>{indexOfFirstItem + 1}</b> to{" "}
              <b>{Math.min(indexOfLastItem, categories?.length)}</b> entries
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

export default CategoryTable;
