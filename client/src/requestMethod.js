import axios from "axios";
// http://localhost:5000/api/
const BASE_URL = "https://social-people.herokuapp.com/api/";
export const publicRequest = axios.create({
	baseURL: BASE_URL,
	headers: { "Content-type": "application/json" },
});
export const userRequest = axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
	credentials: "include",
	headers: {
		"Content-Type": "application/json",
	},
});
