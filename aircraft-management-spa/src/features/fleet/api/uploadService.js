import api from "../../../services/api-client/api";

export const uploadImage = async (aircraftId, file) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await api.post(`/aircrafts/${aircraftId}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
