import React, { useState } from "react";
import apis from "../../services";
import toast from "react-hot-toast";
// delete_coupon
const CouponTable = ({ coupons, getCoupons }) => {
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 5; // Define number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = coupons?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(coupons?.length / itemsPerPage);

  const deleteCoupon = async (id) => {
    if (id) {
      try {
        setIsLoading(true);
        const response = await apis.delete_coupon(id);
        getCoupons();
        toast.success(response?.data?.message, { id: 1 });
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    }
  };
  return (
    <div class="container mt-5">
      {isLoading && <div id="cover-spin"></div>}
      <div class="panel table__bg__gradient">
        <div class="panel-body table-responsive">
          <table class="table table__bg__gradient">
            <thead>
              <tr>
                <th>Target</th>
                <th>Quantity</th>
                <th>Total Amount</th>
                <th>Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="table__bg__gradient">
              {currentItems?.length > 0 ? (
                currentItems?.map((coupon, i) => {
                  return (
                    <tr key={i}>
                      <td>{coupon?.target}</td>
                      <td>{coupon?.quantity}</td>
                      <td>{coupon?.totalAmount}</td>
                      <td>
                        {coupon?.type?.fixedAmount
                          ? `Fixed Amount ${coupon?.type?.fixedAmount} PKR`
                          : coupon?.type?.percentage
                          ? `Percentage ${coupon?.type?.percentage}%`
                          : ""}
                      </td>
                      <td>
                        <button
                          className="tableDetailsBtn"
                          onClick={() => deleteCoupon(coupon?._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <p className="text-center">No Coupons Found</p>
              )}
            </tbody>
          </table>
        </div>
        <div className="panel-footer">
          <div className="row">
            <div className="col col-sm-6 col-xs-6">
              Showing <b>{indexOfFirstItem + 1}</b> to{" "}
              <b>{Math.min(indexOfLastItem, coupons?.length)}</b> entries
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

export default CouponTable;
