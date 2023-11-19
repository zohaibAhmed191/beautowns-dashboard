import React, { useEffect, useState } from "react";
import apis from "../../services";

const BookingServiceTable = ({
  storeInfo,
  setSelectedServices,
  selectedServices,
}) => {
  const [services, setServices] = useState();
  const getAllServices = async () => {
    try {
      const response = await apis.get_all_services(storeInfo?._id);
      if (response?.data?.service) {
        setServices(response?.data?.service);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllServices();
  }, []);

  const handleServiceSelection = (serviceId) => {
    const isSelected = selectedServices?.includes(serviceId);
    if (isSelected) {
      setSelectedServices(selectedServices?.filter((id) => id !== serviceId));
    } else {
      setSelectedServices([...selectedServices, serviceId]);
    }
  };

  return (
    <div>
      <div className="panel">
        <div className="panel-body table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Service Name</th>
                <th>Service Price</th>
                <th>Select Service</th>
              </tr>
            </thead>
            <tbody>
              {services?.length > 0 ? (
                services?.map((service, i) => {
                  return (
                    <tr key={i}>
                      <td className="text-capitalize">{service?.name}</td>
                      <td className="text-capitalize">{service?.value} PKR</td>
                      <td>
                        <input
                          type="checkbox"
                          onChange={() => handleServiceSelection(service?._id)}
                          checked={selectedServices.includes(service?._id)}
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td className="w-100 text-center">No Services Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookingServiceTable;
