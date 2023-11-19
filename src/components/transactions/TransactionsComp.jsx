import React from "react";
import TransactionTable from "../Table/TransactionTable";

const TransactionsComp = () => {
  return (
    <div className="container">
      <h2>Transactions</h2>
      <div className="row text-uppercase">
        <div className="col-md-4 my-3">
          <div className="revenue__card shadow p-3">
            <h4 >Balance available</h4>
            <h3>6500 PKR</h3>
          </div>
        </div>
        <div className="col-md-4 my-3">
          <div className="revenue__card shadow p-3">
            <h4>Earnings to date</h4>
            <h3>50,000 PKR</h3>
          </div>
        </div>
        <div className="col-md-4 my-3">
          <div className="revenue__card shadow p-3">
            <h4>Expenses to date</h4>
            <h3>2500 PKR</h3>
          </div>
        </div>
      </div>

      <TransactionTable />
    </div>
  );
};

export default TransactionsComp;
