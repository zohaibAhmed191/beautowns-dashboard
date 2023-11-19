import React from "react";

const TransactionTable = () => {
  return (
    <div class="container mt-5">
      <div class="panel">
        <div class="panel-body table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="">
              <tr>
                <th>Waheed</th>
                <th>20-12-2023</th>
                <th>2500 PKR</th>
                <th>
                  <button className="btn btn-success">Received</button>
                </th>
                <th>Details</th>
              </tr>
              <tr>
                <th>Ubaid</th>
                <th>25-11-2024</th>
                <th>1300 PKR</th>
                <th>
                  <button className="btn btn-warning">Pending</button>
                </th>
                <th>Details</th>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="panel-footer">
          <div class="row">
            <div class="col col-sm-6 col-xs-6">
              showing <b>5</b> out of <b>25</b> entries
            </div>
            <div class="col-sm-6 col-xs-6">
              <div class="d-flex align-items-center justify-content-center">
                <button className="pagination_btn">Previous</button>
                <div className="pageNo">1</div>
                <div className="pageNo pageNo_active">2</div>
                <div className="pageNo">3</div>
                <button className="pagination_btn">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
