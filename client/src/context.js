import { useState, useEffect, createContext, useContext } from "react";
import { getUser, getAllUser } from "./server manger/user";
const AppContext = createContext();
const AppProvider = ({ children }) => {
	const [loggedUserData, setLoggedUserData] = useState({});
	const [member, setMember] = useState([]);
	// useEffect(() => {
	// 	getUser((data) => {
	// 		setLoggedUserData(data);
	// 	});
	// }, []);
	// useEffect(() => {
	// 	getAllUser((data) => {
	// 		setMember(data.data);
	// 	});
	// }, []);
	return (
		<AppContext.Provider
			value={{
				loggedUserData,
				setLoggedUserData,
				member,
				setMember,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppProvider;
export const useAppContext = () => useContext(AppContext);
