import api from "../../../services/rest-client/api";

export const getUnsoldCount = async () => {
  const response = await api.get("/aircrafts/reports/unsold-count");
  return response.data.unsoldCount;
};

export const getDecadeDistribution = async () => {
  const response = await api.get("/aircrafts/reports/distribution-by-decade");
  return response.data.distribution;
};

export const getManufacturerDistribution = async () => {
  const response = await api.get(
    "/aircrafts/reports/distribution-by-manufacturer",
  );
  return response.data.distribution;
};

export const getLastWeekAircrafts = async () => {
  const response = await api.get("/aircrafts/reports/last-week");
  return response.data;
};
