import { useEffect, useState } from "react";
import { Navbar, Footer } from "../index";
import { RiLockPasswordFill } from "react-icons/ri";
import { BsPersonCircle } from "react-icons/bs";
import { loginUser } from "../../server manger/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context";
import { reducer } from "../../reducer";
import Loading from "../Loading/Loading";
import "./login.scss";
import { useReducer } from "react";
function Login() {
	const initialState = { loading: false, success: false, error: false };
	const [state, dispatch] = useReducer(reducer, initialState);
	const { setLoggedUserData, loggedUserData } = useAppContext();
	const navigate = useNavigate();
	const [serverRes, setServerRes] = useState({});
	const [loginData, setLoginData] = useState({});
	const handleChange = (e) => {
		const data = { ...loginData, [e.target.name]: e.target.value };
		setLoginData(data);
	};
	const SubmitForm = (e) => {
		e.preventDefault();
		dispatch({ type: "loading" });
		loginUser(loginData, (res) => {
			if (res.status === 200) {
				dispatch({ type: "success" });
				setServerRes(res.data);
				setLoggedUserData(res.data);
				navigate("/");
				window.location.reload()
			} if (res.response.status === 401) {
				dispatch({ type: "error" });
				alert("wrong credintial");
			}
		});
	};
	useEffect(() => {}, [serverRes]);
	const component = (
		<>
			<Navbar />
			{/* <Succes value={"Signup"} /> */}
			<div className="login">
				<div className="inner">
					<h1>Login</h1>
					<form onSubmit={SubmitForm}>
						<div className="input">
							<BsPersonCircle className="icon" />
							<input
								type="email"
								name="email"
								onChange={handleChange}
								placeholder="Email"
							/>
						</div>
						<div className="input">
							<RiLockPasswordFill className="icon" />
							<input
								type="password"
								name="password"
								onChange={handleChange}
								placeholder="Password"
							/>
						</div>
						{state.loading && <Loading />}
						<button type="submit">Login</button>
					</form>
				</div>
			</div>
			<Footer />
		</>
	);
	return <>{loggedUserData._id ? <Navigate to={"/"} /> : component}</>;
}

export default Login;
