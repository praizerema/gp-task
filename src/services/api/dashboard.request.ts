import { apiService } from "../apiService";

export const getAllTitles = async () => {
	const response = await apiService.get(`/titles`);
	return response;
  };