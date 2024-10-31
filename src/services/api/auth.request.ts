import { apiService } from "../index";

/** Login User. The React-Query key is "LoginUserApi" */
export const LoginUserApi = async (data: object) => {
	const payload = { ...data };
	const response = await apiService.post({
		url: "/auth/signin",
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


/** Reset Password. The React-Query key is "ResetUserPasswordApi" */
export const ResetUserPasswordApi = async (data: object) => {
	const payload = { ...data };
	const response = await apiService.post({
		url: "auth/password-reset",
		payload,
	});
	return response;
};

export const RefreshTokenApi = async (data: object) =>{
	const payload = {...data}
	const response = await apiService.post({
		url: "/auth/refresh",
		payload,
	});
	return response;
}
