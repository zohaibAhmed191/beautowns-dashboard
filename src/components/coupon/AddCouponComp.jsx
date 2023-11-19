import React from "react";
import toast from "react-hot-toast";
import apis from "../../services";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner, Table } from "react-bootstrap";

const AddCouponComp = () => {
  const navigate = useNavigate();
  const users = [
    {
      _id: "653986de6ea9089480dbe409",
      firstName: "Umair",
      lastName: "Khan",
      email: "asd@gmail.com",
    },
    {
      _id: "653986de6ea9089480dbe409",
      firstName: "John",
      lastName: "Resels",
      email: "asd@yahoo.com",
    },
  ];
  const [amountType, setAmountType] = useState("fixedAmount");

  let [data, setData] = useState({
    target: "all",
    type: { fixedAmount: "" },
    userIds: [],
    amount: "",
    quantity: "",
    value: "",
    validityDate: "",
  });

  const onChangeHandlerAmount = (e) => {
    const { value } = e.target;
    setData((prevData) => ({
      ...prevData,
      type: { [value]: data?.amount },
    }));
    setAmountType(value);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "amount") {
      setData((prevData) => ({
        ...prevData,
        type: { [amountType]: parseInt(value) },
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  const CreateCoupon = async (e) => {
    e.preventDefault();
    if (!data?.userIds?.length > 0 && data?.type === "specific") {
      toast.error("Plz select the user");
    } else {
      try {
        setIsLoading(true);
        const { amount, ...rest } = data;
        const response = await apis.create_coupon(rest);
        if (response?.data?.status) {
          toast.success(response?.data?.message, { id: 1 });
        }
        navigate("/coupon");
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        console.log(e, "EEEEEEEEEEEEEE");
        toast.error(e?.message?.message, { id: 1 });
      }
    }
  };

  const handleUserSelection = (userId) => {
    setData((prevState) => {
      if (prevState.userIds.includes(userId)) {
        const updatedUserIds = prevState.userIds.filter((id) => id !== userId);
        return { ...prevState, userIds: updatedUserIds };
      } else {
        const updatedUserIds = [...prevState.userIds, userId];
        return { ...prevState, userIds: updatedUserIds };
      }
    });
  };
  console.log(data, "DATA");
  return (
    <div className="container">
      <h2>ADD COUPON</h2>
      <form className="comment-form" onSubmit={CreateCoupon}>
        <div>
          <div className="form-group">
            <label className="text-black">Select Target</label>
            <select
              name="target"
              id="target"
              onChange={onChange}
              className="form-control form-control-lg pe-2"
            >
              <option value="all">All Users</option>
              <option value="specific">Specific Users</option>
            </select>
          </div>
          {data?.target === "specific" && (
            <div style={{ overflow: "auto", maxHeight: "150px" }}>
              <Table bordered hover size="sm">
                <thead>
                  <tr style={{ textAlign: "center" }}>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.length > 0 ? (
                    users?.map((item, i) => {
                      return (
                        <tr key={item.id} style={{ textAlign: "center" }}>
                          <td className="text-align-center">
                            {item?.firstName + " " + item?.lastName}
                          </td>
                          <td className="text-align-center">{item?.email}</td>
                          <td>
                            <input
                              style={{ marginTop: "12px" }}
                              type="checkbox"
                              onClick={() => handleUserSelection(item?._id)}
                              checked={data.userIds.includes(item?._id)}
                            />
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr style={{ textAlign: "center" }}>
                      <td colSpan={3}>No Users</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          )}
          <div className="row mt-3">
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <label className="text-black">Type</label>
                <select
                  name="type"
                  onChange={onChangeHandlerAmount}
                  className="form-control form-control-lg pe-2"
                >
                  <option value="fixedAmount">Fixed</option>
                  <option value="percentage">Percent</option>
                </select>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <label className="text-black font-w500">Amount</label>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  onChange={onChange}
                  className="form-control"
                  required
                />
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <label className="text-black font-w500">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  required
                  onChange={onChange}
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <label className="text-black font-w500">Validity Date</label>
                <input
                  type="date"
                  name="validityDate"
                  id="validityDate"
                  required
                  onChange={onChange}
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <label className="text-black font-w500">Code</label>
                <input
                  type="text"
                  name="value"
                  id="value"
                  onChange={onChange}
                  required
                  className="form-control"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 d-block">
          <button className="login-btn" type="submit">
            {isLoading ? <Spinner /> : "Create Coupon"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCouponComp;
