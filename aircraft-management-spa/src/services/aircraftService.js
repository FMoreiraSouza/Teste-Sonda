import api from "./api";

export const fetchAircrafts = async () => {
  const response = await api.get("/aircrafts");
  return response.data;
};

export const createAircraft = async (aircraftData) => {
  const response = await api.post("/aircrafts", aircraftData);
  return response.data;
};

export const updateAircraft = async (id, aircraftData) => {
  const response = await api.put(`/aircrafts/${id}`, aircraftData);
  return response.data;
};

export const deleteAircraft = async (id) => {
  await api.delete(`/aircrafts/${id}`);
};
