import React, { useReducer, useState } from "react";
import { BsFillTelephoneFill, BsPersonCircle } from "react-icons/bs";
import { FaAddressBook } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context";
import { initialState, reducer } from "../../reducer";
import { createUser } from "../../server manger/auth";
import { Footer, Navbar } from "../index";
import Loading from "../Loading/Loading";
import Succes from "../Success/Succes";
import "./signup.scss";

export const Input = ({
	icon,
	name,
	handleChange,
	placeholder,
	type,
	value,
}) => {
	return (
		<div className="input">
			<span>{icon}</span>
			<input
				type={type}
				name={name}
				required
				value={value}
				onChange={handleChange}
				placeholder={placeholder}
			/>
		</div>
	);
};

function Signup() {
	const { setLoggedUserData } = useAppContext();
	const [state, dispatch] = useReducer(reducer, initialState);
	const navigate = useNavigate();
	const [signupData, setSignupData] = useState({});
	const handleChange = (e) => {
		const data = { ...signupData, [e.target.name]: e.target.value };
		setSignupData(data);
		// const file = e.target.files[0];
		// const reader = new FileReader();
		// reader.readAsDataURL(file);
		// reader.onloadend = () => {
		// 	data.image = reader.result;
		// };
	};
	const SubmitForm = (e) => {
		e.preventDefault();
		signupData.password !== signupData.confirmPassword &&
			alert("please give the same password");
		dispatch({ type: "loading" });
		createUser(signupData, (res) => {
			if (res.status === 500 || !res.data) {
				alert("Signup failed");
				dispatch({ type: "error" });
			} else {
				dispatch({ type: "success" });
				setLoggedUserData(res.data);
				navigate("/login");
			}
		});
	};
	return (
		<>
			<Navbar />
			<div className="signup section">
				<main className="inner-signup">
					<h1>Signup</h1>
					<form method="POST" onSubmit={SubmitForm}>
						<Input
							icon={<BsPersonCircle />}
							type="text"
							name="name"
							handleChange={handleChange}
							placeholder="Full Name"
						/>
						<Input
							icon={<MdEmail />}
							type="email"
							name="email"
							handleChange={handleChange}
							placeholder="Email"
						/>
						<Input
							icon={<BsFillTelephoneFill />}
							type="text"
							name="phone"
							handleChange={handleChange}
							placeholder="Phone"
						/>
						<Input
							icon={<FaAddressBook />}
							type="text"
							name="address"
							handleChange={handleChange}
							placeholder="Address"
						/>
						<Input
							icon={<RiLockPasswordFill />}
							type="password"
							name="password"
							handleChange={handleChange}
							placeholder="Password"
						/>
						<Input
							icon={<RiLockPasswordFill />}
							type="password"
							name="confirmPassword"
							handleChange={handleChange}
							placeholder="Confirm Password"
						/>
						{state.loading && <Loading />}
						{state.success && <Succes />}
						<button type="submit">Submit</button>
					</form>
				</main>
			</div>
			<Footer />
		</>
	);
}

export default Signup;
