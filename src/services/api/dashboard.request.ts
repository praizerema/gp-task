import { TitleObjType } from "../../vite-env";
import { apiService } from "../apiService";

export const GetAllTitles = async () => {
	const response = await apiService.get(`/title`);
	console.log(response);
	return response as unknown as TitleObjType[];
  };

  export const CreateTitle = async (data: object) => {
	const payload = { ...data };
	const response = await apiService.post({
		url: "/title",
		payload,
	});
	return response;
  };

  export const DeleteTitle = async (data: object) => {
	const payload = { ...data };
	const response = await apiService.delete({
		url: "/title",
		payload,
	});
	return response;
  };