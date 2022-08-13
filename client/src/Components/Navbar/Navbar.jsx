import React, { useState } from "react";
import { logoutUser } from "../../server manger/auth";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context";
import Bars from "../../assets/menu.png";
import close from "../../assets/close.png";

function Navbar() {
	const navigate = useNavigate();
	const { loggedUserData, setLoggedUserData,member } = useAppContext();
	const [toggle, setToggle] = useState({ width: "0px" });
	const menuToggle = (id) => {
		if (id === "open") {
			setToggle({ width: "200px" });
		} else {
			setToggle({ width: "0px" });
		}
	};
	const toggleOption = (
		<img
			className="bar"
			onClick={() => menuToggle("open")}
			src={Bars}
			alt="bar"
		/>
	);
	const links = (
		<>
			<Link to={"/"}>
				<span>Home</span>
			</Link>
			<Link to={"/team"}>
				<span>Member <b>{member.length}</b></span>
			</Link>
			{!loggedUserData._id ? (
				<>
					<Link to={"/login"}>
						<span>Login</span>
					</Link>
					<Link to={"/signup"}>
						<span>Registration</span>
					</Link>
				</>
			) : (
				<span
					onClick={() => {
						logoutUser((data) => {
							if (data.msg === "logout success") {
								setLoggedUserData(data);
								navigate("/login");
								window.location.reload();
							} else {
								alert("Check your connection");
							}
						});
					}}
				>
					Logout
				</span>
			)}
		</>
	);
	return (
		<div className="navbar">
			<div className="logo">
				<span className="a">Social</span>
				<span className="b">Worker's</span>
			</div>
			<div className="links">{links}</div>
			<div className="menubar">{toggleOption}</div>
			<div className="toggleLinks" style={toggle}>
				<img
					className="close"
					onClick={() => menuToggle("close")}
					src={close}
					alt="bar"
				/>
				{links}
			</div>
		</div>
	);
}

export default Navbar;
