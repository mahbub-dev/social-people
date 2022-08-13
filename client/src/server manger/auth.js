import { userRequest, publicRequest } from "../requestMethod";

// singup user
export const createUser = async (userData, callback) => {
	try {
		const data = await publicRequest.post("/auth/signup", {
			data: userData,
		});
		callback(data);
	} catch (err) {
		callback(err);
	}
};
export const loginUser = async (userData, callback) => {
	try {
		const res = await userRequest.post("/auth/login", {
			data: userData,
		});
		callback(res);
	} catch (err) {
		callback(err);
	}
};

export const logoutUser = async (callback) => {
	const { data } = await userRequest.get("auth/logout");
	callback(data);
	console.log(data);
};
