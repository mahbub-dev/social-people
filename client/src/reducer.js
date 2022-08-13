export const initialState = { loading: false, success: false, error: false };
export const reducer = (state, action) => {
	switch (action.type) {
		case "loading":
			return { loading: true, success: false, error: false };
		case "success":
			return { loading: false, success: true, error: false };
		case "error":
			return { loading: false, success: false, error: true };
		default:
			throw new Error();
	}
};
