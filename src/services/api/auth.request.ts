import { apiService } from "../index";

/** Login User. The React-Query key is "LoginUserApi" */
export const LoginUserApi = async (data: object) => {
	const payload = { ...data };
	const response = await apiService.post({
		url: "/auth/login",
		payload,
	});
	return response;
};

export const CreateUserApi = async (data: object) => {
	const payload = { ...data };
	const response = await apiService.post({
		url: "/auth/signup",
		payload,
	});
	return response;
};



