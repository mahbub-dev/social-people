import { userRequest, publicRequest } from "../requestMethod";

export const getUser = async (callback) => {
	const { data } = await userRequest.get("/user");
	callback(data);
};
export const getAllUser = async (callback) => {
	const res = await userRequest.get("/user/team");
	callback(res)
};
export const updateUser = async (data, id, callback) => {
	try {
		const res = await userRequest.put(`/user/${id}`, {
			data,
		});
		callback(res);
	} catch (err) {
		console.log(err);
		callback(err);
	}
};
