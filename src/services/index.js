import axios from "axios";
const createBackendServer = (baseURL) => {
  axios.defaults.withCredentials = true;
  const api = axios.create({
    baseURL: `${baseURL}api/`,
    headers: {
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    timeout: 60 * 1000,
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const message = error.response.data;
      error.message = message || error.message;
      /*if(error?.response?.data?.errors)
            error.errors = error?.response?.data?.errors;*/
      return Promise.reject(error);
    }
  );

  /*==========     AUTH Requests   ==========*/
  const authLogin = (body) => api.post("auth", body);
  const authRegister = (body) => api.post("auth/register", body);
  const authVerify = (body) => api.post("auth/verify", body);
  const authForgot = (body) => api.post("auth/forget", body);
  const authUpdatePassword = (body) => api.put("auth/update-password", body);

  /*==========     GET Requests   ==========*/
  const get_store_category = () => api.get("category");
  
  const get_all_staff = (id) => api.get(`staff/store/${id}`);
  const get_all_coupons = (id) => api.get(`admin/coupon`);
  const get_all_services = (id) => api.get(`service/store/${id}`);
  const get_single_service = (id) => api.get(`service/${id}`);
  const get_single_staff = (id) => api.get(`staff/${id}`);
  const get_slots = (id, date, duration) =>
    api.get(`store/slots/${id}?date=${date}&duration=${duration}`);
  const get_single_service_category = (id) => api.get(`store-category/${id}`);
  const get_all_service_category = (id) =>
    api.get(`store-category/store/${id}`);

  /*==========     POST Requests   ==========*/
  const create_booking = (body) => api.post("booking",body);
  const add_service_category = (body) => api.post("store-category", body);
  const create_coupon = (body) => api.post(`admin/coupon`, body);
  const add_staff = (body) => api.post("staff", body);
  const add_service = (body) => api.post("service", body);
  const create_store = (body) => api.post("store", body);
  const updateStore = (id, body) => api.put(`store/update/${id}`, body);
  const updateStoreTime = (id, body) =>
    api.put(`store/update/${id}`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

  // ========== DELETE REQUEST =================
  const delete_coupon = (id) => api.delete(`admin/coupon/delete/${id}`);
  const delete_service_category = (id) =>api.delete(`store-category/${id}`);
  const delete_staff = (id) => api.delete(`staff/${id}`);
  const delete_service = (id) => api.delete(`service/${id}`);
  // ========= PUT REQUEST =================
  const update_Service = (id, body) => api.put(`service/update/${id}`, body);
  const update_Staff = (id, body) => api.put(`staff/update/${id}`, body);

  return {
    authLogin,
    authRegister,
    authVerify,
    authForgot,
    authUpdatePassword,
    get_store_category,
    add_service_category,
    get_all_staff,
    add_staff,
    add_service,
    get_all_services,
    create_store,
    get_all_coupons,
    get_all_service_category,
    updateStore,
    updateStoreTime,
    get_single_service,
    get_single_service_category,
    create_coupon,
    delete_coupon,
    update_Service,
    update_Staff,
    get_single_staff,
    get_slots,
    delete_service_category,
    delete_staff,
    create_booking,
    delete_service
  };
};

const apis = createBackendServer(process.env.REACT_APP_SERVER_URL);

export default apis;
